import { Resend } from "resend";
import { BRAND } from "./constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Pups & Poses <onboarding@resend.dev>";

export async function sendConfirmationEmail(
  to: string,
  date: string,
  timeLabel: string
): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: "Resend not configured" };
  }

  const displayDate = new Date(date + "T12:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `You're booked! ${displayDate} at ${timeLabel} — ${BRAND.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FFFBF5;">
  <div style="max-width: 480px; margin: 0 auto; padding: 32px 24px;">
    <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 700; color: #1a1a2e;">
      You're booked! 🐕
    </h1>
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #3D2B1F;">
      Thanks for booking a puppy yoga class with ${BRAND.name}. We can't wait to see you on the mat!
    </p>
    <div style="background: #FEF3C7; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-size: 12px; color: #92400E; text-transform: uppercase; letter-spacing: 0.5px;">Your class</p>
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1a1a2e;">${displayDate}</p>
      <p style="margin: 4px 0 0; font-size: 16px; color: #3D2B1F;">${timeLabel} (1 hour)</p>
    </div>
    <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #1a1a2e;">Location</p>
    <p style="margin: 0 0 24px; font-size: 14px; color: #3D2B1F;">
      ${BRAND.location}<br>
      <span style="color: #86868b;">The exact studio address will be sent 24 hours before your class.</span>
    </p>
    <p style="margin: 0; font-size: 14px; color: #86868b;">
      Questions? Reply to this email or visit our website.
    </p>
    <p style="margin: 24px 0 0; font-size: 14px; color: #86868b;">
      — The ${BRAND.name} team
    </p>
  </div>
</body>
</html>
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("Send email error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
