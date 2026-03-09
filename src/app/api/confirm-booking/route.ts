import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createBooking, bookingExistsForSession, isSlotAvailable } from "@/lib/db";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      { message: "Stripe is not configured." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeKey);

  try {
    const body = await request.json();
    const { sessionId, paymentIntentId, email: customerEmailParam } = body;

    if (!sessionId && !paymentIntentId) {
      return NextResponse.json(
        { message: "Missing session ID or payment intent ID." },
        { status: 400 }
      );
    }

    let date: string | undefined;
    let timeSlot: string | undefined;
    let timeLabel: string | undefined;
    let customerEmail: string | null = null;
    let stripeId: string;

    if (paymentIntentId) {
      // Embedded Payment Element flow
      stripeId = paymentIntentId;
      const alreadyBooked = await bookingExistsForSession(paymentIntentId);
      if (alreadyBooked) {
        const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
        return NextResponse.json({
          success: true,
          alreadyConfirmed: true,
          date: pi.metadata?.date,
          time: pi.metadata?.timeLabel,
        });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== "succeeded") {
        return NextResponse.json(
          { message: "Payment not completed." },
          { status: 400 }
        );
      }

      date = paymentIntent.metadata?.date;
      timeSlot = paymentIntent.metadata?.timeSlot;
      timeLabel = paymentIntent.metadata?.timeLabel;
      customerEmail = customerEmailParam ?? paymentIntent.receipt_email ?? null;
    } else if (sessionId) {
      // Redirect Checkout flow
      stripeId = sessionId;
      const alreadyBooked = await bookingExistsForSession(sessionId);
      if (alreadyBooked) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json({
          success: true,
          alreadyConfirmed: true,
          date: session.metadata?.date,
          time: session.metadata?.timeLabel,
        });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== "paid") {
        return NextResponse.json(
          { message: "Payment not completed." },
          { status: 400 }
        );
      }

      date = session.metadata?.date;
      timeSlot = session.metadata?.timeSlot;
      timeLabel = session.metadata?.timeLabel;
      customerEmail = customerEmailParam ?? session.customer_details?.email ?? null;
    } else {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    if (!date || !timeSlot) {
      return NextResponse.json(
        { message: "Invalid payment metadata." },
        { status: 400 }
      );
    }

    const available = await isSlotAvailable(date, timeSlot);
    if (!available) {
      return NextResponse.json(
        {
          message: "This class is now full. You will be refunded.",
          soldOut: true,
        },
        { status: 409 }
      );
    }

    await createBooking(date, timeSlot, stripeId, customerEmail);

    return NextResponse.json({
      success: true,
      date,
      time: timeLabel,
      email: customerEmail ?? undefined,
    });
  } catch (error) {
    console.error("Confirm booking error:", error);
    return NextResponse.json(
      { message: "Failed to confirm booking." },
      { status: 500 }
    );
  }
}
