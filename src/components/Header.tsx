"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-[36px] left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-amber-100/50">
      <nav className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="w-7 h-7 text-amber-500" />
          <span className="text-lg font-bold gradient-text">Puppy & Flow</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/#about"
            className="hidden sm:block text-sm text-warm-800 hover:text-amber-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#faq"
            className="hidden sm:block text-sm text-warm-800 hover:text-amber-600 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/book"
            className="cta-gradient text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:scale-105"
          >
            Book a Class
          </Link>
        </div>
      </nav>
    </header>
  );
}
