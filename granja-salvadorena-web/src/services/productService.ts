import type { Product, ProductsResponse } from "@/types/product";

const BASE_URL = process.env.BASE_URL;

export async function getProducts(): Promise<ProductsResponse> {

    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los productos");
    }

    return response.json();
}

export async function getProduct(id: number): Promise<Product> {

    if (!BASE_URL) {
        throw new Error("BASE_URL no está configurada");
    }

    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("No se pudo obtener el producto");
    }

    const data: { product: Product } = await response.json();

    return data.product;
}