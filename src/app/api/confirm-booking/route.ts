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
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { message: "Missing session ID." },
        { status: 400 }
      );
    }

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

    const date = session.metadata?.date;
    const timeSlot = session.metadata?.timeSlot;
    const timeLabel = session.metadata?.timeLabel;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { message: "Invalid session metadata." },
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

    await createBooking(
      date,
      timeSlot,
      sessionId,
      session.customer_details?.email ?? null
    );

    return NextResponse.json({
      success: true,
      date,
      time: timeLabel,
      email: session.customer_details?.email,
    });
  } catch (error) {
    console.error("Confirm booking error:", error);
    return NextResponse.json(
      { message: "Failed to confirm booking." },
      { status: 500 }
    );
  }
}
