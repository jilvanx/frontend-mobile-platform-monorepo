import { describe, it, expect } from "vitest";
import { parseProfile, parseProfilesResponse } from "./parser.js";

describe("parseProfile", () => {
  it("parses valid profile with url_token", () => {
    const out = parseProfile({ url_token: "user1", name: "Alice" });
    expect(out).toEqual({ urlToken: "user1", name: "Alice" });
  });

  it("parses valid profile with urlToken (camelCase)", () => {
    const out = parseProfile({ urlToken: "user2", username: "Bob" });
    expect(out).toEqual({ urlToken: "user2", name: "Bob" });
  });

  it("returns null when url_token missing", () => {
    expect(parseProfile({ name: "NoToken" })).toBeNull();
    expect(parseProfile({})).toBeNull();
  });

  it("returns null for invalid input", () => {
    expect(parseProfile(null)).toBeNull();
    expect(parseProfile(undefined)).toBeNull();
    expect(parseProfile([])).toBeNull();
    expect(parseProfile("string")).toBeNull();
  });

  it("handles empty url_token", () => {
    expect(parseProfile({ url_token: "" })).toBeNull();
    expect(parseProfile({ url_token: "   " })).toBeNull();
  });
});

describe("parseProfilesResponse", () => {
  it("parses array of profiles", () => {
    const data = [{ url_token: "a", name: "A" }, { url_token: "b" }];
    expect(parseProfilesResponse(data)).toEqual([
      { urlToken: "a", name: "A" },
      { urlToken: "b", name: undefined },
    ]);
  });

  it("parses object with profiles key", () => {
    const data = { profiles: [{ url_token: "x" }] };
    expect(parseProfilesResponse(data)).toEqual([{ urlToken: "x", name: undefined }]);
  });

  it("skips invalid entries in array", () => {
    const data = [{ url_token: "ok" }, {}, { url_token: "b" }];
    expect(parseProfilesResponse(data)).toEqual([
      { urlToken: "ok", name: undefined },
      { urlToken: "b", name: undefined },
    ]);
  });

  it("returns empty array for null/undefined", () => {
    expect(parseProfilesResponse(null)).toEqual([]);
    expect(parseProfilesResponse(undefined)).toEqual([]);
  });

  it("parses single profile with pictures (hunqz API shape)", () => {
    const data = {
      name: "msescortplus",
      preview_pic: { url_token: "preview-token" },
      pictures: [
        { url_token: "preview-token" },
        { url_token: "pic1" },
        { url_token: "pic2" },
      ],
    };
    expect(parseProfilesResponse(data)).toEqual([
      { urlToken: "preview-token", name: "msescortplus" },
      { urlToken: "pic1", name: "msescortplus" },
      { urlToken: "pic2", name: "msescortplus" },
    ]);
  });
});
