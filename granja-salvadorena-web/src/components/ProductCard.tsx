
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">
                    {product.category.name}
                </span>
            </div>

            <Link
                href={`/productos/${product.id}`}
                className="group block"
            >
                <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                    {product.name}
                </h2>

                <p className="mb-4 text-gray-600">
                    {product.description}
                </p>

                <span className="inline-block text-sm font-semibold text-blue-700 underline">
                    Ver detalle del producto
                </span>
            </Link>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                </span>

                <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                </span>
            </div>
        </article>
    );
}
