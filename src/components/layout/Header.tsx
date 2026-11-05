"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Mic, 
  ChevronDown, 
  Home, 
  MapPin, 
  Bell, 
  User, 
  ShoppingBag, 
  X, 
  Check
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/formatPrice";
import { searchProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import KanooLogo from "@/components/ui/KanooLogo";
import CountryFlag from "@/components/ui/CountryFlag";
import CategorySection from "@/components/home/CategorySection";
import BannerCarousel from "@/components/home/BannerCarousel";
import { HeroBanner } from "@/types/banner";
import bannersData from "@/data/banners.json";

interface HeaderProps {
  heroBanners?: HeroBanner[];
  onCategoryFilter?: (categoryId: string) => void;
  selectedCategory?: string;
}

const SEARCH_PLACEHOLDERS = [
  "Search jewelry, luxury watches & gold...",
  "Search electronics, headphones & laptops...",
  "Search household, appliances & smart TV...",
  "Search personal care, skincare & beauty...",
  "Search Caribbean dining & restaurants...",
  "Search fresh groceries & artisan coffee...",
  "Search Paradise Plates & gala tickets...",
];

export default function Header({ 
  heroBanners = bannersData.heroBanners as HeroBanner[], 
  onCategoryFilter, 
  selectedCategory 
}: HeaderProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const { currentCountry, setCountry, availableCountries } = useTheme();

  // Search input starts EMPTY (not hardcoded text!)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Dynamic Typewriter Search Placeholder (types letter-by-letter, pauses, backspaces, then types next category)
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [placeholderPhraseIndex, setPlaceholderPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // When user is typing their own query, pause typewriter
    if (searchQuery) return;

    const currentPhrase = SEARCH_PLACEHOLDERS[placeholderPhraseIndex];
    const typingSpeed = isDeleting ? 28 : 60; // Backspace faster than typing

    if (!isDeleting && typedPlaceholder === currentPhrase) {
      // Completed typing the phrase: pause for 2.2 seconds so user can read it
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedPlaceholder === "") {
      // Completed deleting: move to next phrase and pause briefly
      setIsDeleting(false);
      setPlaceholderPhraseIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
      const timeout = setTimeout(() => {}, 300);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTypedPlaceholder((prev) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedPlaceholder, isDeleting, placeholderPhraseIndex, searchQuery]);

  // Section Refs for accurate dynamic measurement
  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const bannerInnerRef = useRef<HTMLDivElement>(null);

  // Dynamic heights (with robust default fallbacks)
  const [topBarHeight, setTopBarHeight] = useState(54);
  const [searchHeight, setSearchHeight] = useState(60);
  const [bannerHeight, setBannerHeight] = useState(320);
  const [spacerHeight, setSpacerHeight] = useState(500);

  // Measure natural heights on mount and resize
  useEffect(() => {
    const measure = () => {
      if (topBarRef.current) {
        const h = topBarRef.current.offsetHeight;
        if (h > 0) setTopBarHeight(h);
      }
      if (searchRef.current) {
        const h = searchRef.current.offsetHeight;
        if (h > 0) setSearchHeight(h);
      }
      if (bannerInnerRef.current) {
        const h = bannerInnerRef.current.offsetHeight;
        if (h > 0) setBannerHeight(h);
      }
      if (headerRef.current && window.scrollY === 0) {
        const h = headerRef.current.offsetHeight;
        if (h > 0) setSpacerHeight(h);
      }
    };

    measure();
    const timer = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Continuous monotonic scroll position tracked via requestAnimationFrame
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrollY(window.scrollY);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Multi-Phase Sticky Scroll Derivations (Pure monotonic math -> zero fluctuation)
  // Step 1: Top Bar (Avatar, Logo, Icons) hides first (0 < scrollY <= topBarHeight)
  const topBarOffset = Math.min(topBarHeight, Math.max(0, scrollY));
  const topBarOpacity = Math.max(0, 1 - (topBarOffset / Math.max(1, topBarHeight)) * 1.5);

  // Step 2: Banner closes like a box under Categories (Search & Categories remain fully visible!)
  const bannerScroll = Math.max(0, scrollY - topBarHeight);
  const bannerOffset = Math.min(bannerHeight, bannerScroll);

  // Step 3: Once Banner is completely closed, Search Line slides up and hides
  const searchScroll = Math.max(0, scrollY - (topBarHeight + bannerHeight));
  const searchOffset = Math.min(searchHeight, searchScroll);
  const searchOpacity = Math.max(0, 1 - (searchOffset / Math.max(1, searchHeight)) * 1.5);

  // Step 4: Category is stuck firmly at top: 0
  const isStuckWithCategory = searchOffset >= searchHeight;

  // Country selector modal state
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const countryContainerRef = useRef<HTMLDivElement>(null);
  const countryModalRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (countryContainerRef.current && !countryContainerRef.current.contains(event.target as Node)) {
        setIsCountryModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search execution (only when user has actually typed something)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchProducts(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setShowSearchDropdown(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Voice Search Simulation
  const toggleVoiceSearch = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setSearchQuery("Watches & Jewelry");
        setIsListening(false);
        setShowSearchDropdown(true);
      }, 1800);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* 
        =========================================================
        CONSTANT-HEIGHT SPACER (Preserves document scroll height)
        Prevents layout shifts, jumping, and Chrome scroll-anchoring jitter!
        =========================================================
      */}
      <div
        style={{ height: spacerHeight > 0 ? `${spacerHeight}px` : "500px" }}
        className="w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* 
        =========================================================
        UNIFIED SINGLE HEADER CONTAINER (Matches user reference)
        - Sticks at top: 0 (fixed)
        - Step 1: Top bar slides up and hides
        - Step 2: Banner closes like a box under categories (Search & Category stay visible!)
        - Step 3: Search bar slides up and hides
        - Step 4: Category bar sticks at top: 0 with curved bottom edge!
        - Dine Out and rest of page scroll smoothly underneath!
        =========================================================
      */}
      <header
        ref={headerRef}
        style={{ background: currentCountry.headerGradientCss }}
        className={`w-full text-white select-none fixed top-0 left-0 right-0 z-40 transition-shadow ${
          isStuckWithCategory
            ? "pt-2 pb-2.5 sm:pb-3 rounded-b-2xl sm:rounded-b-3xl shadow-2xl border-b border-white/10"
            : "pt-3.5 sm:pt-4 pb-4 sm:pb-6 rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-2xl"
        }`}
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
          
          {/* ========================================================= */}
          {/* 1. TOP APP BAR (Avatar, User, Kanoo Logo, Quick Pills)     */}
          {/* ========================================================= */}
          <div
            ref={topBarRef}
            style={{
              marginTop: topBarOffset > 0 ? -topBarOffset : undefined,
              opacity: topBarOpacity,
              overflow: topBarOffset > 0 ? "hidden" : "visible",
            }}
            className="pt-1 pb-2 sm:pb-3"
          >
            <div className="flex items-center justify-between gap-1.5 sm:gap-2">
              {/* Left: User Avatar & Verification Badge */}
              <div className="flex items-center space-x-1.5 sm:space-x-2.5 min-w-0 flex-shrink">
                <div
                  style={{ backgroundColor: currentCountry.cardBgCss, borderColor: currentCountry.cardBorderCss }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center text-white/90 shadow-sm flex-shrink-0"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </div>
                <div className="leading-tight min-w-0">
                  <h1 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1 truncate">
                    Shuvransu Dash
                  </h1>
                  <p
                    style={{ color: currentCountry.textMutedColor }}
                    className="text-[10px] sm:text-[11px] font-medium flex items-center gap-1 truncate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse flex-shrink-0" />
                    <span className="truncate">Level 1 Verified</span>
                  </p>
                </div>
              </div>

              {/* Center: Kanoo Stylized Origami Logo '><' */}
              <Link href="/" className="flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 px-1" aria-label="Kanoo Home">
                <KanooLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md" />
              </Link>

              {/* Right: Quick Action Controls (4 responsive identical size & height buttons) */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5 flex-shrink-0">
                {/* 1. Home Button */}
                <Link
                  href="/"
                  title="Home"
                  style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105"
                >
                  <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
                </Link>

                {/* 2. Location Pin Button */}
                <button
                  type="button"
                  onClick={() => setIsCountryModalOpen(true)}
                  title={`Location: ${currentCountry.deliveryCity}`}
                  style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105 cursor-pointer"
                  aria-label="Location Settings"
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
                </button>

                {/* 3. Notification Bell with Red Dot */}
                <button
                  type="button"
                  onClick={() => setHasUnreadNotification(!hasUnreadNotification)}
                  style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                  className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105 cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
                  {hasUnreadNotification && (
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-black/40 shadow-sm" />
                  )}
                </button>

                {/* 4. Shopping Cart Button */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                  className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm active:scale-95 hover:scale-105 cursor-pointer"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] sm:min-w-[21px] sm:h-[21px] px-1 text-[10px] sm:text-[11px] font-black bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-black/40 z-30 pointer-events-none">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. SEARCH & COUNTRY CHANGER BAR                          */}
        {/* ========================================================= */}
        <div
          ref={searchRef}
          style={{
            marginTop: searchOffset > 0 ? -searchOffset : undefined,
            opacity: searchOpacity,
            overflow: searchOffset > 0 ? "hidden" : "visible",
          }}
          className="pb-3 sm:pb-3.5 relative z-40"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input Box with Animated Smooth Sliding Placeholder */}
            <div className="flex-1 relative" ref={searchContainerRef}>
              <div
                style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                className="flex items-center h-12 border rounded-2xl px-3.5 shadow-inner transition-all relative overflow-hidden"
              >
                {/* Search Magnifier Icon */}
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 mr-2.5 flex-shrink-0 z-20" />

                {/* Input Text Field */}
                <div className="flex-1 relative h-full flex items-center overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setShowSearchDropdown(true);
                    }}
                    className="w-full h-full bg-transparent text-white text-sm font-medium focus:outline-none tracking-wide z-10 relative"
                  />

                  {/* Dynamic Typewriter Animated Placeholder */}
                  {!searchQuery && (
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none select-none overflow-hidden z-0 w-full pr-2">
                      <span className="text-white/50 text-sm font-medium tracking-wide truncate whitespace-nowrap flex items-center">
                        {typedPlaceholder}
                        <span className="inline-block w-[1.5px] h-3.5 bg-white/70 ml-0.5 animate-pulse" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Clear search text */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-white/50 hover:text-white mr-1 z-20"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Microphone Voice Search Trigger */}
                <button
                  type="button"
                  onClick={toggleVoiceSearch}
                  className={`p-1.5 rounded-full transition-all z-20 ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  title={isListening ? "Listening... (Speak now)" : "Voice Search"}
                  aria-label="Voice Search"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              {/* Voice Listening Feedback Alert */}
              {isListening && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-white/20 z-50 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                    <span>Listening for voice input...</span>
                  </div>
                  <button onClick={() => setIsListening(false)} className="text-white/60 hover:text-white">
                    Cancel
                  </button>
                </div>
              )}

              {/* LIVE SEARCH RESULTS DROPDOWN (Only opens when user is searching) */}
              {showSearchDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs font-semibold text-white/70">
                    <span>Matches for &quot;{searchQuery}&quot;</span>
                    <button
                      onClick={() => setShowSearchDropdown(false)}
                      className="text-white/50 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {isSearching ? (
                    <div className="p-6 text-center text-xs text-white/60 flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Searching catalog...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`#prod-${product.id}`}
                          onClick={() => setShowSearchDropdown(false)}
                          className="p-3 sm:p-3.5 flex items-center gap-3 hover:bg-white/10 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-xl border border-white/20 overflow-hidden bg-black/30 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 truncate">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-white/60">
                              {product.categoryName} {product.brand ? `· ${product.brand}` : ""}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                              {formatPrice(product.price, currentCountry.currency)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-white/60">
                      No matching products found. Try typing &quot;Watch&quot;, &quot;Sony&quot;, or &quot;Coffee&quot;.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Country Changer Pill [ ⌄ 🇹🇹 ] */}
            <div className="relative z-30" ref={countryContainerRef}>
              <button
                type="button"
                onClick={() => setIsCountryModalOpen((prev) => !prev)}
                style={{ backgroundColor: currentCountry.searchBgCss, borderColor: currentCountry.cardBorderCss }}
                className="h-12 px-3 sm:px-3.5 border rounded-2xl flex items-center gap-2 text-white shadow-sm transition-all flex-shrink-0 active:scale-95 cursor-pointer"
                title={`Active Country: ${currentCountry.name} (${currentCountry.currency})`}
                aria-label="Select Country and Theme"
              >
                <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isCountryModalOpen ? "rotate-180" : ""}`} />
                <CountryFlag countryId={currentCountry.id} className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* COUNTRY SELECTOR POPOVER MODAL */}
              {isCountryModalOpen && (
                <div
                  ref={countryModalRef}
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                >
                  <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        Select Country & Theme
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Changes background color & currency
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCountryModalOpen(false)}
                      className="p-1 text-white/50 hover:text-white rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                    {availableCountries.map((c) => {
                      const isSelected = currentCountry.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setCountry(c.id);
                            setIsCountryModalOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all ${
                            isSelected
                              ? "bg-white/20 border border-white/40 text-white font-bold shadow-sm"
                              : "hover:bg-white/10 text-white/80 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CountryFlag countryId={c.id} className="w-7 h-7" />
                            <div>
                              <p className="text-xs font-bold leading-tight">{c.name}</p>
                              <p className="text-[10px] text-white/60">{c.deliveryCity}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20 text-white">
                              {c.currency}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 bg-black/40 border-t border-white/10 text-[11px] text-white/70 text-center">
                    Active Delivery: <strong className="text-white">{currentCountry.deliveryCity}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. 3D CATEGORIES ROW (Sticks at top: 0 in Phase 4!)       */}
        {/* ========================================================= */}
        <div className="relative z-20 pb-1.5 sm:pb-2">
          <CategorySection
            onSelectCategory={onCategoryFilter}
            selectedCategory={selectedCategory}
            isCompact={true}
          />
        </div>

        {/* ========================================================= */}
        {/* 4. HERO BANNER CAROUSEL (Closes like a box in Step 2)     */}
        {/* ========================================================= */}
        {heroBanners.length > 0 && (
          <div
            ref={bannerContainerRef}
            style={{
              height: isStuckWithCategory ? 0 : bannerOffset > 0 ? Math.max(0, bannerHeight - bannerOffset) : undefined,
              overflow: "hidden",
            }}
            className="relative z-0"
          >
            <div
              ref={bannerInnerRef}
              style={{
                transform: bannerOffset > 0 ? `translateY(-${bannerOffset}px)` : undefined,
              }}
              className="pt-1 sm:pt-2"
            >
              <BannerCarousel banners={heroBanners} />
            </div>
          </div>
        )}

      </div>
    </header>
    </>
  );
}
