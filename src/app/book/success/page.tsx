"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PawPrint, CheckCircle2, ArrowRight, CalendarDays, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/images";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const date = params.get("date");
  const time = params.get("time");

  const displayDate = date
    ? new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden max-w-lg mx-auto">
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
            <PawPrint className="w-4 h-4 text-accent absolute -top-0.5 -right-0.5 rotate-12" />
          </div>
        </div>
      </div>

      <div className="p-10 pt-6 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          You&apos;re Booked
        </h1>

        <p className="text-muted mb-8 leading-relaxed">
          Get ready for the most adorable yoga session of your life.
          We can&apos;t wait to see you.
        </p>

        {(displayDate || time) && (
          <div className="bg-subtle rounded-xl p-5 mb-8 space-y-3 text-left">
            {displayDate && (
              <div className="flex items-center gap-3">
                <CalendarDays className="w-4 h-4 text-muted shrink-0" />
                <span className="font-medium text-foreground text-sm">{displayDate}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted shrink-0" />
                <span className="font-medium text-foreground text-sm">{time} (1 hour)</span>
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-muted mb-8">
          The exact studio address in West Hollywood will be sent to your email 24 hours before class.
        </p>

        <Link
          href="/"
          className="bg-foreground text-white inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium hover:bg-foreground/80 transition-colors"
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
      <main className="min-h-screen flex items-center justify-center bg-subtle pt-20 pb-16">
        <div className="px-6 w-full">
          <Suspense fallback={<div className="text-muted text-center">Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
