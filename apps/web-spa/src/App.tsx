import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "@repo/shared";
import type { Product } from "@repo/shared";
import { ProductCard, SkeletonGrid } from "./components";
import { API_BASE, SLUG } from "./config";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts(SLUG, { baseUrl: API_BASE })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => loadProducts(), [loadProducts]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="mt-1 text-slate-500">Client-side rendered product gallery.</p>
        </header>

        {loading ? (
          <>
            <p className="sr-only" role="status" aria-live="polite">
              Loading products…
            </p>
            <SkeletonGrid />
          </>
        ) : null}

        {error ? (
          <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-3 text-sm font-medium text-red-600 underline hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!loading && !error && products.length === 0 ? (
          <p className="text-slate-500" role="status">
            No products available at this time.
          </p>
        ) : null}

        {!loading && !error && products.length > 0 ? (
          <ul
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="Products"
          >
            {products.slice(0, 12).map((product) => (
              <ProductCard key={product.urlToken} product={product} />
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
