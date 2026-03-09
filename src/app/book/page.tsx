"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PawPrint,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Star,
  ChevronLeft,
  ChevronRight,
  Gift,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import {
  BRAND,
  BOOKING_WINDOWS,
  CLASS_TIMES,
  REVIEWS,
  formatDate,
  formatDateLong,
  parseDateString,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-center py-2.5 px-4 text-sm font-semibold fixed top-0 left-0 right-0 z-[60]">
      <div className="flex items-center justify-center gap-2">
        <Gift className="w-3.5 h-3.5" />
        <span>Bring a Friend for Free — Limited Time</span>
      </div>
    </div>
  );
}

function ReviewCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth ?? 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  }

  return (
    <div className="mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-amber-500 font-semibold text-sm tracking-wide uppercase mb-2">Social Proof</p>
          <h3 className="text-2xl font-bold text-warm-900">
            What People Are Saying
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm text-warm-800/50">
              5.0 · {REVIEWS.length} reviews
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-warm-800" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-amber-200 flex items-center justify-center hover:bg-amber-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-warm-800" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6"
      >
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-2xl overflow-hidden snap-start border border-amber-100"
          >
            <div className="relative h-72 w-full">
              <Image
                src={IMAGES[review.imageKey]}
                alt={`Photo from ${review.name}`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="300px"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-warm-900 text-sm">
                  {review.name}
                </span>
                <span className="text-xs text-warm-800/40">{review.date}</span>
              </div>
              <div className="flex mb-2.5">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-warm-800/60 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [realSpots, setRealSpots] = useState<Record<string, number> | null>(null);
  const [loadingSpots, setLoadingSpots] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [creatingIntent, setCreatingIntent] = useState(false);

  const selectedDateObj = selectedDate ? parseDateString(selectedDate) : null;
  const selectedTimeObj = CLASS_TIMES.find((t) => t.id === selectedTime);

  const fallbackSpots = useMemo(() => {
    const map: Record<string, number> = {};
    BOOKING_WINDOWS.forEach((bw) => {
      if (bw.status !== "available") return;
      CLASS_TIMES.forEach((t) => {
        map[t.id] = BRAND.spotsPerClass - Math.floor(Math.random() * 8);
      });
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAvailability = useCallback(async (date: string) => {
    setLoadingSpots(true);
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        if (!data.soldOut) {
          setRealSpots(data.spots);
        }
      }
    } catch {
      // fall back to fake spots
    } finally {
      setLoadingSpots(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, fetchAvailability]);

  // Auto-create PaymentIntent when date + time selected
  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      setClientSecret(null);
      setPaymentIntentId(null);
      return;
    }

    let cancelled = false;
    setCreatingIntent(true);
    setError(null);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate, timeSlot: selectedTime }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.clientSecret && data.paymentIntentId) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else {
          setError(data.message || "Failed to load checkout.");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Network error. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setCreatingIntent(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, selectedTime]);

  function getSpots(timeId: string): number {
    if (realSpots && realSpots[timeId] !== undefined) {
      return realSpots[timeId];
    }
    return fallbackSpots[timeId] ?? BRAND.spotsPerClass;
  }

  return (
    <>
      <PromoBanner />
      <Header />
      <main className="min-h-screen pt-32 pb-16 bg-warm-50">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-warm-800/50 hover:text-amber-600 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Selection */}
            <div className="lg:col-span-2 space-y-10">
              {/* Promo */}
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <span className="font-semibold text-warm-900 text-sm">Bring a Friend for Free</span>
                  <span className="text-warm-800/60 text-sm ml-1">— book one, bring one at no extra cost.</span>
                </div>
              </div>

              {/* Step 1: Date */}
              <div>
                <h2 className="text-lg font-bold text-warm-900 mb-5">
                  <span className="gradient-text mr-2">1.</span>
                  Pick a Date
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BOOKING_WINDOWS.map((bookingWindow) => {
                    const date = parseDateString(bookingWindow.date);
                    const dateStr = bookingWindow.date;
                    const isSelected = selectedDate === dateStr;
                    const isAvailable = bookingWindow.status === "available";
                    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                    const isSat = date.getDay() === 6;

                    return (
                      <button
                        key={dateStr}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (!isAvailable) return;
                          setSelectedDate(dateStr);
                          setSelectedTime(null);
                          setRealSpots(null);
                          setError(null);
                          setClientSecret(null);
                          setPaymentIntentId(null);
                        }}
                        className={`rounded-2xl p-4 text-center transition-all cursor-pointer ${
                          isSelected
                            ? "cta-gradient text-white shadow-lg shadow-amber-500/20"
                            : isAvailable
                              ? "bg-white border border-amber-100 hover:border-amber-300"
                              : "bg-warm-100 border border-warm-200 text-warm-800/40 cursor-not-allowed"
                        }`}
                      >
                        <div className={`text-xs font-medium mb-1 ${
                          isSelected ? "text-white/70" : isSat ? "text-amber-500" : "text-rose-400"
                        }`}>
                          {dayName}
                        </div>
                        <div className={`text-base font-bold ${isSelected ? "text-white" : "text-warm-900"}`}>
                          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                        {!isAvailable ? (
                          <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-red-500">
                            Sold Out
                          </div>
                        ) : !isSelected ? (
                          <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
                            Available
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Time */}
              <div
                className={`transition-all duration-300 ${
                  selectedDate ? "opacity-100" : "opacity-30 pointer-events-none"
                }`}
              >
                <h2 className="text-lg font-bold text-warm-900 mb-5">
                  <span className="gradient-text mr-2">2.</span>
                  Pick a Time
                </h2>

                {loadingSpots ? (
                  <div className="flex items-center gap-2 text-warm-800/50 py-8">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Checking availability...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CLASS_TIMES.map((time) => {
                      const isSelected = selectedTime === time.id;
                      const spots = getSpots(time.id);
                      const isFull = spots <= 0;
                      const showSpots = spots <= 5 && spots > 0;

                      return (
                        <button
                          key={time.id}
                          disabled={isFull}
                          onClick={() => {
                            if (!isFull) {
                              setSelectedTime(time.id);
                              setError(null);
                              setClientSecret(null);
                              setPaymentIntentId(null);
                            }
                          }}
                          className={`rounded-2xl p-5 text-left transition-all cursor-pointer ${
                            isFull
                              ? "bg-warm-100 border border-warm-200 text-warm-800/40 cursor-not-allowed"
                              : isSelected
                                ? "cta-gradient text-white shadow-lg shadow-amber-500/20"
                                : "bg-white border border-amber-100 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className={`w-4 h-4 ${isFull ? "text-warm-800/30" : isSelected ? "text-white/60" : "text-amber-400"}`} />
                              <span className={`text-lg font-bold ${isFull ? "text-warm-800/40" : isSelected ? "text-white" : "text-warm-900"}`}>
                                {time.label}
                              </span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-white/80" />}
                            {isFull && (
                              <span className="text-[11px] font-semibold uppercase text-red-500">Sold Out</span>
                            )}
                          </div>
                          {showSpots && (
                            <div className={`text-xs mt-2 flex items-center gap-1 ${
                              isSelected ? "text-white/60" : "text-rose-500 font-medium"
                            }`}>
                              <Users className="w-3 h-3" />
                              Only {spots} spot{spots !== 1 ? "s" : ""} left
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-36 bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={IMAGES.bookingSidebar}
                    alt="Puppy"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <PawPrint className="w-4 h-4" />
                      <span className="font-bold">Puppy & Flow</span>
                    </div>
                    <p className="text-white/70 text-xs">Puppy Yoga · West Hollywood</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs text-warm-800/50">Date</div>
                      <div className="font-semibold text-warm-900 text-sm">
                        {selectedDateObj ? formatDateLong(selectedDateObj) : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs text-warm-800/50">Time</div>
                      <div className="font-semibold text-warm-900 text-sm">
                        {selectedTimeObj ? `${selectedTimeObj.label} (1 hour)` : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs text-warm-800/50">Location</div>
                      <div className="font-semibold text-warm-900 text-sm">{BRAND.location}</div>
                      <div className="text-xs text-warm-800/40 mt-0.5">Address sent after booking</div>
                    </div>
                  </div>

                  <div className="border-t border-amber-100 pt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-800/60">Puppy Yoga Class</span>
                      <span className="font-bold text-warm-900">${BRAND.price}.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-800/60">+ 1 Friend</span>
                      <span className="font-bold text-emerald-600">FREE</span>
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <>
                      <div>
                        <label htmlFor="booking-email" className="block text-xs text-warm-800/50 mb-1.5">
                          Email for confirmation
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            try {
                              sessionStorage.setItem("booking_email", e.target.value);
                            } catch {
                              // ignore
                            }
                          }}
                          className="w-full px-4 py-3 rounded-2xl border border-amber-200 text-warm-900 placeholder:text-warm-800/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-medium">
                      {error}
                    </div>
                  )}

                  {creatingIntent && selectedDate && selectedTime ? (
                    <div className="flex items-center gap-2 text-warm-800/50 py-6">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Loading payment options...</span>
                    </div>
                  ) : clientSecret && paymentIntentId ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#f59e0b",
                            borderRadius: "16px",
                          },
                        },
                      }}
                    >
                      <CheckoutForm
                        paymentIntentId={paymentIntentId}
                        onError={(msg) => setError(msg)}
                      />
                    </Elements>
                  ) : selectedDate && selectedTime ? null : (
                    <p className="text-sm text-warm-800/40 py-4 text-center">
                      Select a date and time to continue
                    </p>
                  )}

                  <p className="text-xs text-center text-warm-800/40">
                    Secure checkout · Powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ReviewCarousel />

        </div>
      </main>
      <Footer />
    </>
  );
}
