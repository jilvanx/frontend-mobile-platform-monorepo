import { ProductGrid } from "./components";
import { getProducts } from "./lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
        <p className="mt-1 text-slate-500">
          Server-rendered product gallery powered by Next.js.
        </p>
      </header>

      <ProductGrid products={products} />
    </main>
  );
}
