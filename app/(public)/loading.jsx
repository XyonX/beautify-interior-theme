import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { CategorySkeleton } from "@/components/skeletons/category-skeleton";
import { FeaturedProductsSkeleton } from "@/components/skeletons/featured-products-skeleton";
import { TrendingSkeleton } from "@/components/skeletons/trending-skeleton";
import { DealsSkeleton } from "@/components/skeletons/deals-skeleton";
import { Newsletter } from "@/components/newsletter";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSkeleton />
        <CategorySkeleton />
        <FeaturedProductsSkeleton />
        <TrendingSkeleton />
        <DealsSkeleton />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
