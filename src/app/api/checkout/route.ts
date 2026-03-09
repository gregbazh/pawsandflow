import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { BRAND, CLASS_TIMES } from "@/lib/constants";
import { isSlotAvailable } from "@/lib/db";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      {
        message:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment variables.",
      },
      { status: 503 }
    );
  }

  const stripe = new Stripe(stripeKey);

  try {
    const body = await request.json();
    const { date, timeSlot } = body;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { message: "Missing date or time slot." },
        { status: 400 }
      );
    }

    let available: boolean;
    try {
      available = await isSlotAvailable(date, timeSlot);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { message: "Could not check availability. Please try again." },
        { status: 503 }
      );
    }

    if (!available) {
      return NextResponse.json(
        { message: "This class is sold out." },
        { status: 409 }
      );
    }

    const classTime = CLASS_TIMES.find((t) => t.id === timeSlot);
    const displayDate = new Date(date + "T12:00:00").toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Puppy & Flow — Puppy Yoga`,
              description: `${displayDate} at ${classTime?.label || timeSlot} · West Hollywood, Los Angeles`,
            },
            unit_amount: BRAND.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/book`,
      metadata: {
        date,
        timeSlot,
        timeLabel: classTime?.label || timeSlot,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    // Surface Stripe errors so we can debug (e.g. invalid API key, wrong permissions)
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { message: error.message || "Stripe error." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
