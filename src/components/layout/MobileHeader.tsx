"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Globe, 
  ChevronRight,
  Flame,
  PhoneCall
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavourites } from "@/hooks/useFavourites";
import categoriesData from "@/data/categories.json";
import navigationData from "@/data/navigation.json";

interface MobileHeaderProps {
  onSearchClick: () => void;
}

export default function MobileHeader({ onSearchClick }: MobileHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { count: favCount } = useFavourites();
  const { currentCountry, setCountry, availableCountries } = useTheme();

  return (
    <div className="md:hidden bg-surface border-b border-border sticky top-0 z-30 shadow-sm">
      {/* Top Mobile Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Hamburger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-1.5 -ml-1 text-content-primary rounded-md hover:bg-gray-100"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* KanooX Logo */}
        <Link href="/" className="flex items-center space-x-1.5">
          <span className="text-xl font-black tracking-tight text-brand-primary">
            Kanoo<span className="text-accent-yellow">X</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-light text-brand-primary px-1.5 py-0.5 rounded">
            GY
          </span>
        </Link>

        {/* Action icons: Search, Wishlist, Cart */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSearchClick}
            className="p-2 text-content-secondary hover:text-content-primary rounded-full hover:bg-gray-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="#wishlist"
            className="relative p-2 text-content-secondary hover:text-content-primary rounded-full hover:bg-gray-100"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {favCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-accent-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-content-secondary hover:text-content-primary rounded-full hover:bg-gray-100"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-brand-primary" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-surface shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 bg-brand-primary text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold tracking-tight">
                    Kanoo<span className="text-accent-yellow">X</span> Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white rounded-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Country & Currency Switcher inside Drawer */}
              <div className="p-4 bg-gray-50 border-b border-border">
                <label className="text-xs font-semibold text-content-secondary flex items-center gap-1.5 mb-2">
                  <Globe className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Delivery Region & Theme</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableCountries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCountry(c.id)}
                      className={`text-xs font-medium py-1.5 px-2.5 rounded border text-left flex items-center gap-1.5 transition-colors ${
                        currentCountry.id === c.id
                          ? "bg-brand-light border-brand-primary text-brand-primary font-bold shadow-sm"
                          : "bg-white border-border text-content-secondary hover:bg-gray-50"
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span className="truncate">{c.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-content-secondary mb-2">
                    Quick Links
                  </p>
                  <ul className="space-y-1">
                    {navigationData.mainNav.map((nav) => (
                      <li key={nav.id}>
                        <Link
                          href={nav.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center justify-between py-2 text-sm font-medium text-content-primary hover:text-brand-primary"
                        >
                          <span className="flex items-center gap-2">
                            {nav.id === "deals" && <Flame className="w-4 h-4 text-red-500" />}
                            {nav.label}
                          </span>
                          {nav.badge && (
                            <span className="text-[9px] font-bold bg-accent-red text-white px-1.5 py-0.5 rounded">
                              {nav.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-content-secondary mb-2">
                    Shop by Department
                  </p>
                  <ul className="space-y-1">
                    {categoriesData.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`#category-${cat.id}`}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center justify-between py-2 text-xs font-medium text-content-secondary hover:text-brand-primary"
                        >
                          <span>{cat.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-border bg-gray-50 text-xs text-content-secondary space-y-2">
                <div className="flex items-center gap-2 text-brand-primary font-medium">
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Us: +592 225 9000</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  © 2026 KanooX Marketplace Guyana
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
