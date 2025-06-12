import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton"

export default function Loading() {
  return (

      <main className="flex-grow container mx-auto px-4 py-4">
        {/* Breadcrumb skeleton */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-12 h-3" />
            <span className="text-stone-400">/</span>
            <Skeleton className="w-10 h-3" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm p-4 shadow-sm border border-stone-100 sticky top-24">
              <div className="flex items-center mb-4">
                <Skeleton className="w-4 h-4 mr-2" />
                <Skeleton className="w-16 h-4" />
              </div>

              {/* Sale Banner skeleton */}
              <div className="mb-5 p-3 bg-accent1-50 rounded-sm border border-accent1-200">
                <Skeleton className="w-20 h-4 mb-2" />
                <Skeleton className="w-full h-3 mb-1" />
                <Skeleton className="w-3/4 h-3" />
              </div>

              {/* Price Range skeleton */}
              <div className="mb-5">
                <Skeleton className="w-20 h-3 mb-2" />
                <Skeleton className="w-full h-2 mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="w-12 h-3" />
                  <Skeleton className="w-12 h-3" />
                </div>
              </div>

              {/* Discount Range skeleton */}
              <div className="mb-5">
                <Skeleton className="w-24 h-3 mb-2" />
                <div className="space-y-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="w-3 h-3" />
                      <Skeleton className="w-16 h-3" />
                    </div>
                  ))}
                </div>
              </div>

              <Skeleton className="w-full h-8 rounded-sm" />
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="lg:col-span-4">
            {/* Header skeleton */}
            <div className="mb-6">
              <Skeleton className="w-24 h-6 mb-2" />
              <Skeleton className="w-48 h-4 mb-4" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <Skeleton className="w-32 h-4" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-40 h-8" />
                  <div className="flex border border-stone-200 rounded-sm">
                    <Skeleton className="w-8 h-8" />
                    <Skeleton className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products skeleton */}
            <ProductGridSkeleton
              count={12}
              columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            />

            {/* Pagination skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-1">
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      </main>

  )
}
