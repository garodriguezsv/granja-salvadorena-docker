import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

export interface CreateOrderItem {
    product_id: number;
    quantity: number;
}

export interface CreateOrderData {
    items: CreateOrderItem[];
}

export async function createOrder(data: CreateOrderData) {
    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message ?? "No se pudo crear la orden"
        );
    }

    return responseData;
}

export async function getOrder(id: number) {
    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message ?? "No se pudo obtener la orden"
        );
    }

    return responseData.order;
}

export async function getOrders() {
    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        throw new Error("No autenticado");
    }

    const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message ?? "No se pudieron obtener las órdenes"
        );
    }

    return responseData.orders;
}