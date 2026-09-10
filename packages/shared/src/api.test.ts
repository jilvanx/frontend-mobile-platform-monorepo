import { describe, it, expect, vi } from "vitest";
import { fetchProducts, fetchProfiles } from "./api.js";

describe("fetchProducts", () => {
  it("parses response and returns products with dummyjson base URL", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          products: [
            {
              id: 1,
              title: "Product 1",
              thumbnail: "https://cdn.dummyjson.com/p1.webp",
            },
          ],
        }),
    });
    const products = await fetchProducts("", { fetchImpl: mockFetch });
    expect(products).toEqual([
      {
        urlToken: "https://cdn.dummyjson.com/p1.webp",
        name: "Product 1",
        thumbnail: "https://cdn.dummyjson.com/p1.webp",
      },
    ]);
    expect(mockFetch).toHaveBeenCalledWith("https://dummyjson.com/products");
  });

  it("fetches single product when slug or id is provided", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Product 1",
          thumbnail: "https://cdn.dummyjson.com/p1.webp",
        }),
    });
    const products = await fetchProducts("1", { fetchImpl: mockFetch });
    expect(products).toEqual([
      {
        urlToken: "https://cdn.dummyjson.com/p1.webp",
        name: "Product 1",
        thumbnail: "https://cdn.dummyjson.com/p1.webp",
      },
    ]);
    expect(mockFetch).toHaveBeenCalledWith("https://dummyjson.com/products/1");
  });

  it("throws on non-ok response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    await expect(fetchProducts("x", { fetchImpl: mockFetch })).rejects.toThrow(
      "Products fetch failed: 404 Not Found"
    );
  });

  it("uses custom baseUrl", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    await fetchProducts("me", { baseUrl: "/api/products", fetchImpl: mockFetch });
    expect(mockFetch).toHaveBeenCalledWith("/api/products/me");
  });

  it("maintains fetchProfiles alias backwards compatibility", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: () => Promise.resolve({ products: [] }) });
    const res = await fetchProfiles("", { fetchImpl: mockFetch });
    expect(res).toEqual([]);
  });
});
