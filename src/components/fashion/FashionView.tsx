"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";
import FashionProductCard, { FashionProduct } from "@/components/fashion/FashionProductCard";
import FashionMiddleBanner from "@/components/fashion/FashionMiddleBanner";
import fashionData from "@/data/fashion.json";
import { useCategory } from "@/context/CategoryContext";

export default function FashionView() {
  const { fashionSubTab } = useCategory();
  const [filterActive, setFilterActive] = useState(false);

  const activeTab = (fashionSubTab || "men").toLowerCase();

  // Select upper and lower products based on active fashion sub-tab
  let upperProducts: FashionProduct[] = fashionData.menProductsUpper as FashionProduct[];
  let lowerProducts: FashionProduct[] = fashionData.menProductsLower as FashionProduct[];

  if (activeTab === "kids") {
    upperProducts = fashionData.kidsProductsUpper as FashionProduct[];
    lowerProducts = fashionData.kidsProductsLower as FashionProduct[];
  } else if (activeTab === "women") {
    upperProducts = fashionData.womenProductsUpper as FashionProduct[];
    lowerProducts = fashionData.womenProductsLower as FashionProduct[];
  }

  return (
    <div className="w-full bg-white min-h-screen pb-12 transition-colors duration-300">
      {/* Main Fashion Products Section */}
      <section className="w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-3 sm:px-5 md:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12">
        {/* Brand Header: Exact Tommy Bahama Logo & Filter Pill Button (Matches Image 4) */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5 px-1 select-none">
          {/* Exact Official Tommy Bahama Logo from /images/logos/Tommy_Bahamas.png */}
          <div className="relative w-[135px] h-[52px] sm:w-[160px] sm:h-[62px]">
            <Image
              src="/images/logos/Tommy_Bahamas.png"
              alt="Tommy Bahama"
              fill
              className="object-contain object-left pointer-events-none"
              priority
            />
          </div>

          {/* Filter Pill Button matching Figma reference */}
          <button
            type="button"
            onClick={() => setFilterActive(!filterActive)}
            className={`inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95 cursor-pointer ${
              filterActive
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <span>Filter</span>
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
          </button>
        </div>

        {/* 3. Responsive 2-Column Product Grid matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {/* Upper Products: 1 to 4 */}
          {upperProducts.map((product) => (
            <FashionProductCard key={product.id} product={product} />
          ))}

          {/* Mid-page Promotional Banner: "Bags That Carry the Look" */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 my-2">
            <FashionMiddleBanner
              image={fashionData.middleBanner.image}
              title={fashionData.middleBanner.title}
              href={fashionData.middleBanner.ctaLink}
            />
          </div>

          {/* Lower Products: 5 to 8 */}
          {lowerProducts.map((product) => (
            <FashionProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
