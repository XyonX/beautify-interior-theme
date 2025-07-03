import { Skeleton } from "@/components/ui/skeleton"

export function DealsSkeleton() {
  return (
    <section className="py-10 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-40 h-6 mx-auto mb-2 bg-stone-200" />
          <Skeleton className="w-56 h-4 mx-auto bg-stone-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="group">
              <div className="border border-stone-200 rounded-sm overflow-hidden bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center">
                  <Skeleton className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-200" />
                  <Skeleton className="w-32 h-5 mx-auto mb-2 bg-stone-200" />
                  <Skeleton className="w-24 h-4 mx-auto mb-4 bg-stone-200" />
                  <Skeleton className="w-28 h-8 mx-auto rounded-sm bg-stone-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
