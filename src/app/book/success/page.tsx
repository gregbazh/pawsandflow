"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PawPrint, CheckCircle2, PartyPopper, ArrowRight, CalendarDays, Clock } from "lucide-react";
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
    <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={IMAGES.successPuppy}
          alt="Happy puppy"
          fill
          className="object-cover"
          sizes="500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="relative inline-block">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 bg-white rounded-full" />
            <PawPrint className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 rotate-12" />
          </div>
        </div>
      </div>

      <div className="p-10 pt-4">

      <h1 className="text-3xl font-extrabold gradient-text mb-3">
        You&apos;re Booked!
      </h1>

      <p className="text-warm-800/60 mb-6 leading-relaxed">
        Get ready for the most adorable yoga session of your life! We
        can&apos;t wait to see you on the mat — surrounded by puppies.
      </p>

      {(displayDate || time) && (
        <div className="bg-warm-50 rounded-2xl p-5 mb-6 space-y-3 text-left">
          {displayDate && (
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="font-semibold text-warm-900">{displayDate}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="font-semibold text-warm-900">{time} (1 hour)</span>
            </div>
          )}
        </div>
      )}

      <div className="bg-amber-50 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-center gap-2 text-amber-700 font-medium">
          <PartyPopper className="w-5 h-5" />
          <span>Confirmation sent to your email</span>
        </div>
      </div>

      <p className="text-sm text-warm-800/40 mb-8">
        The exact studio address in LA will be sent to your email 24
        hours before class.
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
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <Suspense fallback={<div className="text-warm-800/40">Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
