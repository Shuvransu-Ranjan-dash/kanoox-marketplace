import React from "react";
import { getPopularProducts } from "@/services/product.service";
import ProductCarousel from "@/components/product/ProductCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export default async function PopularProducts() {
  const products = await getPopularProducts();

  return (
    <section id="popular" className="py-8 sm:py-10 bg-gray-50/60 border-y border-border/60">
      <Container>
        <SectionHeading
          badge="TOP RATED"
          title="Best Sellers & Trending"
          subtitle="Most ordered items this week across Guyana"
          viewAllLink="#products"
          viewAllText="View all"
        />

        <ProductCarousel products={products} />
      </Container>
    </section>
  );
}
