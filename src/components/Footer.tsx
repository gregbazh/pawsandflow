import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">Paws & Flow</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted">
            <Link href="/#about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/book" className="hover:text-foreground transition-colors">
              Book
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Paws & Flow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
