import type { Profile } from "./types.js";

interface RawProfile {
  url_token?: unknown;
  urlToken?: unknown;
  name?: unknown;
  username?: unknown;
}

function safeString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  return String(value).trim() || undefined;
}

function extractUrlToken(raw: RawProfile): string | undefined {
  const token = safeString(raw.url_token ?? raw.urlToken);
  return token && token.length > 0 ? token : undefined;
}

export function parseProfile(raw: unknown): Profile | null {
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  const r = raw as RawProfile;
  const urlToken = extractUrlToken(r);
  if (!urlToken) return null;
  return {
    urlToken,
    name: safeString(r.name ?? r.username),
  };
}

interface SingleProfileResponse {
  name?: unknown;
  preview_pic?: { url_token?: unknown };
  pictures?: Array<{ url_token?: unknown }>;
}

function parseSingleProfileResponse(data: SingleProfileResponse): Profile[] {
  const name = safeString(data.name);
  const out: Profile[] = [];
  const seen = new Set<string>(); // preview_pic can duplicate first picture

  const add = (token: string | undefined) => {
    const t = token?.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push({ urlToken: t, name });
    }
  };

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
  return out;
}

export function parseProfilesResponse(data: unknown): Profile[] {
  if (data == null) return [];
  if (Array.isArray(data)) {
    return data.map(parseProfile).filter((p): p is Profile => p !== null);
  }
  if (typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;
  if ("profiles" in obj) {
    const profiles = obj.profiles;
    return Array.isArray(profiles)
      ? profiles.map(parseProfile).filter((p): p is Profile => p !== null)
      : [];
  }
  if ("pictures" in obj || "preview_pic" in obj) {
    return parseSingleProfileResponse(obj as SingleProfileResponse);
  }
  const single = parseProfile(data);
  return single ? [single] : [];
}
