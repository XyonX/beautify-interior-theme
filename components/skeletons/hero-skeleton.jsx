import { Skeleton } from "@/components/ui/skeleton"

export function HeroSkeleton() {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
          <Skeleton className="w-full h-full rounded-sm" />

          {/* Navigation buttons skeleton */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>

          {/* Slide indicators skeleton */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </div>

          {/* Text overlay skeleton */}
          <div className="absolute bottom-8 left-8">
            <Skeleton className="w-48 h-8 mb-2" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
