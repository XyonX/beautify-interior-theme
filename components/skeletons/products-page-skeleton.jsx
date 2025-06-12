import { Skeleton } from "@/components/ui/skeleton"
import { ProductGridSkeleton } from "./product-grid-skeleton"

export function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Breadcrumb skeleton */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-12 h-3" />
          <span className="text-stone-400">/</span>
          <Skeleton className="w-20 h-3" />
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

            {/* Price Range */}
            <div className="mb-5">
              <Skeleton className="w-20 h-3 mb-2" />
              <Skeleton className="w-full h-2 mb-2" />
              <div className="flex justify-between">
                <Skeleton className="w-8 h-3" />
                <Skeleton className="w-8 h-3" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <Skeleton className="w-18 h-3 mb-2" />
              <div className="space-y-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-5">
              <Skeleton className="w-12 h-3 mb-2" />
              <div className="space-y-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-14 h-3" />
                  </div>
                ))}
              </div>
            </div>

            <Skeleton className="w-full h-8 rounded-sm" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="lg:col-span-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <Skeleton className="w-32 h-5 mb-1" />
              <Skeleton className="w-24 h-3" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="w-40 h-8" />
              <div className="flex border border-stone-200 rounded-sm">
                <Skeleton className="w-8 h-8" />
                <Skeleton className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Products */}
          <ProductGridSkeleton
            count={10}
            columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          />

          {/* Pagination */}
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
    </div>
  )
}
