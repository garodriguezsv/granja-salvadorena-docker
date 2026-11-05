"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/CartProvider";
import CartItem from "@/components/CartItem";
import { createOrderAction } from "./actions";

export default function CartPage() {
    const {
        cart,
        clearCart,
    } = useCart();
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const total = cart.items.reduce(
        (sum, item) =>
            sum +
            Number(item.product.price) * item.quantity,
        0
    );

    async function handleCreateOrder() {
        setError(null);
        setPending(true);

        const data = {
            items: cart.items.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
            })),
        };

        const result = await createOrderAction(data);

        if (result.error) {
            setError(result.error);
            setPending(false);
            return;
        }

        if (result.orderId) {
            clearCart();
            router.push(`/ordenes/${result.orderId}`);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    ← Volver al catálogo
                </Link>

                <div className="mt-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Mi carrito
                    </h1>

                    {cart.items.length > 0 && (
                        <button
                            type="button"
                            onClick={clearCart}
                            className="text-sm font-medium text-red-700 hover:text-red-900"
                        >
                            Vaciar carrito
                        </button>
                    )}
                </div>

                {cart.items.length === 0 ? (
                    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-700">
                            Tu carrito está vacío.
                        </p>

                        <Link
                            href="/"
                            className="mt-4 inline-block rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
                        >
                            Ver productos
                        </Link>
                    </div>
                ) : (
                    <>
                        <section className="mt-8 rounded-lg border border-gray-200 bg-white px-6">
                            {cart.items.map((item) => (
                                <CartItem
                                    key={item.product.id}
                                    item={item}
                                />
                            ))}
                        </section>

                        <section className="mt-6 flex justify-end">
                            <div className="w-full rounded-lg border border-gray-200 bg-white p-6 sm:max-w-md">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-gray-900">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                {error && (
                                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={handleCreateOrder}
                                    disabled={pending}
                                    className="mt-6 w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {pending
                                        ? "Creando orden..."
                                        : "Continuar con la compra"}
                                </button>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}