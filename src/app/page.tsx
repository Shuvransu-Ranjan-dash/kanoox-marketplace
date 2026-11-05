import DineOutSection from "@/components/home/DineOutSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionalSection from "@/components/home/PromotionalSection";
import PopularProducts from "@/components/home/PopularProducts";

export default function HomePage() {
  return (
    <div className="space-y-2 sm:space-y-4">
      {/* 1. Dine Out Section (Matching reference screenshot below the curved header) */}
      <DineOutSection />

      {/* 2. Featured Products Grid (Curated deals from product.service.ts) */}
      <FeaturedProducts />

      {/* 3. Promotional Banners (Special seasonal offers) */}
      <PromotionalSection />

      {/* 4. Best Sellers & Trending Product Carousel */}
      <PopularProducts />
    </div>
  );
}
