import { describe, it, expect } from "vitest";
import {
  parseProduct,
  parseProfile,
  parseProductsResponse,
  parseProfilesResponse,
} from "./parser.js";

describe("parseProduct", () => {
  it("parses valid DummyJSON product using first thumbnail image", () => {
    const product = {
      id: 1,
      title: "Essence Mascara Lash Princess",
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      images: [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      ],
    };
    const out = parseProduct(product);
    expect(out).toEqual({
      urlToken:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      name: "Essence Mascara Lash Princess",
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    });
    expect(parseProfile(product)).toEqual(out);
  });

  it("uses first image in images array if thumbnail missing", () => {
    const product = {
      id: 2,
      title: "Sample Product",
      images: ["https://cdn.dummyjson.com/product-images/sample/1.webp"],
    };
    const out = parseProduct(product);
    expect(out).toEqual({
      urlToken: "https://cdn.dummyjson.com/product-images/sample/1.webp",
      name: "Sample Product",
      thumbnail: undefined,
    });
  });

  it("parses valid profile with url_token", () => {
    const out = parseProduct({ url_token: "user1", name: "Alice" });
    expect(out).toEqual({ urlToken: "user1", name: "Alice", thumbnail: undefined });
  });

  it("parses valid profile with urlToken (camelCase)", () => {
    const out = parseProduct({ urlToken: "user2", username: "Bob" });
    expect(out).toEqual({ urlToken: "user2", name: "Bob", thumbnail: undefined });
  });

  it("returns null when all identifier tokens and thumbnails are missing", () => {
    expect(parseProduct({})).toBeNull();
  });

  it("returns null for invalid input", () => {
    expect(parseProduct(null)).toBeNull();
    expect(parseProduct(undefined)).toBeNull();
    expect(parseProduct([])).toBeNull();
    expect(parseProduct("string")).toBeNull();
  });

  it("handles empty url_token", () => {
    expect(parseProduct({ url_token: "" })).toBeNull();
    expect(parseProduct({ url_token: "   " })).toBeNull();
  });
});

describe("parseProductsResponse", () => {
  it("parses DummyJSON products response", () => {
    const data = {
      products: [
        {
          id: 1,
          title: "Product 1",
          thumbnail: "https://cdn.dummyjson.com/p1/thumb.webp",
        },
        {
          id: 2,
          title: "Product 2",
          thumbnail: "https://cdn.dummyjson.com/p2/thumb.webp",
        },
      ],
      total: 2,
    };
    const expected = [
      {
        urlToken: "https://cdn.dummyjson.com/p1/thumb.webp",
        name: "Product 1",
        thumbnail: "https://cdn.dummyjson.com/p1/thumb.webp",
      },
      {
        urlToken: "https://cdn.dummyjson.com/p2/thumb.webp",
        name: "Product 2",
        thumbnail: "https://cdn.dummyjson.com/p2/thumb.webp",
      },
    ];
    expect(parseProductsResponse(data)).toEqual(expected);
    expect(parseProfilesResponse(data)).toEqual(expected);
  });

  it("parses array of profiles", () => {
    const data = [{ url_token: "a", name: "A" }, { url_token: "b" }];
    expect(parseProductsResponse(data)).toEqual([
      { urlToken: "a", name: "A", thumbnail: undefined },
      { urlToken: "b", name: undefined, thumbnail: undefined },
    ]);
  });

  it("parses object with profiles key", () => {
    const data = { profiles: [{ url_token: "x" }] };
    expect(parseProductsResponse(data)).toEqual([
      { urlToken: "x", name: undefined, thumbnail: undefined },
    ]);
  });

  it("skips invalid entries in array", () => {
    const data = [{ url_token: "ok" }, {}, { url_token: "b" }];
    expect(parseProductsResponse(data)).toEqual([
      { urlToken: "ok", name: undefined, thumbnail: undefined },
      { urlToken: "b", name: undefined, thumbnail: undefined },
    ]);
  });

  it("returns empty array for null/undefined", () => {
    expect(parseProductsResponse(null)).toEqual([]);
    expect(parseProductsResponse(undefined)).toEqual([]);
  });

  it("parses single profile with pictures", () => {
    const data = {
      name: "item",
      preview_pic: { url_token: "preview-token" },
      pictures: [
        { url_token: "preview-token" },
        { url_token: "pic1" },
        { url_token: "pic2" },
      ],
    };
    expect(parseProductsResponse(data)).toEqual([
      { urlToken: "preview-token", name: "item", thumbnail: undefined },
      { urlToken: "pic1", name: "item", thumbnail: undefined },
      { urlToken: "pic2", name: "item", thumbnail: undefined },
    ]);
  });
});
