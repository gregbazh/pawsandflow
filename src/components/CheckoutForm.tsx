"use client";

import { useState } from "react";
import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

interface CheckoutFormProps {
  paymentIntentId: string;
  onError: (message: string | null) => void;
}

export default function CheckoutForm({
  paymentIntentId,
  onError,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const returnUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/book/success?payment_intent=${paymentIntentId}`;

  async function handleExpressConfirm() {
    if (!stripe || !elements) return;

    setLoading(true);
    onError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      onError(error.message || "Payment failed.");
    }
    setLoading(false);
  }

  async function handleCardSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    onError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      onError(error.message || "Payment failed.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <ExpressCheckoutElement
        options={{
          emailRequired: true,
          buttonType: { applePay: "book", googlePay: "pay" },
          paymentMethods: { applePay: "always", googlePay: "always" },
        }}
        onConfirm={handleExpressConfirm}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-warm-800/50">or pay with card</span>
        </div>
      </div>

      <form onSubmit={handleCardSubmit} className="space-y-4">
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card"],
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className="w-full py-3.5 rounded-2xl cta-gradient text-white font-bold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $55`
          )}
        </button>
      </form>
    </div>
  );
}
