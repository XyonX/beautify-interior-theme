import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";

export default function Loading() {
  return (
    <main className="flex-grow container mx-auto px-4 py-4">
      {/* Breadcrumb skeleton */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-xs">
          <Skeleton className="w-12 h-3" />
          <span className="text-stone-400">/</span>
          <Skeleton className="w-16 h-3" />
          <span className="text-stone-400">/</span>
          <Skeleton className="w-20 h-3" />
        </div>
      </div>

      {/* Category Header skeleton */}
      <div className="mb-6">
        <Skeleton className="w-32 h-5 mb-1" />
        <Skeleton className="w-64 h-3 mb-4" />

        <div className="flex justify-between items-center">
          <Skeleton className="w-28 h-3" />
          <Skeleton className="w-40 h-8" />
        </div>
      </div>

      {/* Products Grid skeleton */}
      <div className="mb-8">
        <ProductGridSkeleton count={6} />
      </div>

      {/* View All Products Link skeleton */}
      <div className="text-center">
        <Skeleton className="w-32 h-8 mx-auto rounded-sm" />
      </div>
    </main>
  );
}
