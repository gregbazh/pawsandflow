import Link from "next/link";
import {
  PawPrint,
  Sparkles,
  Heart,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  ChevronDown,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND, CLASS_TIMES, FAQ_ITEMS } from "@/lib/constants";

function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawPrint className="absolute top-[15%] left-[8%] w-16 h-16 text-amber-300/20 rotate-[-20deg] animate-float" />
        <PawPrint className="absolute top-[25%] right-[12%] w-12 h-12 text-rose-300/20 rotate-[15deg] animate-float-delayed" />
        <PawPrint className="absolute bottom-[30%] left-[15%] w-10 h-10 text-amber-300/15 rotate-[30deg] animate-float-delayed" />
        <PawPrint className="absolute bottom-[20%] right-[8%] w-14 h-14 text-rose-300/15 rotate-[-10deg] animate-float" />
        <PawPrint className="absolute top-[60%] left-[45%] w-8 h-8 text-amber-300/10 rotate-[45deg] animate-float" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm">
            <PawPrint className="w-4 h-4 text-amber-500 animate-paw-bounce" />
            <span className="text-sm font-medium text-warm-800">
              Now booking in Los Angeles
            </span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="gradient-text">Yoga with</span>
            <br />
            <span className="gradient-text">Puppies</span>
          </h1>

          <p className="text-lg sm:text-xl text-warm-800/70 mb-10 max-w-xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="cta-gradient text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105 w-full sm:w-auto"
            >
              Book Your Class — ${BRAND.price}
            </Link>
            <a
              href="#about"
              className="flex items-center gap-2 text-warm-800/60 hover:text-amber-600 transition-colors font-medium"
            >
              Learn more
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8 text-sm text-warm-800/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Weekends Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>1 Hour Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Los Angeles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function AboutSection() {
  const cards = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Puppy Playtime",
      description:
        "Our rescue puppies roam freely throughout the class. Pet them, cuddle them, let them climb on you — it's all part of the experience.",
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Guided Yoga",
      description:
        "A professional instructor guides you through a relaxing, all-levels flow designed to de-stress and bring you pure happiness.",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Unforgettable Vibes",
      description:
        "Leave feeling lighter, happier, and covered in puppy kisses. It's self-care meets serotonin overload.",
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
            What to Expect
          </h2>
          <p className="text-warm-800/60 max-w-lg mx-auto">
            An hour of yoga, puppies, and pure joy — it&apos;s the most fun
            you&apos;ll ever have on a yoga mat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="card-hover bg-white border border-amber-100 rounded-3xl p-8 text-center"
            >
              <div
                className={`${card.bg} ${card.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-warm-900 mb-3">
                {card.title}
              </h3>
              <p className="text-warm-800/60 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Pick a Date & Time",
      description: "Choose your preferred weekend class — we have 5 sessions every Saturday & Sunday.",
    },
    {
      step: "2",
      title: "Book & Pay",
      description: `Secure your spot for just $${BRAND.price}. Fast, easy checkout — takes 30 seconds.`,
    },
    {
      step: "3",
      title: "Show Up & Enjoy",
      description:
        "Arrive, roll out your mat, and get ready for the best hour of your week.",
    },
  ];

  return (
    <section className="py-24 bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
            How It Works
          </h2>
          <p className="text-warm-800/60 max-w-lg mx-auto">
            Three steps to the happiest hour of your life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="cta-gradient w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-lg shadow-amber-500/20">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-warm-900 mb-3">
                {step.title}
              </h3>
              <p className="text-warm-800/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/book"
            className="cta-gradient inline-block text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            Book Your Class Now
          </Link>
        </div>
      </div>
    </section>
  );
}

function DetailsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
            Class Details
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-amber-50 rounded-3xl p-6 text-center card-hover">
            <DollarSign className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-warm-900">${BRAND.price}</div>
            <div className="text-sm text-warm-800/60">per class</div>
          </div>
          <div className="bg-rose-50 rounded-3xl p-6 text-center card-hover">
            <Clock className="w-8 h-8 text-rose-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-warm-900">{BRAND.classDurationMinutes} min</div>
            <div className="text-sm text-warm-800/60">per session</div>
          </div>
          <div className="bg-violet-50 rounded-3xl p-6 text-center card-hover">
            <Users className="w-8 h-8 text-violet-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-warm-900">{BRAND.spotsPerClass} spots</div>
            <div className="text-sm text-warm-800/60">max per class</div>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-6 text-center card-hover">
            <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-warm-900">LA</div>
            <div className="text-sm text-warm-800/60">Los Angeles, CA</div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-50 to-rose-50 rounded-3xl p-8 sm:p-10">
          <h3 className="text-xl font-bold text-warm-900 mb-6 text-center">
            Class Schedule (Saturdays & Sundays)
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {CLASS_TIMES.map((time) => (
              <div
                key={time.id}
                className="bg-white rounded-2xl px-6 py-3 shadow-sm border border-amber-100 font-semibold text-warm-800"
              >
                {time.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
            Questions? We&apos;ve Got Answers
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-amber-100 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-warm-900 hover:text-amber-600 transition-colors">
                {item.q}
                <ChevronDown className="w-5 h-5 text-amber-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-warm-800/60 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <PawPrint className="absolute top-[20%] left-[10%] w-12 h-12 text-amber-300/15 rotate-[-15deg]" />
        <PawPrint className="absolute bottom-[25%] right-[10%] w-10 h-10 text-rose-300/15 rotate-[20deg]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
          Ready for the Best Hour Ever?
        </h2>
        <p className="text-warm-800/60 mb-8 max-w-lg mx-auto text-lg">
          Spots fill up fast. Book your puppy yoga class today and treat
          yourself to an unforgettable experience.
        </p>
        <Link
          href="/book"
          className="cta-gradient inline-block text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
        >
          Book Now — ${BRAND.price}
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <DetailsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
