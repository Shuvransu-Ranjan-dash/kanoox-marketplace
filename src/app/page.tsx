import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionalSection from "@/components/home/PromotionalSection";
import PopularProducts from "@/components/home/PopularProducts";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero Banners & Quick Deals Spotlight */}
      <HeroSection />

      {/* 2. Departments & Categories */}
      <CategorySection />

      {/* 3. Featured Products Grid */}
      <FeaturedProducts />

      {/* 4. High-impact Mid-page Promotional Section */}
      <PromotionalSection />

      {/* 5. Best Sellers & Trending Carousel */}
      <PopularProducts />
    </div>
  );
}
