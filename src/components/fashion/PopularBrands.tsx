"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SeeAllLink from "@/components/ui/SeeAllLink";
import fashionData from "@/data/fashion.json";
import { useCategory } from "@/context/CategoryContext";

export default function PopularBrands() {
  const { fashionSubTab } = useCategory();
  const activeTab = (fashionSubTab || "men").toLowerCase();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPos, setScrollStartPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Mouse Drag-to-Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStartPos(el.scrollLeft);
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    el.scrollLeft = scrollStartPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  return (
    <div className="w-full bg-transparent text-white pt-1 pb-1 select-none transition-colors duration-300">
      <div className="w-full">
        {/* Header: Popular Brands & See all (-> matching Figma reference */}
        <div className="flex items-center justify-between gap-3 mb-2 px-1">
          <h2 className="font-nunito text-[18px] leading-[36px] font-medium tracking-normal text-white">
            Popular Brands
          </h2>
          <SeeAllLink
            href="#brands"
            text="See all"
            textColor="rgba(255, 255, 255, 0.9)"
            className="text-white hover:text-white"
            onClick={(e) => {
              if (hasDragged) e.preventDefault();
            }}
          />
        </div>

        {/* Horizontal Brand Tiles (Matches Figma dark rounded cards) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pan-y",
          }}
          className={`flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 px-0.5 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {fashionData.brands.map((brand, idx) => {
            const isFirst = idx === 0;

            let tileClasses = isFirst
              ? "bg-[#101014] border-white/20 hover:border-white/40"
              : "bg-[#34343B] border-white/15 hover:border-white/30 hover:bg-[#3D3D45]";

            if (activeTab === "kids") {
              tileClasses = isFirst
                ? "bg-black/35 backdrop-blur-md border-white/30 hover:border-white/50 hover:bg-black/45"
                : "bg-black/25 backdrop-blur-md border-white/20 hover:border-white/35 hover:bg-black/35";
            } else if (activeTab === "women") {
              tileClasses = isFirst
                ? "bg-white/20 backdrop-blur-md border-white/35 hover:border-white/50 hover:bg-white/25"
                : "bg-white/15 backdrop-blur-md border-white/20 hover:border-white/35 hover:bg-white/20";
            }

            return (
              <div
                key={brand.id}
                className={`flex-shrink-0 snap-start w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] md:w-[92px] md:h-[92px] rounded-2xl border transition-all duration-200 flex items-center justify-center p-3 shadow-md hover:scale-105 group cursor-pointer ${tileClasses}`}
                title={brand.name}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain filter group-hover:brightness-110 transition-all pointer-events-none"
                    sizes="(max-width: 640px) 76px, 92px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
