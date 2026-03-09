import { NextRequest, NextResponse } from "next/server";
import { getSpotsRemaining } from "@/lib/db";
import { BOOKING_WINDOWS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Missing date parameter." },
      { status: 400 }
    );
  }

  const window = BOOKING_WINDOWS.find((w) => w.date === date);
  if (!window || window.status !== "available") {
    return NextResponse.json({ spots: {}, soldOut: true });
  }

  try {
    const spots = await getSpotsRemaining(date);
    return NextResponse.json({ spots, soldOut: false });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { message: "Failed to check availability." },
      { status: 500 }
    );
  }
}
