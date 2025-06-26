import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section";
import { CategorySection } from "@/components/category-section";
import { FeaturedProducts } from "@/components/featured-products";
import { TrendingSection } from "@/components/trending-section";
import { DealsSection } from "@/components/deals-section";
import { Newsletter } from "@/components/Newsletter";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { CategorySkeleton } from "@/components/skeletons/category-skeleton";
import { FeaturedProductsSkeleton } from "@/components/skeletons/featured-products-skeleton";
import { TrendingSkeleton } from "@/components/skeletons/trending-skeleton";
import { DealsSkeleton } from "@/components/skeletons/deals-skeleton";
import { FocusCategorySkeleton } from "@/components/skeletons/focus-category-skeleton";
import { FocusCategory } from "@/components/focus-category";
import { InteractiveProductExplorer } from "@/components/interactive-product-explorer";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<CategorySkeleton />}>
        <CategorySection />
      </Suspense>
      <InteractiveProductExplorer />
      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingSection />
      </Suspense>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
        <Suspense fallback={<FocusCategorySkeleton />}>
          <FocusCategory />
        </Suspense>
      </Suspense>
      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingSection />
      </Suspense>
      <Suspense fallback={<DealsSkeleton />}>
        <DealsSection />
      </Suspense>

      <Newsletter />
    </main>
  );
}
