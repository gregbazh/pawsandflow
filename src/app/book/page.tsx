"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Loader2,
  Star,
  ChevronLeft,
  ChevronRight,
  Gift,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BRAND,
  BOOKING_WINDOWS,
  CLASS_TIMES,
  REVIEWS,
  parseDateString,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const selectStyles =
  "w-full px-3 py-2.5 text-sm rounded-lg border border-warm-200 bg-white text-warm-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer bg-[length:12px] bg-[right_10px_center] bg-no-repeat";
const selectBg =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239ca3af\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")';

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

const THUMBNAILS = [
  IMAGES.bookingSidebar,
  IMAGES.gallery1,
  IMAGES.gallery2,
  IMAGES.gallery5,
];

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [realSpots, setRealSpots] = useState<Record<string, number> | null>(null);
  const [loadingSpots, setLoadingSpots] = useState(false);
  const [mainImage, setMainImage] = useState<string>(IMAGES.bookingSidebar);

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

  function getSpots(timeId: string): number {
    if (realSpots && realSpots[timeId] !== undefined) {
      return realSpots[timeId];
    }
    return fallbackSpots[timeId] ?? BRAND.spotsPerClass;
  }

  const spotsForSelected = selectedTime ? getSpots(selectedTime) : 0;
  const hasLimitedSpots = selectedDate && selectedTime && spotsForSelected > 0 && spotsForSelected <= 5;

  async function handleBookNow() {
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, timeSlot: selectedTime }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Failed to create checkout.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <PromoBanner />
      <Header />
      <main className="min-h-screen pt-32 pb-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-warm-800/50 hover:text-amber-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Product layout: image left, details right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Images */}
            <div className="space-y-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-warm-50">
                <Image
                  src={mainImage}
                  alt="Puppy yoga class"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {THUMBNAILS.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setMainImage(src)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      mainImage === src ? "border-amber-500" : "border-transparent hover:border-amber-200"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product info + checkout */}
            <div className="flex flex-col">
              <p className="text-xs font-medium text-warm-800/50 uppercase tracking-wider mb-1">
                West Hollywood, Los Angeles
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 mb-2">
                Puppy Yoga Class (1h)
              </h1>
              <p className="text-lg font-semibold text-warm-900 mb-6">
                ${BRAND.price}.00 USD
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="date-select" className="block text-xs font-medium text-warm-800/60 mb-1">
                    Choose your date
                  </label>
                  <select
                    id="date-select"
                    value={selectedDate ?? ""}
                    onChange={(e) => {
                      const val = e.target.value || null;
                      setSelectedDate(val);
                      setSelectedTime(null);
                      setRealSpots(null);
                      setError(null);
                    }}
                    className={selectStyles}
                    style={{ backgroundImage: selectBg }}
                  >
                    <option value="">Select date</option>
                    {BOOKING_WINDOWS.map((bookingWindow) => {
                      const date = parseDateString(bookingWindow.date);
                      const dateStr = bookingWindow.date;
                      const isAvailable = bookingWindow.status === "available";
                      const label = `${date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}${isAvailable ? "" : " — Sold Out"}`;
                      return (
                        <option key={dateStr} value={dateStr} disabled={!isAvailable}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={selectedDate ? "" : "opacity-50 pointer-events-none"}>
                  <label htmlFor="time-select" className="block text-xs font-medium text-warm-800/60 mb-1">
                    Choose your timeslot
                  </label>
                  <select
                    id="time-select"
                    value={selectedTime ?? ""}
                    onChange={(e) => {
                      setSelectedTime(e.target.value || null);
                      setError(null);
                    }}
                    disabled={!selectedDate}
                    className={selectStyles}
                    style={{ backgroundImage: selectBg }}
                  >
                    <option value="">Select time</option>
                    {loadingSpots ? (
                      <option value="" disabled>Checking...</option>
                    ) : (
                      CLASS_TIMES.map((time) => {
                        const spots = getSpots(time.id);
                        const isFull = spots <= 0;
                        const label = isFull ? `${time.label} — Sold Out` : (spots <= 5 ? `${time.label} (${spots} left)` : time.label);
                        return (
                          <option key={time.id} value={time.id} disabled={isFull}>
                            {label}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>

                {selectedDate && selectedTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-warm-800/70">
                      {hasLimitedSpots ? "Limited spots available" : "Spots available"}
                    </span>
                  </div>
                )}

                <div className="text-xs text-warm-800/50 py-1">
                  + 1 Friend FREE — book one, bring one
                </div>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleBookNow}
                disabled={!selectedDate || !selectedTime || loading}
                className="mt-8 w-full py-3.5 rounded-xl cta-gradient text-white font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting to checkout...
                  </span>
                ) : (
                  "Book Now"
                )}
              </button>

              <p className="mt-3 text-xs text-center text-warm-800/40">
                Secure checkout · Powered by Stripe
              </p>
            </div>
          </div>

          <ReviewCarousel />
        </div>
      </main>
      <Footer />
    </>
  );
}
