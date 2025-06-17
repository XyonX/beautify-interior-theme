import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="border-b border-stone-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 flex items-center space-x-2">
          <Skeleton className="h-3 w-12" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-3 w-16" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-3 w-14" />
          <span className="text-stone-300">/</span>
          <Skeleton className="h-3 w-24" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Product Images Skeleton */}
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square w-full" />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-12 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-1" />
              <Skeleton className="h-3 w-20 mb-3" />

              <div className="flex items-center mb-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-24 ml-2" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Variant Selection Skeleton */}
              <div>
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Quantity Skeleton */}
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-20 mt-1" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Features Skeleton */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-stone-100">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs Skeleton */}
        <div className="mb-10">
          <div className="grid grid-cols-3 gap-0 h-8 mb-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-full" />
            ))}
          </div>
          <div className="border border-stone-100 p-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-1/4 mt-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Skeleton className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" />
                    <Skeleton className="h-3 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div>
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="border border-stone-100">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <div className="border-t border-stone-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, linkIndex) => (
                    <Skeleton key={linkIndex} className="h-3 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
