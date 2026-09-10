import { describe, it, expect } from "vitest";
import { buildProductImageUrl, buildProfileImageUrl } from "./imageUrl.js";

describe("buildProductImageUrl", () => {
  it("returns secure HTTPS URL when provided direct HTTPS thumbnail URL", () => {
    const url =
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp";
    expect(buildProductImageUrl(url)).toBe(url);
    expect(buildProfileImageUrl(url)).toBe(url);
  });

  it("upgrades insecure HTTP URL to HTTPS", () => {
    const url =
      "http://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp";
    expect(buildProductImageUrl(url)).toBe(
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    );
  });

  it("builds URL for relative path or token", () => {
    expect(buildProductImageUrl("1")).toBe("https://dummyjson.com/products/1");
    expect(buildProductImageUrl("/images/1.webp")).toBe(
      "https://dummyjson.com/images/1.webp"
    );
  });

  it("trims whitespace from input", () => {
    expect(
      buildProductImageUrl(
        "  https://cdn.dummyjson.com/product-images/1/thumbnail.webp  "
      )
    ).toBe("https://cdn.dummyjson.com/product-images/1/thumbnail.webp");
  });

  it("returns empty string for empty token", () => {
    expect(buildProductImageUrl("")).toBe("");
    expect(buildProductImageUrl("   ")).toBe("");
  });

  it("returns empty string for invalid input", () => {
    expect(buildProductImageUrl(null as unknown as string)).toBe("");
    expect(buildProductImageUrl(undefined as unknown as string)).toBe("");
  });
});
