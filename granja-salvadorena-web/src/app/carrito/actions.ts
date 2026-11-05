
"use server";

import { revalidatePath } from "next/cache";
import {
    createOrder,
    type CreateOrderData,
} from "@/services/orderService";

export interface OrderState {
    error?: string;
    success?: string;
    orderId?: number;
}

export async function createOrderAction(
    data: CreateOrderData
): Promise<OrderState> {
    let response;

    try {
        response = await createOrder(data);
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.message,
            };
        }

        return {
            error: "No se pudo crear la orden.",
        };
    }

    if (!response.order) {
        return {
            error: "La orden no fue creada correctamente.",
        };
    }

    revalidatePath("/ordenes");

    return {
        success: "Orden creada correctamente.",
        orderId: response.order.id,
    };
}
