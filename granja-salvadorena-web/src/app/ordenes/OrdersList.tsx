import Link from "next/link";
import { getOrders } from "@/services/orderService";

export default async function OrdersList() {
    const orders = await getOrders();

    if (orders.length === 0) {
        return (
            <section className="rounded-lg border p-6">
                <h2 className="text-xl font-semibold">
                    No tienes órdenes todavía
                </h2>

                <p className="mt-2 text-gray-600">
                    Cuando realices una compra, aparecerá aquí.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            {orders.map(
                (order: {
                    id: number;
                    total: string;
                    status: string;
                    created_at: string;
                    items: {
                        id: number;
                        quantity: number;
                        product: {
                            name: string;
                        };
                    }[];
                }) => (
                    <article
                        key={order.id}
                        className="rounded-lg border p-6 shadow-sm"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Orden #{order.id}
                                </h2>

                                <p className="text-sm text-gray-600">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString("es-SV")}
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    ${order.total}
                                </p>

                                <p className="text-sm capitalize">
                                    Estado: {order.status}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-medium">Productos</h3>

                            <ul className="mt-2 space-y-1">
                                {order.items.map((item) => (
                                    <li key={item.id} className="text-sm">
                                        {item.product.name} × {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href={`/ordenes/${order.id}`}
                            className="mt-4 inline-block font-semibold underline"
                        >
                            Ver detalle
                        </Link>
                    </article>
                )
            )}
        </section>
    );
}