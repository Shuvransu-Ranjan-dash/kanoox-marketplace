"use client";

import React from "react";
import DineOutSection from "@/components/home/DineOutSection";
import ConvenienceStoreSection from "@/components/home/ConvenienceStoreSection";
import FitnessEquipmentSection from "@/components/home/FitnessEquipmentSection";
import JewelrySection from "@/components/home/JewelrySection";
import ElectronicsGadgetsSection from "@/components/home/ElectronicsGadgetsSection";
import FashionView from "@/components/fashion/FashionView";
import { useCategory } from "@/context/CategoryContext";

export default function HomePage() {
  const { selectedCategory } = useCategory();

  // When Fashion category or Fashion banner is active, display the full Fashion View matching Image 3
  if (selectedCategory === "fashion") {
    return <FashionView />;
  }

  // Default Marketplace Homepage — sections match prototype order:
  // Dine Out → Convenience Stores → Fitness → Jewelry → Electronics
  return (
    <div className="space-y-2 sm:space-y-4 pb-12">
      {/* 1. Dine Out Section */}
      <DineOutSection />

      {/* 2. Convenience Stores (country-specific images) */}
      <ConvenienceStoreSection />

      {/* 3. Fitness Equipment (country-specific images) */}
      <FitnessEquipmentSection />

      {/* 4. Jewelry Stores (country-specific images) */}
      <JewelrySection />

      {/* 5. Electronics and Gadgets (country-specific images) */}
      <ElectronicsGadgetsSection />
    </div>
  );
}
