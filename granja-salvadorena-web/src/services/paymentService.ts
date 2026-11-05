import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export interface PaymentResponse {
    message: string;
    payment: {
        id: number;
        order_id: number;
        stripe_payment_id: string;
        amount: string;
        currency: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
    client_secret: string;
}

export async function createPayment(
    orderId: number
): Promise<PaymentResponse> {
    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(
        `${BASE_URL}/orders/${orderId}/payment`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message ?? "No se pudo iniciar el pago"
        );
    }

    return responseData;
}