import React from "react";
import { getFeaturedProducts } from "@/services/product.service";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section id="featured" className="py-8 sm:py-10">
      <Container>
        <SectionHeading
          badge="HANDPICKED DEALS"
          title="Featured Products"
          subtitle="Top rated tech, electronics and lifestyle essentials selected for you"
          viewAllLink="#products"
          viewAllText="View All Featured"
        />

        <ProductGrid products={products} columns={4} />
      </Container>
    </section>
  );
}
