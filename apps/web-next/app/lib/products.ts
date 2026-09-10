import { fetchProducts } from "@repo/shared";
import type { Product } from "@repo/shared";

export const SLUG = "";

export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchProducts(SLUG);
  } catch {
    return [];
  }
}

export const getProfiles = getProducts;
