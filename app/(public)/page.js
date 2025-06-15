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
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Clarity from "@/components/Clarity";

export default function HomePage() {
  return (
    <main className="flex-grow">
      <GoogleAnalytics />
      <Clarity />
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<CategorySkeleton />}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<DealsSkeleton />}>
        <DealsSection />
      </Suspense>

      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingSection />
      </Suspense>
      <Newsletter />
    </main>
  );
}
