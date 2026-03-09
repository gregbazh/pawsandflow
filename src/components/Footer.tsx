import { PawPrint, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white">Puppy & Flow</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-warm-200/60">
            <Link href="/#about" className="hover:text-amber-400 transition-colors">
              About
            </Link>
            <Link href="/#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </Link>
            <Link href="/book" className="hover:text-amber-400 transition-colors">
              Book
            </Link>
          </div>

          <p className="text-sm flex items-center gap-1 text-warm-200/40">
            Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> in LA
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-warm-200/10 text-center text-xs text-warm-200/30">
          &copy; {new Date().getFullYear()} Puppy & Flow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
