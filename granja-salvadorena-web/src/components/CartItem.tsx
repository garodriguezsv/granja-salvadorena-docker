"use client";

import { useCart } from "@/components/CartProvider";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const {
        updateQuantity,
        removeFromCart,
    } = useCart();

    const subtotal =
        Number(item.product.price) * item.quantity;

    return (
        <article className="border-b border-gray-200 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {item.product.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        ${item.product.price} por unidad
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            updateQuantity(
                                item.product.id,
                                item.quantity - 1
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-gray-900 hover:bg-gray-100"
                    >
                        −
                    </button>

                    <span className="min-w-8 text-center font-medium text-gray-900">
                        {item.quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            updateQuantity(
                                item.product.id,
                                item.quantity + 1
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-gray-900 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>

                <div className="text-right">
                    <p className="font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            removeFromCart(item.product.id)
                        }
                        className="mt-2 text-sm font-medium text-red-700 hover:text-red-900"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    );
}