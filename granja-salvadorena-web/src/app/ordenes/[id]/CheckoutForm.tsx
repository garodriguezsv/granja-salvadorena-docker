"use client";

import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { useState } from "react";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/pago/confirmacion`,
            },
        });

        if (error) {
            setMessage(
                error.message ?? "No fue posible procesar el pago."
            );
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <PaymentElement />

            {message && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || loading}
                className="mt-6 w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Procesando pago..." : "Pagar"}
            </button>
        </form>
    );
}