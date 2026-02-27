export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 w-40 bg-slate-200 rounded animate-pulse" />
        <div className="mt-2 h-5 w-72 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden bg-white shadow animate-pulse"
          >
            <div className="w-full aspect-square bg-slate-200" />
            <div className="p-2">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
