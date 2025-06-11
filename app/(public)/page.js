import { CategorySection } from "@/components/CategorySection";
import ComingSoon from "@/components/ComingSoon";
import { DealsSection } from "@/components/DealSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HeroSection } from "@/components/HeroSection";
import { Newsletter } from "@/components/Newsletter";
import { TrendingSection } from "@/components/TrendingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <DealsSection />
      <FeaturedProducts />
      <TrendingSection />
      <Newsletter />
    </div>
  );
}
