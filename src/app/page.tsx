import Link from "next/link";
import Image from "next/image";
import {
  PawPrint,
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
    <div className="bg-foreground text-white text-center py-2.5 px-4 text-sm fixed top-0 left-0 right-0 z-[60]">
      <div className="flex items-center justify-center gap-2">
        <Gift className="w-3.5 h-3.5" />
        <span>Bring a Friend for Free — Limited Time</span>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] text-foreground">
                Yoga.
                <br />
                Puppies.
                <br />
                <span className="gradient-text">Pure Joy.</span>
              </h1>
            </Reveal>

            <Reveal delay={1}>
              <p className="mt-8 text-xl text-muted leading-relaxed max-w-md">
                {BRAND.description}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/book"
                  className="bg-foreground text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-foreground/80 transition-colors"
                >
                  Book Your Class
                </Link>
                <a
                  href="#about"
                  className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors font-medium px-2 py-4"
                >
                  Learn more
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-16 flex items-center gap-6 text-sm text-muted">
                <span>Weekends</span>
                <span className="w-1 h-1 rounded-full bg-muted" />
                <span>1 Hour</span>
                <span className="w-1 h-1 rounded-full bg-muted" />
                <span>West Hollywood</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
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
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    {
      title: "Puppy Playtime",
      description: "Rescue puppies roam free. Pet them, cuddle them, let them climb on you.",
      image: IMAGES.cardPuppyPlay,
    },
    {
      title: "Guided Yoga",
      description: "All-levels flow led by a professional instructor. No experience needed.",
      image: IMAGES.cardYoga,
    },
    {
      title: "Unforgettable Vibes",
      description: "Leave lighter, happier, and covered in puppy kisses.",
      image: IMAGES.cardVibes,
    },
  ];

  return (
    <section id="about" className="py-32 bg-subtle">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">The Experience</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              What to Expect
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i + 1) as 1 | 2 | 3}>
              <div className="bg-white rounded-3xl overflow-hidden">
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
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
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
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
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
    <section className="py-32 bg-subtle">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Simple</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              How It Works
            </h2>
          </div>
        </Reveal>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={(i + 1) as 1 | 2 | 3}>
              <div className="flex items-start gap-8 py-10 border-b border-black/5 last:border-0">
                <span className="text-4xl font-bold text-accent/30 shrink-0 w-16">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-lg">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center mt-16">
            <Link
              href="/book"
              className="bg-foreground text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-foreground/80 transition-colors"
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
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
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
              <p className="text-rose font-medium text-sm tracking-wide uppercase mb-3">Limited Time</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-8">
                Bring a Friend
                <br />
                for Free
              </h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="text-muted text-lg leading-relaxed mb-8">
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
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
                className="bg-foreground text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-foreground/80 transition-colors inline-block"
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
    <section id="faq" className="py-32 bg-subtle">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i}>
              <details className="group bg-white rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-foreground hover:text-accent transition-colors">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-muted group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-muted leading-relaxed">
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
    <section className="relative py-40 bg-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={IMAGES.banner2}
          alt=""
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <PawPrint className="w-10 h-10 text-accent mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
            Ready?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
            Spots fill up fast. Book your puppy yoga class and treat yourself to an unforgettable hour.
          </p>
          <Link
            href="/book"
            className="bg-white text-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-colors inline-block"
          >
            Book Now
          </Link>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-12 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent fill-accent" />
            ))}
            <span className="text-white/40 text-sm ml-2">Loved by hundreds</span>
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
