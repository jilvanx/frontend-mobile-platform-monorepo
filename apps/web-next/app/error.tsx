"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-red-50 p-6" role="alert">
        <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-700">
          {error.message || "An unexpected error occurred while loading profiles."}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
