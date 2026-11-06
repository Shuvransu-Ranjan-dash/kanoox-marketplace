"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getRestaurants, Restaurant } from "@/services/restaurant.service";
import Container from "@/components/ui/Container";
import SeeAllLink from "@/components/ui/SeeAllLink";
import { useTheme } from "@/context/ThemeContext";

export default function DineOutSection() {
  const { currentCountry } = useTheme();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPos, setScrollStartPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Re-fetch / filter restaurants whenever country changes
  useEffect(() => {
    getRestaurants(currentCountry.id).then(setRestaurants);
  }, [currentCountry.id]);

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
    <section
      id="dine-out"
      className="pt-2 sm:pt-4 pb-6 sm:pb-8 bg-background transition-colors duration-300 scroll-mt-28 sm:scroll-mt-36"
    >
      <Container>
        {/* Section Heading matching Figma reference: Clean "Dine Out" & "See all (->" */}
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3 select-none">
          <h2 className="font-nunito text-[18px] leading-[36px] font-medium tracking-normal text-[#4C4C4C]">
            Dine Out
          </h2>

          <div className="flex-shrink-0">
            <SeeAllLink href="#dine-out" text="See all" />
          </div>
        </div>

        {/* 
          Clean Dine Out Cards Track (Matches Figma Reference):
          - Tall rounded image (aspect-[4/5] with rounded-2xl)
          - Centered restaurant name and street location underneath
          - Smooth drag-to-scroll on desktop, native swipe on mobile
          - Dynamic per-country listing (Bahamas, Trinidad, Jamaica, Guyana)
        */}
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
          className={`flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pt-1 px-1 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="w-[230px] sm:w-[260px] md:w-[280px] flex-shrink-0 snap-start group cursor-pointer"
            >
              {/* Rounded Portrait Image */}
              <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 pointer-events-none bg-gray-100">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 230px, 280px"
                  priority
                />
              </div>

              {/* Centered Restaurant Name & Location Address */}
              <div className="mt-2.5 sm:mt-3 text-center pointer-events-none px-1">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-brand-primary transition-colors tracking-tight line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-1">
                  {restaurant.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
