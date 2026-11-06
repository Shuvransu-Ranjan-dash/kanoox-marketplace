"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import countryContent from "@/data/country-content.json";
import Container from "@/components/ui/Container";
import SeeAllLink from "@/components/ui/SeeAllLink";

type CountryContentKey = keyof typeof countryContent;

export default function ConvenienceStoreSection() {
  const { currentCountry } = useTheme();
  const countryId = currentCountry.id as CountryContentKey;
  const data = countryContent[countryId] ?? countryContent["bahamas"];
  const stores = data.convenienceStore;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollStart(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollStart - (x - startX) * 1.5;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section
      id="convenience-stores"
      className="pt-2 sm:pt-4 pb-6 sm:pb-8 bg-background transition-colors duration-300 scroll-mt-28 sm:scroll-mt-36"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3 select-none">
          <h2 className="font-nunito text-[18px] leading-[36px] font-medium tracking-normal text-[#4C4C4C]">
            Convenience Stores
          </h2>
          <div className="flex-shrink-0">
            <SeeAllLink href="#convenience-stores" text="See all" />
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          className={`flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pt-1 px-1 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {stores.map((store) => (
            <div
              key={store.id}
              className="w-[230px] sm:w-[260px] md:w-[280px] flex-shrink-0 snap-start group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 pointer-events-none bg-gray-100">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 230px, 280px"
                />
              </div>
              <div className="mt-2.5 sm:mt-3 text-center pointer-events-none px-1">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-brand-primary transition-colors tracking-tight line-clamp-1">
                  {store.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
