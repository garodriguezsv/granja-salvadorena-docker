"use server";

import { createPayment } from "@/services/paymentService";

export async function createPaymentAction(orderId: number) {
    try {
        const payment = await createPayment(orderId);

        return {
            success: true,
            clientSecret: payment.client_secret,
            payment: payment.payment,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "No se pudo iniciar el pago.",
        };
    }
}