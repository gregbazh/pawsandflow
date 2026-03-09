"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <PawPrint className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold gradient-text">Paws & Flow</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#about"
            className="hidden sm:block text-sm font-medium text-warm-800 hover:text-amber-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#faq"
            className="hidden sm:block text-sm font-medium text-warm-800 hover:text-amber-600 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/book"
            className="cta-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            Book a Class
          </Link>
        </div>
      </nav>
    </header>
  );
}
