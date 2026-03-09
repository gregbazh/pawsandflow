import Link from "next/link";
import { PawPrint, CheckCircle2, PartyPopper, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center hero-gradient pt-20 pb-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-amber-100">
            <div className="relative inline-block mb-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              <PawPrint className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 rotate-12" />
            </div>

            <h1 className="text-3xl font-extrabold gradient-text mb-3">
              You&apos;re Booked!
            </h1>

            <p className="text-warm-800/60 mb-6 leading-relaxed">
              Get ready for the most adorable yoga session of your life! We
              can&apos;t wait to see you on the mat — surrounded by puppies.
            </p>

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
      </main>
      <Footer />
    </>
  );
}
