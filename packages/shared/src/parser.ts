import type { Product } from "./types.js";

interface RawProductOrProfile {
  id?: unknown;
  title?: unknown;
  name?: unknown;
  username?: unknown;
  thumbnail?: unknown;
  images?: unknown;
  url_token?: unknown;
  urlToken?: unknown;
}

function safeString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  return String(value).trim() || undefined;
}

function extractFirstThumbnailImage(raw: RawProductOrProfile): string | undefined {
  const thumbnail = safeString(raw.thumbnail);
  if (thumbnail) return thumbnail;

  if (Array.isArray(raw.images) && raw.images.length > 0) {
    const firstImage = safeString(raw.images[0]);
    if (firstImage) return firstImage;
  }

  const token = safeString(raw.url_token ?? raw.urlToken);
  if (token) return token;

  if (raw.id != null) {
    const idStr = safeString(raw.id);
    if (idStr) return idStr;
  }

  return undefined;
}

export function parseProduct(raw: unknown): Product | null {
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  const r = raw as RawProductOrProfile;
  const urlToken = extractFirstThumbnailImage(r);
  if (!urlToken) return null;

  return {
    urlToken,
    name: safeString(r.title ?? r.name ?? r.username),
    thumbnail: safeString(r.thumbnail),
  };
}

export const parseProfile = parseProduct;

interface SingleProductResponse {
  title?: unknown;
  name?: unknown;
  thumbnail?: unknown;
  preview_pic?: { url_token?: unknown };
  pictures?: Array<{ url_token?: unknown }>;
  images?: Array<unknown>;
}

function parseSingleProductResponse(data: SingleProductResponse): Product[] {
  const name = safeString(data.title ?? data.name);
  const out: Product[] = [];
  const seen = new Set<string>();

  const add = (token: string | undefined) => {
    const t = token?.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push({ urlToken: t, name, thumbnail: safeString(data.thumbnail) });
    }
  };

  const thumbnail = safeString(data.thumbnail);
  if (thumbnail) {
    add(thumbnail);
  }

  const preview = data.preview_pic;
  if (preview && typeof preview === "object" && "url_token" in preview) {
    add(safeString(preview.url_token));
  }

  if (Array.isArray(data.pictures)) {
    for (const pic of data.pictures) {
      if (pic && typeof pic === "object" && "url_token" in pic) {
        add(safeString(pic.url_token));
      }
    }
  }

  if (Array.isArray(data.images)) {
    for (const img of data.images) {
      add(safeString(img));
    }
  }

  return out;
}

export function parseProductsResponse(data: unknown): Product[] {
  if (data == null) return [];
  if (Array.isArray(data)) {
    return data.map(parseProduct).filter((p): p is Product => p !== null);
  }
  if (typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;

  if ("products" in obj && Array.isArray(obj.products)) {
    return obj.products.map(parseProduct).filter((p): p is Product => p !== null);
  }
  if ("profiles" in obj && Array.isArray(obj.profiles)) {
    return obj.profiles.map(parseProduct).filter((p): p is Product => p !== null);
  }
  if ("pictures" in obj || "preview_pic" in obj) {
    return parseSingleProductResponse(obj as SingleProductResponse);
  }
  const single = parseProduct(data);
  return single ? [single] : [];
}

export const parseProfilesResponse = parseProductsResponse;
