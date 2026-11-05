import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getCurrentUser } from "@/services/authService";
import OrdersList from "./OrdersList";

export const dynamic = "force-dynamic";

function OrdersListFallback() {
    return (
        <section className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="h-48 rounded-lg bg-gray-200"
                />
            ))}
        </section>
    );
}

export default async function OrdersPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Mis órdenes
                </h1>

                <p className="mt-2 text-gray-600">
                    Historial de tus compras.
                </p>
            </div>

            <Suspense fallback={<OrdersListFallback />}>
                <OrdersList />
            </Suspense>

            <Link
                href="/"
                className="mt-8 inline-block font-semibold underline"
            >
                Volver al catálogo
            </Link>
        </main>
    );
}