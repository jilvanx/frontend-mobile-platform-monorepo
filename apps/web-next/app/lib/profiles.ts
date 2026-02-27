import { fetchProfiles } from "@repo/shared";
import type { Profile } from "@repo/shared";

const SLUG = "msescortplus";

export async function getProfiles(): Promise<Profile[]> {
  try {
    return await fetchProfiles(SLUG);
  } catch {
    return [];
  }
}
