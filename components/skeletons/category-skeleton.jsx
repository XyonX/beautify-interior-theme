import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeleton() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-48 h-6 mx-auto mb-2 bg-stone-200" />
          <Skeleton className="w-64 h-4 mx-auto bg-stone-200" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="group">
              <div className="border border-stone-200 rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <Skeleton className="w-full h-full bg-stone-200" />
                </div>
                <div className="p-3">
                  <Skeleton className="w-full h-4 mb-1 bg-stone-200" />
                  <Skeleton className="w-16 h-3 bg-stone-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
