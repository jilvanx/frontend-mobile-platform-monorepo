import { useEffect, useState, useCallback } from "react";
import { fetchProfiles } from "@repo/shared";
import type { Profile } from "@repo/shared";
import { SLUG } from "../config";

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProfiles(SLUG)
      .then((data) => {
        if (!cancelled) setProfiles(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load profiles");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => load(), [load]);

  return { profiles, loading, error, refetch: load };
}
