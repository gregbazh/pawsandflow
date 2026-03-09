import Link from "next/link";
import Image from "next/image";
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
import { IMAGES } from "@/lib/images";

function HeroSection() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawPrint className="absolute top-[15%] left-[8%] w-16 h-16 text-amber-300/20 rotate-[-20deg] animate-float" />
        <PawPrint className="absolute top-[25%] right-[12%] w-12 h-12 text-rose-300/20 rotate-[15deg] animate-float-delayed" />
        <PawPrint className="absolute bottom-[30%] left-[15%] w-10 h-10 text-amber-300/15 rotate-[30deg] animate-float-delayed" />
        <PawPrint className="absolute bottom-[20%] right-[8%] w-14 h-14 text-rose-300/15 rotate-[-10deg] animate-float" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
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

            <p className="text-lg sm:text-xl text-warm-800/70 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {BRAND.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Link
                href="/book"
                className="cta-gradient text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105 w-full sm:w-auto text-center"
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

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-warm-800/50">
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

          {/* Hero images */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 rotate-2">
              <Image
                src={IMAGES.hero}
                alt="Adorable puppy"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-6">
              <Image
                src={IMAGES.heroSecondary}
                alt="Happy puppy"
                fill
                className="object-cover"
                priority
                sizes="200px"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-warm-900">10+ puppies!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero image */}
        <div className="mt-10 lg:hidden">
          <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={IMAGES.hero}
              alt="Adorable puppy"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
      icon: <Heart className="w-6 h-6" />,
      title: "Puppy Playtime",
      description:
        "Our rescue puppies roam freely throughout the class. Pet them, cuddle them, let them climb on you — it's all part of the experience.",
      color: "text-rose-500",
      bg: "bg-rose-50",
      image: IMAGES.cardPuppyPlay,
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Guided Yoga",
      description:
        "A professional instructor guides you through a relaxing, all-levels flow designed to de-stress and bring you pure happiness.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      image: IMAGES.cardYoga,
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Unforgettable Vibes",
      description:
        "Leave feeling lighter, happier, and covered in puppy kisses. It's self-care meets serotonin overload.",
      color: "text-violet-500",
      bg: "bg-violet-50",
      image: IMAGES.cardVibes,
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
              className="card-hover bg-white border border-amber-100 rounded-3xl overflow-hidden"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <div
                  className={`${card.bg} ${card.color} w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 border-2 border-white shadow-sm`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-warm-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-warm-800/60 leading-relaxed text-sm">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [
    { src: IMAGES.gallery1, alt: "Golden retriever puppy", span: "col-span-2 row-span-2" },
    { src: IMAGES.gallery2, alt: "Playful puppy", span: "" },
    { src: IMAGES.gallery3, alt: "Cute kitten", span: "" },
    { src: IMAGES.gallery4, alt: "Puppy close-up", span: "" },
    { src: IMAGES.gallery5, alt: "Adorable puppy", span: "" },
    { src: IMAGES.gallery6, alt: "Happy dog", span: "col-span-2" },
    { src: IMAGES.gallery7, alt: "Dog portrait", span: "" },
    { src: IMAGES.gallery8, alt: "Puppy with toy", span: "" },
  ];

  return (
    <section className="py-24 bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text">
            Cuteness Overload
          </h2>
          <p className="text-warm-800/60 max-w-lg mx-auto">
            Just a taste of what&apos;s waiting for you on the mat.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageBanner() {
  return (
    <section className="relative h-72 sm:h-96 overflow-hidden">
      <Image
        src={IMAGES.banner1}
        alt="Dogs running happily"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/80 to-rose-500/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <PawPrint className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Life&apos;s Better with Puppies
          </h3>
          <p className="text-white/80 text-lg">
            And yoga. Definitely yoga too.
          </p>
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
    <section className="py-24 bg-white">
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
    <section className="py-24 bg-warm-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 gradient-text">
              Class Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-amber-100 card-hover">
                <DollarSign className="w-7 h-7 text-amber-500 mb-2" />
                <div className="text-2xl font-bold text-warm-900">${BRAND.price}</div>
                <div className="text-sm text-warm-800/60">per class</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-amber-100 card-hover">
                <Clock className="w-7 h-7 text-rose-500 mb-2" />
                <div className="text-2xl font-bold text-warm-900">{BRAND.classDurationMinutes} min</div>
                <div className="text-sm text-warm-800/60">per session</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-amber-100 card-hover">
                <Users className="w-7 h-7 text-violet-500 mb-2" />
                <div className="text-2xl font-bold text-warm-900">{BRAND.spotsPerClass} spots</div>
                <div className="text-sm text-warm-800/60">max per class</div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-amber-100 card-hover">
                <MapPin className="w-7 h-7 text-emerald-500 mb-2" />
                <div className="text-2xl font-bold text-warm-900">LA</div>
                <div className="text-sm text-warm-800/60">Los Angeles, CA</div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl p-6 border border-amber-100">
              <h3 className="text-base font-bold text-warm-900 mb-4">
                Class Schedule (Sat & Sun)
              </h3>
              <div className="flex flex-wrap gap-2">
                {CLASS_TIMES.map((time) => (
                  <div
                    key={time.id}
                    className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl px-4 py-2 text-sm font-semibold text-warm-800"
                  >
                    {time.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-xl -rotate-2">
              <Image
                src={IMAGES.gallery1}
                alt="Happy dog"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-3">
              <Image
                src={IMAGES.gallery4}
                alt="Cute puppy"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
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
    <section className="relative py-32 overflow-hidden">
      <Image
        src={IMAGES.banner2}
        alt="Happy dog"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/90 to-rose-500/90" />
      <div className="absolute inset-0 pointer-events-none">
        <PawPrint className="absolute top-[20%] left-[10%] w-12 h-12 text-white/10 rotate-[-15deg]" />
        <PawPrint className="absolute bottom-[25%] right-[10%] w-10 h-10 text-white/10 rotate-[20deg]" />
        <PawPrint className="absolute top-[50%] right-[30%] w-8 h-8 text-white/5 rotate-[40deg]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
          Ready for the Best Hour Ever?
        </h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
          Spots fill up fast. Book your puppy yoga class today and treat
          yourself to an unforgettable experience.
        </p>
        <Link
          href="/book"
          className="inline-block bg-white text-amber-600 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
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
        <GallerySection />
        <ImageBanner />
        <HowItWorksSection />
        <DetailsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
