import { Skeleton } from "@/components/ui/skeleton";

// interface ProductGridSkeletonProps {
//   count?: number
//   columns?: string
// }

export function ProductGridSkeleton({
  count = 8,
  columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
}) {
  return (
    <div className={`grid ${columns} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          <div className="border border-stone-100 rounded-sm overflow-hidden bg-white">
            <div className="relative aspect-square overflow-hidden">
              <Skeleton className="w-full h-full" />
              {/* Badge skeletons */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {Math.random() > 0.5 && (
                  <Skeleton className="w-8 h-4 rounded-sm" />
                )}
              </div>
              {/* Heart button skeleton */}
              <div className="absolute top-2 right-2">
                <Skeleton className="w-6 h-6 rounded-sm" />
              </div>
            </div>
            <div className="p-3">
              <Skeleton className="w-16 h-3 mb-1" />
              <Skeleton className="w-full h-4 mb-1" />
              <div className="flex items-center mb-2">
                <Skeleton className="w-12 h-3" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Skeleton className="w-12 h-4" />
                  {Math.random() > 0.5 && <Skeleton className="w-10 h-3" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
