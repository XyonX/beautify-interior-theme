import { Skeleton } from "@/components/ui/skeleton"

export function TrendingSkeleton() {
  return (
    <section className="py-10 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-40 h-6 mx-auto mb-2 bg-stone-200" />
          <Skeleton className="w-48 h-4 mx-auto bg-stone-200" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="group">
              <div className="border border-stone-200 rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <Skeleton className="w-full h-full bg-stone-200" />
                  {/* Trending badge skeleton */}
                  <div className="absolute top-2 left-2">
                    <Skeleton className="w-6 h-4 rounded-sm bg-stone-300" />
                  </div>
                </div>
                <div className="p-3">
                  <Skeleton className="w-16 h-3 mb-1 bg-stone-200" />
                  <Skeleton className="w-full h-4 mb-1 bg-stone-200" />
                  <Skeleton className="w-12 h-4 bg-stone-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
