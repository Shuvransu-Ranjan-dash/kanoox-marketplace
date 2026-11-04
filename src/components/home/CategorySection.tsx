import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/services/category.service";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section id="categories" className="py-8 sm:py-10">
      <Container>
        <SectionHeading
          badge="CATEGORIES"
          title="Shop by Department"
          subtitle="Explore authentic products across our top Caribbean marketplace categories"
          viewAllLink="#categories"
          viewAllText="All Categories"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`#category-${cat.id}`}
              className="group bg-surface border border-border/80 rounded-xl p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-200 hover:border-brand-primary/50 hover:shadow-card-hover"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-50 mb-3 border border-border group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <h3 className="text-xs font-bold text-content-primary group-hover:text-brand-primary transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[10px] text-content-secondary mt-0.5">
                {cat.itemCount}+ items
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
