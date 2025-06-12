import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton } from "./product-grid-skeleton"

export function FeaturedProductsSkeleton() {
  return (
    <section className="py-10 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Skeleton className="w-48 h-6 mx-auto mb-2" />
          <Skeleton className="w-64 h-4 mx-auto" />
        </div>

        <ProductGridSkeleton count={8} />

        <div className="text-center mt-8">
          <Skeleton className="w-32 h-8 mx-auto rounded-sm" />
        </div>
      </div>
    </section>
  )
}
