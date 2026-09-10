/**
 * Centralized security configuration for API endpoints and remote assets.
 * Enforces HTTPS to prevent unencrypted transmissions, downgrade attacks, and tampering.
 */
export const API_HOST = "dummyjson.com";
export const API_BASE_URL = `https://${API_HOST}/products`;
export const DEFAULT_BASE_URL = API_BASE_URL;

export const ALLOWED_IMAGE_HOSTS = Object.freeze([
  "dummyjson.com",
  "cdn.dummyjson.com",
] as const);

export const API_ENDPOINTS = Object.freeze({
  host: API_HOST,
  baseUrl: API_BASE_URL,
  allowedImageHosts: ALLOWED_IMAGE_HOSTS,
} as const);

/**
 * Validates whether a URL is secure (HTTPS protocol and safe structure).
 */
export function isSecureUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}
