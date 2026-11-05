"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Cart, CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartContextType {
    cart: Cart;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

const CART_STORAGE_KEY = "granja-salvadorena-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({
        items: [],
    });

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (storedCart) {
            try {
                const parsedCart: Cart = JSON.parse(storedCart);

                setCart(parsedCart);
            } catch {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }

        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );
    }, [cart, isInitialized]);

    function addToCart(product: Product) {
        setCart((currentCart) => {
            const existingItem = currentCart.items.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return {
                    items: currentCart.items.map((item) =>
                        item.product.id === product.id
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                    ),
                };
            }

            const newItem: CartItem = {
                product,
                quantity: 1,
            };

            return {
                items: [...currentCart.items, newItem],
            };
        });
    }

    function removeFromCart(productId: number) {
        setCart((currentCart) => ({
            items: currentCart.items.filter(
                (item) => item.product.id !== productId
            ),
        }));
    }

    function updateQuantity(
        productId: number,
        quantity: number
    ) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart((currentCart) => ({
            items: currentCart.items.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            ),
        }));
    }

    function clearCart() {
        setCart({
            items: [],
        });
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider"
        );
    }

    return context;
}