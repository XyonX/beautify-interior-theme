import { Skeleton } from "@/components/ui/skeleton"

export function DealsSkeleton() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-40 h-6 mx-auto mb-2" />
          <Skeleton className="w-56 h-4 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="group">
              <div className="border border-stone-100 rounded-sm overflow-hidden bg-white p-6">
                <div className="text-center">
                  <Skeleton className="w-12 h-12 mx-auto mb-4 rounded-full" />
                  <Skeleton className="w-32 h-5 mx-auto mb-2" />
                  <Skeleton className="w-24 h-4 mx-auto mb-4" />
                  <Skeleton className="w-28 h-8 mx-auto rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
