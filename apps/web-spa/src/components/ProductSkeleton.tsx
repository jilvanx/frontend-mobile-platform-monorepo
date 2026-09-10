export function ProductSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow animate-pulse">
      <div className="w-full aspect-square bg-slate-200" />
      <div className="p-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export const ProfileSkeleton = ProductSkeleton;
