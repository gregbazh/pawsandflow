"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PawPrint, CheckCircle2, ArrowRight, CalendarDays, Clock, Loader2, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";
import { Suspense } from "react";

interface BookingResult {
  success: boolean;
  date?: string;
  time?: string;
  email?: string;
  alreadyConfirmed?: boolean;
}

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const fallbackDate = params.get("date");
  const fallbackTime = params.get("time");

  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    async function confirmBooking() {
      setConfirming(true);
      try {
        const res = await fetch("/api/confirm-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setBooking(data);
        } else {
          setError(data.message || "Failed to confirm booking.");
        }
      } catch {
        setError("Network error. Please contact us to confirm your booking.");
      } finally {
        setConfirming(false);
      }
    }

    confirmBooking();
  }, [sessionId]);

  const displayDate = (booking?.date || fallbackDate)
    ? new Date((booking?.date || fallbackDate) + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const displayTime = booking?.time || fallbackTime;

  if (confirming) {
    return (
      <div className="bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden max-w-lg mx-auto p-16 text-center">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
        <p className="text-warm-800/60 font-medium">Confirming your booking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden max-w-lg mx-auto p-16 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-warm-900 mb-3">Booking Issue</h1>
        <p className="text-warm-800/60 mb-8">{error}</p>
        <Link
          href="/book"
          className="cta-gradient inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold shadow-lg"
        >
          Try Again
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden max-w-lg mx-auto">
      <div className="relative h-48 w-full">
        <Image
          src={IMAGES.successPuppy}
          alt="Happy puppy"
          fill
          className="object-cover"
          sizes="500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="relative">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 bg-white rounded-full" />
            <PawPrint className="w-4 h-4 text-amber-500 absolute -top-0.5 -right-0.5 rotate-12" />
          </div>
        </div>
      </div>

      <div className="p-10 pt-6 text-center">
        <h1 className="text-3xl font-extrabold gradient-text mb-3">
          You&apos;re Booked!
        </h1>

        <p className="text-warm-800/60 mb-8 leading-relaxed">
          Get ready for the most adorable yoga session of your life.
          We can&apos;t wait to see you.
        </p>

        {(displayDate || displayTime) && (
          <div className="bg-amber-50 rounded-2xl p-5 mb-8 space-y-3 text-left">
            {displayDate && (
              <div className="flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold text-warm-900 text-sm">{displayDate}</span>
              </div>
            )}
            {displayTime && (
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold text-warm-900 text-sm">{displayTime} (1 hour)</span>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-warm-800/40 mb-8">
          The exact studio address in West Hollywood will be sent to your email 24 hours before class.
        </p>

        <Link
          href="/"
          className="cta-gradient inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:scale-105"
        >
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center hero-gradient pt-20 pb-16">
        <div className="px-6 w-full">
          <Suspense fallback={<div className="text-warm-800/40 text-center">Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
