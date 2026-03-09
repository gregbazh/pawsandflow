"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  PawPrint,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BRAND,
  CLASS_TIMES,
  getUpcomingWeekends,
  formatDate,
  formatDateLong,
  dateToString,
} from "@/lib/constants";

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const weekends = useMemo(() => getUpcomingWeekends(8), []);

  const selectedDateObj = weekends.find(
    (d) => dateToString(d) === selectedDate
  );
  const selectedTimeObj = CLASS_TIMES.find((t) => t.id === selectedTime);

  const spotsRemaining = useMemo(() => {
    const map: Record<string, number> = {};
    weekends.forEach((d) => {
      CLASS_TIMES.forEach((t) => {
        const key = `${dateToString(d)}-${t.id}`;
        map[key] = BRAND.spotsPerClass - Math.floor(Math.random() * 8);
      });
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getSpots(dateStr: string, timeId: string): number {
    return spotsRemaining[`${dateStr}-${timeId}`] ?? BRAND.spotsPerClass;
  }

  function handleCheckout() {
    if (!selectedDate || !selectedTime) return;
    setLoading(true);
    const params = new URLSearchParams({
      date: selectedDate,
      time: selectedTimeObj?.label || "",
    });
    window.location.href = `/book/success?${params.toString()}`;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-warm-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-warm-800/50 hover:text-amber-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Date */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="cta-gradient w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-warm-900">
                    Pick a Date
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {weekends.map((date) => {
                    const dateStr = dateToString(date);
                    const isSelected = selectedDate === dateStr;
                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    const isSat = date.getDay() === 6;

                    return (
                      <button
                        key={dateStr}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime(null);
                        }}
                        className={`relative rounded-2xl p-4 text-center border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "time-slot-selected border-transparent shadow-lg scale-[1.02]"
                            : "bg-white border-amber-100 hover:border-amber-300 hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`text-xs font-medium mb-1 ${
                            isSelected
                              ? "text-white/80"
                              : isSat
                                ? "text-amber-500"
                                : "text-rose-400"
                          }`}
                        >
                          {dayName}
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            isSelected ? "text-white" : "text-warm-900"
                          }`}
                        >
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Time */}
              <div
                className={`transition-all duration-300 ${
                  selectedDate
                    ? "opacity-100 translate-y-0"
                    : "opacity-30 pointer-events-none translate-y-2"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedDate
                        ? "cta-gradient text-white"
                        : "bg-warm-200 text-warm-800/40"
                    }`}
                  >
                    2
                  </div>
                  <h2 className="text-xl font-bold text-warm-900">
                    Pick a Time
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {CLASS_TIMES.map((time) => {
                    const isSelected = selectedTime === time.id;
                    const spots = selectedDate
                      ? getSpots(selectedDate, time.id)
                      : BRAND.spotsPerClass;
                    const spotsLow = spots <= 5;

                    return (
                      <button
                        key={time.id}
                        onClick={() => setSelectedTime(time.id)}
                        className={`rounded-2xl p-5 text-left border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "time-slot-selected border-transparent shadow-lg scale-[1.02]"
                            : "bg-white border-amber-100 hover:border-amber-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock
                              className={`w-4 h-4 ${
                                isSelected ? "text-white/80" : "text-amber-400"
                              }`}
                            />
                            <span
                              className={`text-lg font-bold ${
                                isSelected ? "text-white" : "text-warm-900"
                              }`}
                            >
                              {time.label}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            isSelected
                              ? "text-white/80"
                              : spotsLow
                                ? "text-rose-500 font-medium"
                                : "text-warm-800/50"
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          {spots} spot{spots !== 1 ? "s" : ""} left
                          {spotsLow && !isSelected && " — filling fast!"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden">
                <div className="cta-gradient p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <PawPrint className="w-5 h-5" />
                    <span className="font-bold text-lg">Your Class</span>
                  </div>
                  <p className="text-white/80 text-sm">Paws & Flow — Puppy Yoga</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm text-warm-800/50">Date</div>
                      <div className="font-semibold text-warm-900">
                        {selectedDateObj
                          ? formatDateLong(selectedDateObj)
                          : "Select a date"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm text-warm-800/50">Time</div>
                      <div className="font-semibold text-warm-900">
                        {selectedTimeObj
                          ? `${selectedTimeObj.label} (1 hour)`
                          : "Select a time"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm text-warm-800/50">Location</div>
                      <div className="font-semibold text-warm-900">
                        {BRAND.location}
                      </div>
                      <div className="text-xs text-warm-800/40 mt-0.5">
                        Exact address sent after booking
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-amber-100 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-warm-800/60">Puppy Yoga Class</span>
                      <span className="font-bold text-warm-900">
                        ${BRAND.price}.00
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={!selectedDate || !selectedTime || loading}
                    className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all ${
                      selectedDate && selectedTime && !loading
                        ? "cta-gradient shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] cursor-pointer"
                        : "bg-warm-200 text-warm-800/40 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      `Book Now — $${BRAND.price}`
                    )}
                  </button>

                  <p className="text-xs text-center text-warm-800/40">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile sticky checkout */}
          {selectedDate && selectedTime && (
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/95 backdrop-blur-md border-t border-amber-100 p-4 z-40">
              <div className="flex items-center justify-between max-w-lg mx-auto">
                <div>
                  <div className="font-bold text-warm-900">
                    {selectedDateObj && formatDate(selectedDateObj)} ·{" "}
                    {selectedTimeObj?.label}
                  </div>
                  <div className="text-sm text-warm-800/50">
                    ${BRAND.price}.00 · {BRAND.location}
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="cta-gradient text-white px-6 py-3 rounded-full font-bold shadow-lg cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
