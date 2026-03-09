export const BRAND = {
  name: "Paws & Flow",
  tagline: "Yoga. Puppies. Pure Joy.",
  description:
    "Experience the most joyful yoga class in Los Angeles — surrounded by adorable, playful puppies.",
  location: "Los Angeles, CA",
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

export function getUpcomingWeekends(count: number = 8): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const current = new Date(today);

  while (dates.length < count) {
    const day = current.getDay();
    if (day === 0 || day === 6) {
      if (current >= today) {
        dates.push(new Date(current));
      }
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
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
