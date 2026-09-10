import { describe, it, expect } from "vitest";
import {
  API_HOST,
  API_BASE_URL,
  DEFAULT_BASE_URL,
  ALLOWED_IMAGE_HOSTS,
  isSecureUrl,
} from "./config.js";

describe("Centralized Security Config", () => {
  it("enforces HTTPS on base API URLs", () => {
    expect(API_HOST).toBe("dummyjson.com");
    expect(API_BASE_URL).toBe("https://dummyjson.com/products");
    expect(DEFAULT_BASE_URL).toBe("https://dummyjson.com/products");
    expect(API_BASE_URL.startsWith("https://")).toBe(true);
  });

  it("lists allowed image hosts", () => {
    expect(ALLOWED_IMAGE_HOSTS).toContain("dummyjson.com");
    expect(ALLOWED_IMAGE_HOSTS).toContain("cdn.dummyjson.com");
  });

  it("validates secure HTTPS URLs", () => {
    expect(isSecureUrl("https://dummyjson.com/products")).toBe(true);
    expect(isSecureUrl("https://cdn.dummyjson.com/product-images/1.jpg")).toBe(true);
    expect(isSecureUrl("http://dummyjson.com/products")).toBe(false);
    expect(isSecureUrl("javascript:alert(1)")).toBe(false);
    expect(isSecureUrl("")).toBe(false);
  });
});
