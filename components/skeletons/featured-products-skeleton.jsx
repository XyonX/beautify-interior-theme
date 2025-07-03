import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton } from "./product-grid-skeleton"

export function FeaturedProductsSkeleton() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-48 h-6 mx-auto mb-2 bg-stone-200" />
          <Skeleton className="w-64 h-4 mx-auto bg-stone-200" />
        </div>

        <ProductGridSkeleton count={8} />

        <div className="text-center mt-8">
          <Skeleton className="w-32 h-8 mx-auto rounded-sm bg-stone-200" />
        </div>
      </div>
    </section>
  )
}
