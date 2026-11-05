
"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({
    product,
}: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        addToCart(product);
        setAdded(true);
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.active || product.stock <= 0}
                className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                {product.stock <= 0
                    ? "Sin stock"
                    : added
                        ? "Agregado ✓"
                        : "Agregar al carrito"}
            </button>

            {added && (
                <p
                    role="status"
                    className="mt-3 font-medium text-green-700"
                >
                    {product.name} se agregó al carrito.
                </p>
            )}
        </div>
    );
}
