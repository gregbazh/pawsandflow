import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { BRAND, CLASS_TIMES } from "@/lib/constants";

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
    const { date, timeSlot, timeLabel } = body;

    if (!date || !timeSlot) {
      return NextResponse.json(
        { message: "Missing date or time slot." },
        { status: 400 }
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
              name: `Paws & Flow — Puppy Yoga`,
              description: `${displayDate} at ${classTime?.label || timeLabel} · Los Angeles, CA`,
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
        timeLabel: classTime?.label || timeLabel,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
