const IMAGE_BASE = "https://www.hunqz.com/img/usr/original/0x0";

export function buildProfileImageUrl(urlToken: string): string {
  if (!urlToken || typeof urlToken !== "string") {
    return "";
  }
  const token = urlToken.trim();
  if (!token) return "";
  return `${IMAGE_BASE}/${token}.jpg`;
}
