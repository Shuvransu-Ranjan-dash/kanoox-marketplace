"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import countryContent from "@/data/country-content.json";
import Container from "@/components/ui/Container";
import SeeAllLink from "@/components/ui/SeeAllLink";

type CountryContentKey = keyof typeof countryContent;

export default function ElectronicsGadgetsSection() {
  const { currentCountry } = useTheme();
  const countryId = currentCountry.id as CountryContentKey;
  const data = countryContent[countryId] ?? countryContent["bahamas"];
  const items = data.electronics;

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
    el.scrollLeft = scrollStart - (e.pageX - el.offsetLeft - startX) * 1.5;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <section
      id="electronics-gadgets"
      className="pt-2 sm:pt-4 pb-6 sm:pb-8 bg-background transition-colors duration-300 scroll-mt-28 sm:scroll-mt-36"
    >
      <Container>
        {/* Section Heading */}
        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3 select-none">
          <h2 className="font-nunito text-[18px] leading-[36px] font-medium tracking-normal text-[#4C4C4C]">
            Electronics and Gadgets
          </h2>
          <div className="flex-shrink-0">
            <SeeAllLink href="#electronics-gadgets" text="See all" />
          </div>
        </div>

        {/* Responsive Cards Row matching Jewelry & Convenience Store */}
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
          {items.map((item) => {
            const videoSrc =
              ("video" in item && item.video) ||
              ("image" in item && item.image?.endsWith(".mp4") ? item.image : null);
            const imageSrc = "image" in item ? item.image : null;

            return (
              <div
                key={item.id}
                className="w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 pointer-events-none bg-gray-900">
                  {videoSrc ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 280px, 360px"
                      priority
                    />
                  ) : null}
                </div>
                <div className="mt-2.5 sm:mt-3 text-center pointer-events-none px-1">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-brand-primary transition-colors tracking-tight line-clamp-1">
                    {item.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
