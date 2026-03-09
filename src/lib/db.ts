import { sql } from "@vercel/postgres";
import { BRAND, CLASS_TIMES, BOOKING_WINDOWS } from "./constants";

export async function ensureBookingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      date VARCHAR(10) NOT NULL,
      time_slot VARCHAR(4) NOT NULL,
      stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
      customer_email VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function getBookingCounts(
  date: string
): Promise<Record<string, number>> {
  await ensureBookingsTable();

  const result = await sql`
    SELECT time_slot, COUNT(*)::int as count
    FROM bookings
    WHERE date = ${date}
    GROUP BY time_slot
  `;

  const counts: Record<string, number> = {};
  for (const row of result.rows) {
    counts[row.time_slot] = row.count;
  }
  return counts;
}

export async function getSpotsRemaining(
  date: string
): Promise<Record<string, number>> {
  const counts = await getBookingCounts(date);
  const spots: Record<string, number> = {};

  for (const time of CLASS_TIMES) {
    spots[time.id] = BRAND.spotsPerClass - (counts[time.id] || 0);
  }

  return spots;
}

export async function isSlotAvailable(
  date: string,
  timeSlot: string
): Promise<boolean> {
  const window = BOOKING_WINDOWS.find((w) => w.date === date);
  if (!window || window.status !== "available") return false;

  const spots = await getSpotsRemaining(date);
  return (spots[timeSlot] ?? 0) > 0;
}

export async function createBooking(
  date: string,
  timeSlot: string,
  stripeSessionId: string,
  customerEmail: string | null
): Promise<boolean> {
  await ensureBookingsTable();

  try {
    await sql`
      INSERT INTO bookings (date, time_slot, stripe_session_id, customer_email)
      VALUES (${date}, ${timeSlot}, ${stripeSessionId}, ${customerEmail})
      ON CONFLICT (stripe_session_id) DO NOTHING
    `;
    return true;
  } catch {
    return false;
  }
}

export async function bookingExistsForSession(
  stripeSessionId: string
): Promise<boolean> {
  await ensureBookingsTable();

  const result = await sql`
    SELECT 1 FROM bookings WHERE stripe_session_id = ${stripeSessionId} LIMIT 1
  `;
  return result.rows.length > 0;
}
