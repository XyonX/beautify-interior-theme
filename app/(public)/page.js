"use client";

import { useState, useEffect } from "react";
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

// export default function Home() {
//   return (
//     <div>
//       <HeroSection />
//       <CategorySection />
//       <DealsSection />
//       <FeaturedProducts />
//       <TrendingSection />
//       <Newsletter />
//     </div>
//   );
// }

export default function HomePage() {
  const [loadingStates, setLoadingStates] = useState({
    hero: false,
    categories: false,
    featured: false,
    trending: false,
    deals: false,
  });

  // useEffect(() => {
  //   // Simulate progressive loading
  //   const timers = [
  //     setTimeout(() => {
  //       setLoadingStates((prev) => ({ ...prev, hero: false }));
  //     }, 1500),

  //     setTimeout(() => {
  //       setLoadingStates((prev) => ({ ...prev, categories: false }));
  //     }, 2000),

  //     setTimeout(() => {
  //       setLoadingStates((prev) => ({ ...prev, featured: false }));
  //     }, 2500),

  //     setTimeout(() => {
  //       setLoadingStates((prev) => ({ ...prev, trending: false }));
  //     }, 3000),

  //     setTimeout(() => {
  //       setLoadingStates((prev) => ({ ...prev, deals: false }));
  //     }, 3500),
  //   ];

  //   return () => {
  //     timers.forEach((timer) => clearTimeout(timer));
  //   };
  // }, []);

  return (
    <main className="flex-grow">
      {/* Google analytics */}
      <GoogleAnalytics />
      <Clarity />

      {/* Hero Section */}
      {loadingStates.hero ? <HeroSkeleton /> : <HeroSection />}

      {/* Categories Section */}
      {loadingStates.categories ? <CategorySkeleton /> : <CategorySection />}

      {/* Featured Products Section */}
      {loadingStates.featured ? (
        <FeaturedProductsSkeleton />
      ) : (
        <FeaturedProducts />
      )}

      {/* Trending Section */}
      {loadingStates.trending ? <TrendingSkeleton /> : <TrendingSection />}

      {/* Deals Section */}
      {loadingStates.deals ? <DealsSkeleton /> : <DealsSection />}

      {/* Newsletter - Always visible */}
      <Newsletter />
    </main>
  );
}
