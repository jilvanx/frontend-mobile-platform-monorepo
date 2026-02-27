import { describe, it, expect, vi } from "vitest";
import { fetchProfiles } from "./api.js";

describe("fetchProfiles", () => {
  it("parses response and returns profiles", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ url_token: "u1", name: "Alice" }]),
    });
    const profiles = await fetchProfiles("slug", { fetchImpl: mockFetch });
    expect(profiles).toEqual([{ urlToken: "u1", name: "Alice" }]);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://www.hunqz.com/api/opengrid/profiles/slug"
    );
  });

  it("throws on non-ok response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    await expect(fetchProfiles("x", { fetchImpl: mockFetch })).rejects.toThrow(
      "Profiles fetch failed: 404 Not Found"
    );
  });

  it("uses custom baseUrl", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    await fetchProfiles("me", { baseUrl: "/api/profiles", fetchImpl: mockFetch });
    expect(mockFetch).toHaveBeenCalledWith("/api/profiles/me");
  });
});
