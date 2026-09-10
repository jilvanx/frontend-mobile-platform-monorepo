import type { Product } from "@repo/shared";
import { ProductCard } from "./ProductCard";

const DISPLAY_LIMIT = 12;

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-slate-500" role="status">
        No products available at this time.
      </p>
    );
  }

  const list = products.slice(0, DISPLAY_LIMIT);

  return (
    <ul
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      role="list"
      aria-label="Products"
    >
      {list.map((product) => (
        <ProductCard key={product.urlToken} product={product} />
      ))}
    </ul>
  );
}

export const ProfileGrid = ProductGrid;
