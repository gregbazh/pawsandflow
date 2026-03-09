import Link from "next/link";
import Image from "next/image";
import {
  PawPrint,
  Sparkles,
  Heart,
  ChevronDown,
  Star,
  Gift,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { BRAND, FAQ_ITEMS } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

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

function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm">
                <PawPrint className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-warm-800">
                  Now booking in West Hollywood
                </span>
                <Sparkles className="w-4 h-4 text-rose-400" />
              </div>
            </Reveal>

            <Reveal>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05]">
                <span className="gradient-text">Yoga.</span>
                <br />
                <span className="gradient-text">Puppies.</span>
                <br />
                <span className="gradient-text">Pure Joy.</span>
              </h1>
            </Reveal>

            <Reveal delay={1}>
              <p className="mt-8 text-xl text-warm-800/60 leading-relaxed max-w-md">
                {BRAND.description}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/book"
                  className="cta-gradient text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
                >
                  Book Your Class
                </Link>
                <a
                  href="#about"
                  className="flex items-center gap-1.5 text-warm-800/50 hover:text-amber-600 transition-colors font-medium px-2 py-4"
                >
                  Learn more
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-16 flex items-center gap-6 text-sm text-warm-800/40">
                <span>Weekends</span>
                <span className="w-1 h-1 rounded-full bg-amber-300" />
                <span>1 Hour</span>
                <span className="w-1 h-1 rounded-full bg-amber-300" />
                <span>West Hollywood</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/15">
              <Image
                src={IMAGES.hero}
                alt="Puppy yoga class"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          {/* Mobile hero image */}
          <Reveal className="lg:hidden">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={IMAGES.hero}
                alt="Puppy yoga class"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Puppy Playtime",
      description: "Rescue puppies roam free. Pet them, cuddle them, let them climb on you.",
      color: "text-rose-500",
      bg: "bg-rose-50",
      image: IMAGES.cardPuppyPlay,
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Guided Yoga",
      description: "All-levels flow led by a professional instructor. No experience needed.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      image: IMAGES.cardYoga,
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Unforgettable Vibes",
      description: "Leave lighter, happier, and covered in puppy kisses.",
      color: "text-violet-500",
      bg: "bg-violet-50",
      image: IMAGES.cardVibes,
    },
  ];

  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-amber-500 font-semibold text-sm tracking-wide uppercase mb-3">The Experience</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight">
              What to Expect
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i + 1) as 1 | 2 | 3}>
              <div className="bg-white rounded-3xl overflow-hidden border border-amber-100">
                <div className="relative h-64 w-full">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <div className={`${feature.bg} ${feature.color} w-9 h-9 rounded-xl flex items-center justify-center mb-4 -mt-12 relative z-10 border-2 border-white shadow-sm`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-warm-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-warm-800/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [
    { src: IMAGES.gallery1, alt: "Puppy yoga moment", span: "md:col-span-2 md:row-span-2" },
    { src: IMAGES.gallery2, alt: "Happy puppy", span: "" },
    { src: IMAGES.gallery7, alt: "Yoga with puppies", span: "" },
    { src: IMAGES.gallery5, alt: "Adorable puppy", span: "md:col-span-2" },
  ];

  return (
    <section className="py-32 bg-warm-50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight">
              See for Yourself
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[240px]">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Pick a date & time", desc: "5 sessions every Saturday & Sunday." },
    { num: "02", title: "Book your spot", desc: "Fast checkout — takes 30 seconds." },
    { num: "03", title: "Show up & enjoy", desc: "Roll out your mat. We'll handle the puppies." },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-amber-500 font-semibold text-sm tracking-wide uppercase mb-3">Simple</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight">
              How It Works
            </h2>
          </div>
        </Reveal>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={(i + 1) as 1 | 2 | 3}>
              <div className="flex items-start gap-8 py-10 border-b border-amber-100 last:border-0">
                <span className="text-4xl font-extrabold text-amber-200 shrink-0 w-16">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-warm-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warm-800/60 text-lg">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center mt-16">
            <Link
              href="/book"
              className="cta-gradient inline-block text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
            >
              Book Your Class
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BringAFriendSection() {
  return (
    <section className="py-32 bg-warm-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={IMAGES.gallery1}
                alt="Friends at puppy yoga"
                fill
                className="object-cover"
                loading="lazy"
                sizes="50vw"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-rose-100 rounded-full px-4 py-2 mb-6">
                <Gift className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-semibold text-rose-600">Limited Time</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight mb-8">
                Bring a Friend
                <br />
                for Free
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-warm-800/60 text-lg leading-relaxed mb-8">
                Everything&apos;s better with a buddy — especially when puppies are involved.
                Book one spot, bring a friend at no extra charge.
              </p>
            </Reveal>

            <Reveal delay={2}>
              <ul className="space-y-4 mb-10">
                {[
                  "Book one class, second spot is free",
                  "Perfect for dates, birthdays, or friends' day out",
                  "Your friend gets the full experience",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-warm-800">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={3}>
              <Link
                href="/book"
                className="cta-gradient inline-block text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
              >
                Book Now
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold gradient-text tracking-tight">
              Questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i}>
              <details className="group bg-white rounded-2xl border border-amber-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-warm-900 hover:text-amber-600 transition-colors">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-amber-400 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-warm-800/60 leading-relaxed">
                  {item.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <Image
        src={IMAGES.banner2}
        alt=""
        fill
        className="object-cover"
        loading="lazy"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/90 to-rose-500/90" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <PawPrint className="w-10 h-10 text-white/80 mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
            Spots fill up fast. Book your puppy yoga class and treat yourself to an unforgettable hour.
          </p>
          <Link
            href="/book"
            className="bg-white text-amber-600 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 inline-block"
          >
            Book Now
          </Link>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-12 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-300 fill-amber-300" />
            ))}
            <span className="text-white/50 text-sm ml-2">Loved by hundreds</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <HowItWorksSection />
        <BringAFriendSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
