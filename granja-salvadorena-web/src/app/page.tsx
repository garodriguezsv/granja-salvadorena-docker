import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";

export const dynamic = "force-dynamic";


export default async function Home() {
  const data = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Granja Salvadoreña
          </h1>

          <p className="mt-2 text-gray-600">
            Productos tradicionales salvadoreños
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Nuestros productos
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}