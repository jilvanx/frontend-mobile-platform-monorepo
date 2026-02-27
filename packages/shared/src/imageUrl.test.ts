import { describe, it, expect } from "vitest";
import { buildProfileImageUrl } from "./imageUrl.js";

describe("buildProfileImageUrl", () => {
  it("builds URL for valid token", () => {
    expect(buildProfileImageUrl("abc123")).toBe(
      "https://www.hunqz.com/img/usr/original/0x0/abc123.jpg"
    );
  });

  it("trims whitespace from token", () => {
    expect(buildProfileImageUrl("  x  ")).toBe(
      "https://www.hunqz.com/img/usr/original/0x0/x.jpg"
    );
  });

  it("returns empty string for empty token", () => {
    expect(buildProfileImageUrl("")).toBe("");
    expect(buildProfileImageUrl("   ")).toBe("");
  });

  it("returns empty string for invalid input", () => {
    expect(buildProfileImageUrl(null as unknown as string)).toBe("");
    expect(buildProfileImageUrl(undefined as unknown as string)).toBe("");
  });
});
