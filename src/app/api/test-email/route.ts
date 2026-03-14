import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST() {
  const result = await sendConfirmationEmail(
    "gregory.bazh@gmail.com",
    new Date().toISOString().split("T")[0],
    "9:30 AM"
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "Failed to send" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
