export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    country: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    category_id: number;
    category: Category;
}

export interface ProductsResponse {
    products: Product[];
}