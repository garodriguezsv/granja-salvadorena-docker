"use client";

import { useState } from "react";
import { createPaymentAction } from "./actions";

interface PaymentTestProps {
    orderId: number;
}

export default function PaymentTest({
    orderId,
}: PaymentTestProps) {
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState(false);

    async function handlePayment() {
        setLoading(true);
        setResult("");

        const response = await createPaymentAction(orderId);

        if (response.success) {
            setResult(
                `PaymentIntent creado. Client Secret: ${response.clientSecret}`
            );
        } else {
            setResult(response.error ?? "Error al crear el pago.");
        }

        setLoading(false);
    }

    return (
        <div className="mt-6">
            <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white disabled:opacity-50"
            >
                {loading ? "Procesando..." : "Probar pago"}
            </button>

            {result && (
                <p className="mt-4 break-all text-sm text-gray-800">
                    {result}
                </p>
            )}
        </div>
    );
}