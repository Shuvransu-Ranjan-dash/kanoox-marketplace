"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Laptop, 
  Refrigerator, 
  Shirt, 
  Sparkles, 
  ShoppingBag, 
  ChevronRight, 
  ArrowRight,
  Gamepad2,
  Car
} from "lucide-react";
import navigationData from "@/data/navigation.json";
import { formatPrice } from "@/utils/formatPrice";
import { useTheme } from "@/context/ThemeContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-4 h-4" />,
  Refrigerator: <Refrigerator className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const { megaMenu } = navigationData;
  const [activeTab, setActiveTab] = useState(megaMenu[0]?.id || "");
  const { currentCountry } = useTheme();

  if (!isOpen) return null;

  const activeCategory = megaMenu.find((m) => m.id === activeTab) || megaMenu[0];

  return (
    <div
      className="absolute top-full left-0 w-full bg-surface shadow-dropdown border-t border-border z-40 transition-all duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1280px] mx-auto flex min-h-[380px]">
        {/* Left Side Navigation Tabs */}
        <div className="w-64 bg-gray-50/70 border-r border-border py-3 flex-shrink-0">
          <p className="px-4 py-2 text-[11px] font-bold text-content-secondary uppercase tracking-wider">
            All Categories
          </p>
          <div className="space-y-0.5">
            {megaMenu.map((item) => {
              const isActive = item.id === activeCategory.id;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveTab(item.id)}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface text-brand-primary font-semibold shadow-sm border-l-4 border-brand-primary"
                      : "text-content-primary hover:bg-gray-100 hover:text-brand-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-brand-primary" : "text-gray-400"}>
                      {ICON_MAP[item.icon] || <Laptop className="w-4 h-4" />}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? "text-brand-primary" : "text-gray-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Subsections Grid */}
        <div className="flex-1 p-6 grid grid-cols-2 lg:grid-cols-3 gap-6 bg-surface">
          {activeCategory?.subSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm font-bold text-content-primary border-b border-border/60 pb-1.5 flex items-center justify-between">
                <span>{section.title}</span>
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-xs text-content-secondary hover:text-brand-primary flex items-center justify-between group transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                      {link.isNew && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Featured Promo Spotlight */}
        {activeCategory?.featuredProduct && (
          <div className="w-72 p-6 bg-gradient-to-b from-brand-light/30 to-gray-50 border-l border-border flex flex-col justify-between flex-shrink-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-light px-2 py-0.5 rounded-sm">
                Featured Spotlight
              </span>
              <div className="relative w-full aspect-square mt-3 rounded-lg overflow-hidden bg-white shadow-sm border border-border">
                <Image
                  src={activeCategory.featuredProduct.image}
                  alt={activeCategory.featuredProduct.name}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
              </div>
              <h5 className="text-xs font-semibold text-content-primary mt-3 line-clamp-2">
                {activeCategory.featuredProduct.name}
              </h5>
              <p className="text-sm font-bold text-brand-primary mt-1">
                {formatPrice(activeCategory.featuredProduct.price, currentCountry.currency)}
              </p>
            </div>

            <Link
              href={activeCategory.featuredProduct.link}
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center text-xs font-semibold text-white bg-brand-primary hover:bg-brand-hover py-2 px-3 rounded-md transition-colors gap-1.5 group"
            >
              <span>View Deal</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
