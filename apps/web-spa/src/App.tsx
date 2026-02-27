import { useEffect, useState, useCallback } from "react";
import { fetchProfiles } from "@repo/shared";
import type { Profile } from "@repo/shared";
import { ProfileCard, SkeletonGrid } from "./components";
import { API_BASE, SLUG } from "./config";

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfiles = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProfiles(SLUG, { baseUrl: API_BASE })
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

  useEffect(() => loadProfiles(), [loadProfiles]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profiles</h1>
          <p className="mt-1 text-slate-500">Client-side rendered profile gallery.</p>
        </header>

        {loading ? (
          <>
            <p className="sr-only" role="status" aria-live="polite">
              Loading profiles…
            </p>
            <SkeletonGrid />
          </>
        ) : null}

        {error ? (
          <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">Something went wrong</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              onClick={loadProfiles}
              className="mt-3 text-sm font-medium text-red-600 underline hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!loading && !error && profiles.length === 0 ? (
          <p className="text-slate-500" role="status">
            No profiles available at this time.
          </p>
        ) : null}

        {!loading && !error && profiles.length > 0 ? (
          <ul
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="User profiles"
          >
            {profiles.slice(0, 12).map((profile) => (
              <ProfileCard key={profile.urlToken} profile={profile} />
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
