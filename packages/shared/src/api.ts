import { parseProfilesResponse } from "./parser.js";
import type { Profile } from "./types.js";
import type { FetchProfilesOptions } from "./types.js";

const DEFAULT_BASE_URL = "https://www.hunqz.com/api/opengrid/profiles";

export async function fetchProfiles(
  slug: string,
  options: FetchProfilesOptions = {}
): Promise<Profile[]> {
  const { baseUrl = DEFAULT_BASE_URL, fetchImpl = fetch } = options;
  const url = `${baseUrl.replace(/\/$/, "")}/${encodeURIComponent(slug)}`;
  const res = await fetchImpl(url);
  if (!res.ok) {
    throw new Error(`Profiles fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return parseProfilesResponse(json);
}
