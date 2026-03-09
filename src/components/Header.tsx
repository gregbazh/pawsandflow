"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-[36px] left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <nav className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="w-7 h-7 text-accent" />
          <span className="text-lg font-semibold text-foreground">Paws & Flow</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/#about"
            className="hidden sm:block text-sm text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/#faq"
            className="hidden sm:block text-sm text-muted hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/book"
            className="bg-foreground text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-foreground/80 transition-colors"
          >
            Book a Class
          </Link>
        </div>
      </nav>
    </header>
  );
}
