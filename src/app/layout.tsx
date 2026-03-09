import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puppy Yoga Classes in Los Angeles | Puppy & Flow",
  description:
    "Book puppy yoga classes in Los Angeles. Play with adorable rescue puppies while enjoying a guided yoga session in West Hollywood. Classes every weekend — spots fill fast!",
  keywords: [
    "puppy yoga",
    "puppy yoga los angeles",
    "puppy yoga LA",
    "yoga with puppies",
    "puppy yoga west hollywood",
    "puppy yoga class",
    "dog yoga los angeles",
    "puppy yoga near me",
    "puppy yoga experience",
    "puppy & flow",
  ],
  openGraph: {
    title: "Puppy Yoga Classes in Los Angeles | Puppy & Flow",
    description:
      "Yoga. Puppies. Pure Joy. Book your puppy yoga class in West Hollywood — rescue puppies, professional instruction, and unforgettable vibes.",
    type: "website",
    locale: "en_US",
    siteName: "Puppy & Flow",
    url: "https://pawsandflow.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puppy Yoga Classes in Los Angeles | Puppy & Flow",
    description:
      "Yoga. Puppies. Pure Joy. Book your puppy yoga class in West Hollywood — rescue puppies, professional instruction, and unforgettable vibes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pawsandflow.vercel.app",
  },
};

function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Puppy & Flow",
    description:
      "Puppy yoga classes in West Hollywood, Los Angeles. Play with adorable rescue puppies while enjoying a guided all-levels yoga session.",
    url: "https://pawsandflow.vercel.app",
    address: {
      "@type": "PostalAddress",
      addressLocality: "West Hollywood",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0901,
      longitude: -118.3617,
    },
    priceRange: "$55",
    openingHours: ["Sa 09:30-16:15", "Su 09:30-16:15"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "6",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Puppy Yoga Classes",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Puppy Yoga Class",
            description:
              "60-minute guided yoga class surrounded by adorable rescue puppies.",
          },
          price: "55.00",
          priceCurrency: "USD",
          availability: "https://schema.org/LimitedAvailability",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
