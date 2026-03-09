# Paws & Flow — Puppy Yoga in Los Angeles

A booking website for puppy yoga classes in LA. Built with Next.js, Tailwind CSS, and Stripe.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then add your Stripe secret key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your **Secret Key** from [API Keys](https://dashboard.stripe.com/apikeys)
3. Add it to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `STRIPE_SECRET_KEY` as an environment variable in the Vercel dashboard
4. Deploy

## Class Schedule

- **Days:** Saturdays & Sundays
- **Times:** 9:30 AM, 10:45 AM, 12:00 PM, 2:00 PM, 3:15 PM
- **Duration:** 1 hour
- **Spots:** 22 per class
- **Price:** $55
