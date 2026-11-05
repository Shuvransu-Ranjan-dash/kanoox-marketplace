"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getRestaurants, Restaurant } from "@/services/restaurant.service";
import Container from "@/components/ui/Container";
import SeeAllLink from "@/components/ui/SeeAllLink";
import { useCategory } from "@/context/CategoryContext";

export default function DineOutSection() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { selectedCategory } = useCategory();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartPos, setScrollStartPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  const isDineOutActive = selectedCategory === "dine-out";

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
      className={`pt-2 sm:pt-6 pb-7 sm:pb-9 transition-all duration-300 scroll-mt-28 sm:scroll-mt-36 ${
        isDineOutActive ? "bg-amber-50/60 ring-2 ring-brand-primary/40 rounded-3xl" : "bg-background"
      }`}
    >
      <Container>
        {/* Section Heading matching Figma reference: "Dine Out" and "See all (->" */}
        <div className="flex items-start sm:items-end justify-between gap-3 mb-4 sm:mb-5 select-none">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light px-2.5 py-0.5 rounded-full flex items-center gap-1">
                {isDineOutActive && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                FOOD & BEVERAGE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-content-primary tracking-tight">
              Dine Out
            </h2>
            <p className="text-xs sm:text-sm text-content-secondary mt-0.5 line-clamp-1 sm:line-clamp-none">
              Top rated Caribbean restaurants, waterfront bistros & artisan grills
            </p>
          </div>

          {/* Signature "See all (->" matching reference image */}
          <div className="flex-shrink-0 pt-1 sm:pt-0">
            <SeeAllLink href="#dine-out" text="See all" />
          </div>
        </div>

        {/* 
          Responsive Scrollable Cards Track:
          - Matching CategorySection UI responsiveness
          - Native touch swipe with next card peeking on the right
          - Mouse drag-to-scroll on desktop
          - Mouse wheel horizontal scrolling
          - touchAction: "pan-y" ensures vertical page scroll is NEVER stuck when touching cards
        */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
          className={`flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1 px-1 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="w-[260px] sm:w-[290px] md:w-[320px] lg:w-[340px] flex-shrink-0 snap-start bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between hover:border-brand-primary/40"
            >
              {/* Restaurant Image */}
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden pointer-events-none">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 290px, 340px"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{restaurant.rating}</span>
                </div>

                {/* Feature Badge */}
                {restaurant.badge && (
                  <div className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-md">
                    {restaurant.badge}
                  </div>
                )}
              </div>

              {/* Restaurant Details */}
              <div className="p-4 flex-1 flex flex-col justify-between pointer-events-none">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-content-secondary mb-1">
                    <span className="font-bold text-brand-primary">{restaurant.cuisine}</span>
                    <span className="font-extrabold text-gray-400">{restaurant.priceLevel}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-content-primary group-hover:text-brand-primary transition-colors line-clamp-1">
                    {restaurant.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-content-secondary mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{restaurant.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      if (hasDragged) e.preventDefault();
                    }}
                    className="text-xs font-bold text-brand-primary hover:text-brand-hover flex items-center gap-1 group/btn pointer-events-auto"
                  >
                    <span>Order</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
