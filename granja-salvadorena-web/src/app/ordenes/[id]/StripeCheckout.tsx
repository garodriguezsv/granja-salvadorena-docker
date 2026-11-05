"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { createPaymentAction } from "./actions";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeCheckoutProps {
    orderId: number;
}

export default function StripeCheckout({
    orderId,
}: StripeCheckoutProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleStartPayment() {
        setLoading(true);
        setError(null);

        const result = await createPaymentAction(orderId);

        if (!result.success || !result.clientSecret) {
            setError(
                result.error ?? "No se pudo iniciar el pago."
            );
            setLoading(false);
            return;
        }

        setClientSecret(result.clientSecret);
        setLoading(false);
    }

    if (!clientSecret) {
        return (
            <div className="mt-6">
                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleStartPayment}
                    disabled={loading}
                    className="w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Preparando pago..."
                        : "Iniciar pago"}
                </button>
            </div>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
            }}
        >
            <CheckoutForm />
        </Elements>
    );
}