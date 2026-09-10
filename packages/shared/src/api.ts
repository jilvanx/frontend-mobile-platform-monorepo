import { DEFAULT_BASE_URL } from "./config.js";
import { parseProductsResponse } from "./parser.js";
import type { FetchProductsOptions, Product } from "./types.js";

export async function fetchProducts(
  slug?: string,
  options: FetchProductsOptions = {}
): Promise<Product[]> {
  const { baseUrl = DEFAULT_BASE_URL, fetchImpl = fetch } = options;
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const trimmedSlug = slug ? slug.trim() : "";
  const url = trimmedSlug
    ? `${cleanBaseUrl}/${encodeURIComponent(trimmedSlug)}`
    : cleanBaseUrl;
  const res = await fetchImpl(url);
  if (!res.ok) {
    throw new Error(`Products fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return parseProductsResponse(json);
}

export const fetchProfiles = fetchProducts;
