import { API_BASE_URL, isSecureUrl } from "./config.js";

/**
 * Builds and secures product image URLs, enforcing HTTPS.
 * If the input is already a thumbnail URL, ensures HTTPS protocol.
 */
export function buildProductImageUrl(urlToken: string): string {
  if (!urlToken || typeof urlToken !== "string") {
    return "";
  }
  const token = urlToken.trim();
  if (!token) return "";

  // If already an HTTP/HTTPS URL, enforce HTTPS
  if (/^https?:\/\//i.test(token)) {
    const secureUrl = token.replace(/^http:\/\//i, "https://");
    return isSecureUrl(secureUrl) ? secureUrl : "";
  }

  // If absolute path, prefix with HTTPS host
  if (token.startsWith("/")) {
    return `https://dummyjson.com${token}`;
  }

  // Default fallback URL
  return `${API_BASE_URL}/${token}`;
}

export const buildProfileImageUrl = buildProductImageUrl;
