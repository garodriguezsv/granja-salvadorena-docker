import Link from "next/link";
import { getProduct } from "@/services/productService";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {

    const { id } = await params;

    const product = await getProduct(Number(id));

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">

                <Link
                    href="/"
                    className="mb-8 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    ← Volver al catálogo
                </Link>

                <article className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">

                    <span className="text-sm font-medium text-gray-500">
                        {product.category.name}
                    </span>

                    <h1 className="mt-2 text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {product.description}
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-3">

                        <div>
                            <p className="text-sm text-gray-500">
                                Precio
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                ${product.price}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Stock
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                {product.stock}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                País
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                                {product.country}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8">
                        <AddToCartButton product={product} />
                    </div>

                    <div className="mt-4">
                        <Link
                            href="/carrito"
                            className="font-medium text-gray-900 underline hover:text-gray-700"
                        >
                            Ver carrito
                        </Link>
                    </div>

                </article>

            </div>
        </main>
    );
}