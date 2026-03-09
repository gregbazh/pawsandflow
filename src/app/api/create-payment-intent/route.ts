import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { BRAND, CLASS_TIMES } from "@/lib/constants";
import { isSlotAvailable } from "@/lib/db";

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
        { message: "Could not check availability." },
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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: BRAND.price * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        date,
        timeSlot,
        timeLabel: classTime?.label || timeSlot,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json(
      { message: "Failed to create payment." },
      { status: 500 }
    );
  }
}
