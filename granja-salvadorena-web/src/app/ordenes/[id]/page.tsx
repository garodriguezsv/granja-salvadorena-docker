import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/authService";
import { getOrder } from "@/services/orderService";

import StripeCheckout from "./StripeCheckout";

interface OrderPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderPage({
    params,
}: OrderPageProps) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const { id } = await params;
    const orderId = Number(id);

    if (Number.isNaN(orderId)) {
        throw new Error("ID de orden inválido");
    }

    const order = await getOrder(orderId);

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Orden #{order.id}
                </h1>

                <p className="mt-2 text-gray-700">
                    Tu orden fue creada correctamente.
                </p>

                <section className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Información de la orden
                    </h2>

                    <div className="mt-4 space-y-2 text-gray-800">
                        <p>
                            <strong>Cliente:</strong> {order.user.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {order.user.email}
                        </p>

                        <p>
                            <strong>Estado:</strong> {order.status}
                        </p>

                        <p>
                            <strong>Total:</strong> $
                            {Number(order.total).toFixed(2)}
                        </p>
                    </div>
                </section>

                <section className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Productos
                    </h2>

                    <div className="mt-4 space-y-4">
                        {order.items.map(
                            (item: {
                                id: number;
                                quantity: number;
                                price: string;
                                subtotal: string;
                                product: {
                                    id: number;
                                    name: string;
                                };
                            }) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b border-gray-200 pb-4"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {item.product.name}
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            Cantidad: {item.quantity}
                                        </p>

                                        <p className="text-sm text-gray-700">
                                            Precio: $
                                            {Number(item.price).toFixed(2)}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-gray-900">
                                        $
                                        {Number(
                                            item.subtotal
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <StripeCheckout orderId={order.id} />

                <div className="mt-8">
                    <Link
                        href="/"
                        className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700"
                    >
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        </main>
    );
}