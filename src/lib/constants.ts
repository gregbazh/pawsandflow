export const BRAND = {
  name: "Pups & Poses",
  tagline: "Yoga. Puppies. Pure Joy.",
  description:
    "Experience the most joyful yoga class in Los Angeles — surrounded by adorable, playful puppies.",
  location: "West Hollywood, Los Angeles",
  price: 55,
  spotsPerClass: 22,
  classDurationMinutes: 60,
};

export const CLASS_TIMES = [
  { id: "0930", label: "9:30 AM", hour: 9, minute: 30 },
  { id: "1045", label: "10:45 AM", hour: 10, minute: 45 },
  { id: "1200", label: "12:00 PM", hour: 12, minute: 0 },
  { id: "1400", label: "2:00 PM", hour: 14, minute: 0 },
  { id: "1515", label: "3:15 PM", hour: 15, minute: 15 },
] as const;

export type ClassTime = (typeof CLASS_TIMES)[number];

export const BOOKING_WINDOWS = [
  { date: "2026-03-13", status: "booked" },
  { date: "2026-03-20", status: "booked" },
  { date: "2026-03-27", status: "booked" },
  { date: "2026-03-28", status: "available" },
  { date: "2026-04-03", status: "unavailable" },
  { date: "2026-04-10", status: "unavailable" },
  { date: "2026-04-17", status: "unavailable" },
  { date: "2026-04-24", status: "unavailable" },
] as const;

export type BookingWindow = (typeof BOOKING_WINDOWS)[number];

export function parseDateString(dateString: string): Date {
  return new Date(`${dateString}T12:00:00`);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function dateToString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const REVIEWS = [
  {
    name: "Jessica M.",
    rating: 5,
    text: "Literally the best experience ever. A tiny golden retriever fell asleep on my mat during savasana and I almost cried from happiness.",
    date: "2 weeks ago",
    imageKey: "review1" as const,
  },
  {
    name: "Daniel K.",
    rating: 5,
    text: "Bought this for my girlfriend's birthday and she said it was the best gift she's ever received. We're already booked for next month!",
    date: "1 week ago",
    imageKey: "review2" as const,
  },
  {
    name: "Priya S.",
    rating: 5,
    text: "I've done yoga for 10 years and this is hands down the most fun I've ever had in a class. The puppies are so well taken care of too.",
    date: "3 days ago",
    imageKey: "review3" as const,
  },
  {
    name: "Marcus T.",
    rating: 5,
    text: "Came in stressed from work, left feeling like a completely new person. Also I'm now seriously considering adopting a puppy.",
    date: "5 days ago",
    imageKey: "review4" as const,
  },
  {
    name: "Ashley R.",
    rating: 5,
    text: "The instructor was amazing and the puppies were ADORABLE. One kept licking my face during downward dog. 10/10 would recommend to everyone.",
    date: "1 week ago",
    imageKey: "review5" as const,
  },
  {
    name: "Chris L.",
    rating: 5,
    text: "My friend group of 6 all went together and it was the highlight of our month. Already planning our next visit. The vibes are immaculate.",
    date: "4 days ago",
    imageKey: "review6" as const,
  },
];

export const FAQ_ITEMS = [
  {
    q: "Do I need yoga experience?",
    a: "Not at all! Our classes are designed for all levels, from total beginners to experienced yogis. The puppies don't judge — and neither do we.",
  },
  {
    q: "What should I bring?",
    a: "Just yourself and a smile! We provide yoga mats and all the puppy cuddles. Wear comfortable clothes you don't mind getting a little furry.",
  },
  {
    q: "Are the puppies adoptable?",
    a: "Yes! We partner with local rescue organizations. If you fall in love with a furry friend during class, we can help you start the adoption process.",
  },
  {
    q: "What happens if a puppy interrupts my pose?",
    a: "That's the best part! Puppy interruptions are encouraged. Downward dog takes on a whole new meaning here.",
  },
  {
    q: "What's the refund policy?",
    a: "Full refunds are available up to 24 hours before your class. After that, you can reschedule to any available class within 30 days.",
  },
  {
    q: "How many puppies will be there?",
    a: "We typically have 8-12 puppies per class, so there are plenty of furry friends to go around!",
  },
];
