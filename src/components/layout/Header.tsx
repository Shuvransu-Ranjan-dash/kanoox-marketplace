"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  ChevronDown, 
  Phone, 
  MapPin, 
  X,
  PackageCheck
} from "lucide-react";
import DesktopNavbar from "@/components/layout/DesktopNavbar";
import MobileHeader from "@/components/layout/MobileHeader";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavourites } from "@/hooks/useFavourites";
import { formatPrice } from "@/utils/formatPrice";
import { searchProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import categoriesData from "@/data/categories.json";

export default function Header() {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { count: favCount } = useFavourites();
  const { currentCountry, setCountry, availableCountries } = useTheme();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  // Country selector dropdown state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchProducts(searchQuery);
      if (selectedCategory !== "all") {
        setSearchResults(results.filter((p) => p.categoryId === selectedCategory));
      } else {
        setSearchResults(results);
      }
      setIsSearching(false);
      setShowSearchDropdown(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <header className="w-full bg-surface shadow-sm sticky top-0 z-30">
      {/* 1. Top Utility Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs hidden md:block border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Customer Helpline: <strong className="text-white">+592 225 9000</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Deliver to: <strong className="text-white">Georgetown, Guyana</strong></span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="#track-order" className="hover:text-white transition-colors flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>

            {/* Country & Currency Switcher */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-1.5 hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-slate-800"
              >
                <span className="text-sm">{currentCountry.flag}</span>
                <span className="font-semibold text-white">{currentCountry.name}</span>
                <span className="text-slate-400">({currentCountry.currency})</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white text-content-primary rounded-md shadow-xl border border-border z-50 py-1">
                  <p className="px-3 py-1.5 text-[10px] uppercase font-bold text-content-secondary tracking-wider bg-gray-50 border-b border-border">
                    Select Region & Currency
                  </p>
                  {availableCountries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCountry(c.id);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-brand-light transition-colors ${
                        currentCountry.id === c.id ? "bg-brand-light font-bold text-brand-primary" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">{c.currency}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (Logo, Live Search, Action Buttons) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 hidden md:block">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-content-primary">
                Kanoo<span className="text-brand-primary">X</span>
              </span>
              <p className="text-[10px] text-content-secondary uppercase tracking-widest -mt-1 font-semibold">
                Marketplace
              </p>
            </div>
          </Link>

          {/* Search Bar with Category Select and Live Results */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <div className="flex items-center border-2 border-brand-primary rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-primary/20">
              {/* Category dropdown */}
              <div className="relative border-r border-gray-200 hidden sm:block">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 pl-3 pr-8 text-xs font-semibold text-content-secondary bg-gray-50 hover:bg-gray-100 cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="all">All Categories</option>
                  {categoriesData.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Text input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchDropdown(true);
                }}
                placeholder="Search thousands of products, brands and essentials..."
                className="flex-1 h-10 px-4 text-sm text-content-primary placeholder-gray-400 focus:outline-none"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Submit button */}
              <button
                type="button"
                className="h-10 px-6 bg-brand-primary hover:bg-brand-hover text-white flex items-center justify-center transition-colors"
                aria-label="Search submit"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Results Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-dropdown border border-border z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-xs text-content-secondary">
                    Searching catalog...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="divide-y divide-border/60">
                    <div className="px-4 py-2 bg-gray-50 flex justify-between items-center text-xs text-content-secondary font-medium">
                      <span>Found {searchResults.length} matching products</span>
                      <span className="text-[11px] text-brand-primary">Press enter to see all</span>
                    </div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`#prod-${product.id}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="p-3 flex items-center gap-3 hover:bg-brand-light/40 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded border border-border overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-content-primary group-hover:text-brand-primary truncate">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-content-secondary">
                            {product.categoryName}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-bold text-brand-primary">
                            {formatPrice(product.price, currentCountry.currency)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-content-secondary">
                    No products found for &quot;{searchQuery}&quot;. Try another term.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Account, Wishlist & Cart Actions */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            {/* Account */}
            <div className="flex items-center space-x-2.5 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-content-secondary group-hover:bg-brand-light group-hover:text-brand-primary transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <p className="text-content-secondary">Welcome</p>
                <p className="font-bold text-content-primary group-hover:text-brand-primary transition-colors">
                  Sign In / Register
                </p>
              </div>
            </div>

            {/* Wishlist */}
            <Link
              href="#wishlist"
              className="relative p-2 text-content-secondary hover:text-brand-primary rounded-full hover:bg-gray-100 transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-6 h-6" />
              {favCount > 0 && (
                <span className="absolute 1 top-0 right-0 min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-accent-red text-white rounded-full flex items-center justify-center shadow-sm">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-3 p-1.5 pr-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-border transition-colors group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 text-[11px] font-bold bg-accent-red text-white rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="text-left text-xs">
                <p className="text-content-secondary">My Cart</p>
                <p className="font-bold text-brand-primary">
                  {formatPrice(subtotal, currentCountry.currency)}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Desktop Navigation Bar (Categories & Links) */}
      <DesktopNavbar />

      {/* 4. Mobile Header (Only visible on small devices) */}
      <MobileHeader onSearchClick={() => setIsMobileSearchActive(!isMobileSearchActive)} />

      {/* Mobile search bar dropdown */}
      {isMobileSearchActive && (
        <div className="md:hidden px-4 py-3 bg-gray-50 border-b border-border">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-border rounded-md focus:outline-none focus:border-brand-primary"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
