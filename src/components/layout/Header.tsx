"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronDown, 
  X, 
  Check
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { formatPrice } from "@/utils/formatPrice";
import { searchProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import KanooLogo from "@/components/ui/KanooLogo";
import CountryFlag from "@/components/ui/CountryFlag";
import CategorySection from "@/components/home/CategorySection";
import BannerCarousel from "@/components/home/BannerCarousel";
import FashionSubNav from "@/components/fashion/FashionSubNav";
import PopularBrands from "@/components/fashion/PopularBrands";
import { HeroBanner } from "@/types/banner";
import fashionData from "@/data/fashion.json";
import countryContent from "@/data/country-content.json";
import { useCategory } from "@/context/CategoryContext";

type CountryContentKey = keyof typeof countryContent;

interface HeaderProps {
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
  onCategoryFilter, 
  selectedCategory: propSelectedCategory 
}: HeaderProps) {
  const { currentCountry, setCountry, availableCountries } = useTheme();
  const { selectedCategory: contextCategory, setSelectedCategory, clearCategory, fashionSubTab } = useCategory();

  const selectedCategory = propSelectedCategory !== undefined ? propSelectedCategory : contextCategory;
  const isFashion = selectedCategory === "fashion";
  const activeFashionTab = (fashionSubTab || "men").toLowerCase();

  const handleHomeClick = (e: React.MouseEvent) => {
    clearCategory();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dynamic Header Background:
  // - Kids: Vibrant watercolor splash background texture (/Fashion/Kids/KidsBG.png) matching reference
  // - Women: Linear Gradient from #370051 to #B61BCE matching Figma
  // - Men: Linear Gradient from #181822 to #424139 matching Figma
  // - Default: Country theme gradient
  let headerGradientCss = currentCountry.headerGradientCss;

  if (isFashion) {
    if (activeFashionTab === "kids") {
      headerGradientCss = "url('/Fashion/Kids/KidsBG.png') center / cover no-repeat, linear-gradient(180deg, #4A0E4E 0%, #831843 50%, #0D9488 100%)";
    } else if (activeFashionTab === "women") {
      headerGradientCss = "linear-gradient(180deg, #370051 0%, #B61BCE 100%)";
    } else {
      headerGradientCss = "linear-gradient(180deg, #181822 0%, #424139 100%)";
    }
  }

  const searchBgCss = isFashion
    ? activeFashionTab === "kids"
      ? "rgba(255, 255, 255, 0.18)"
      : activeFashionTab === "women"
      ? "rgba(255, 255, 255, 0.16)"
      : "rgba(255, 255, 255, 0.12)"
    : currentCountry.searchBgCss;

  const cardBorderCss = isFashion
    ? activeFashionTab === "kids"
      ? "rgba(255, 255, 255, 0.28)"
      : activeFashionTab === "women"
      ? "rgba(255, 255, 255, 0.24)"
      : "rgba(255, 255, 255, 0.18)"
    : currentCountry.cardBorderCss;

  // Distinct background for the separated Popular Brands card (Figma Rectangle 20927)
  let popularBrandsBgCss = "linear-gradient(180deg, #1E1E24 0%, #15151A 100%)";
  if (isFashion) {
    if (activeFashionTab === "women") {
      popularBrandsBgCss = "linear-gradient(180deg, #370051 0%, #B61BCE 100%)";
    } else if (activeFashionTab === "kids") {
      popularBrandsBgCss = "linear-gradient(180deg, #240C38 0%, #3D1154 100%)";
    } else {
      popularBrandsBgCss = "linear-gradient(180deg, #1E1E24 0%, #15151A 100%)";
    }
  }

  // Source hero banners from country-specific content (replaces static banners.json)
  const countryId = currentCountry.id as CountryContentKey;
  const countryData = countryContent[countryId] ?? countryContent["bahamas"];
  const countryHeroBanners = countryData.heroBanners as unknown as HeroBanner[];

  let displayedBanners = countryHeroBanners;
  if (isFashion) {
    if (activeFashionTab === "kids") {
      displayedBanners = fashionData.kidsHeroBanners as unknown as HeroBanner[];
    } else if (activeFashionTab === "women") {
      displayedBanners = fashionData.womenHeroBanners as unknown as HeroBanner[];
    } else {
      displayedBanners = fashionData.menHeroBanners as unknown as HeroBanner[];
    }
  }

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
  const categoryRef = useRef<HTMLDivElement>(null);
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const bannerInnerRef = useRef<HTMLDivElement>(null);

  // Dynamic heights (with robust responsive defaults)
  const [topBarHeight, setTopBarHeight] = useState(50);
  const [searchHeight, setSearchHeight] = useState(58);
  const [bannerHeight, setBannerHeight] = useState(260);
  const [categoryHeight, setCategoryHeight] = useState(86);
  const [fashionNavHeight, setFashionNavHeight] = useState(0);
  const [popularBrandsHeight, setPopularBrandsHeight] = useState(130);
  const [spacerHeight, setSpacerHeight] = useState(480);

  const fashionNavRef = useRef<HTMLDivElement>(null);
  const popularBrandsContainerRef = useRef<HTMLDivElement>(null);
  const popularBrandsInnerRef = useRef<HTMLDivElement>(null);

  // Measure natural heights on mount, resize, and responsive mode toggle
  useEffect(() => {
    const measure = () => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      
      let tbH = topBarRef.current?.offsetHeight || 0;
      let sH = searchRef.current?.offsetHeight || 0;
      let bH = bannerInnerRef.current?.offsetHeight || 0;
      let cH = categoryRef.current?.offsetHeight || 0;
      let fnH = fashionNavRef.current?.offsetHeight || 0;
      let pbH = popularBrandsInnerRef.current?.offsetHeight || 0;

      // Responsive fallbacks if not rendered yet
      if (tbH <= 0) tbH = isMobile ? 44 : 54;
      if (sH <= 0) sH = isMobile ? 56 : 60;
      if (bH <= 0) bH = isMobile ? 260 : 380;
      if (cH <= 0) cH = isMobile ? 86 : 106;
      if (isFashion && pbH <= 0) pbH = isMobile ? 120 : 135;

      setTopBarHeight(tbH);
      setSearchHeight(sH);
      setBannerHeight(bH);
      setCategoryHeight(cH);
      setFashionNavHeight(fnH);
      setPopularBrandsHeight(pbH);

      // Header container vertical padding:
      // Mobile: pt-3.5 (14px) + pb-4 (16px) = 30px
      // Desktop: pt-4 (16px) + pb-6 (24px) = 40px
      const padH = isMobile ? 30 : 40;

      // Total resting header height is ALWAYS the sum of its natural parts!
      // This works reliably whether window.scrollY is 0 or scrolled!
      const overlapH = isFashion ? (isMobile ? 12 : 16) : 0;
      const totalNaturalHeight = tbH + sH + cH + bH + fnH + (isFashion ? pbH - overlapH : 0) + padH;
      setSpacerHeight(totalNaturalHeight);
    };

    measure();

    // Track viewport resize & DevTools responsive mode changes
    window.addEventListener("resize", measure);

    // ResizeObserver on body to detect responsive layout shifts immediately
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      ro = new ResizeObserver(() => {
        measure();
      });
      ro.observe(document.body);
    }

    const timer1 = setTimeout(measure, 100);
    const timer2 = setTimeout(measure, 350);

    return () => {
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isFashion]);

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

  let bannerOffset = 0;
  let searchOffset = 0;
  let searchOpacity = 1;
  let popularBrandsOffset = 0;
  let categoryScrollOffset = 0;
  let isCompactHeader = false;

  if (isFashion) {
    // =========================================================
    // FASHION MODE SCROLL PHASES (Matching Images 1, 2, and 3):
    // 1. Search slides up after Top Bar
    const searchScroll = Math.max(0, scrollY - topBarHeight);
    searchOffset = Math.min(searchHeight, searchScroll);
    searchOpacity = Math.max(0, 1 - (searchOffset / Math.max(1, searchHeight)) * 1.5);

    // 2. Hero Banner collapses after Search
    const bannerScroll = Math.max(0, scrollY - (topBarHeight + searchHeight));
    bannerOffset = Math.min(bannerHeight, bannerScroll);

    // 3. Popular Brands collapses after Banner
    const pbScroll = Math.max(0, scrollY - (topBarHeight + searchHeight + bannerHeight));
    popularBrandsOffset = Math.min(popularBrandsHeight, pbScroll);

    // Once hero banner & popular brands close, we reach Image 2 state (Categories + Men/Women stuck!)
    const isPastHeroAndBrands = popularBrandsOffset >= popularBrandsHeight;
    isCompactHeader = isPastHeroAndBrands;

    // 4. As user scrolls further down into products, Category section slides up and hides,
    // leaving the Men/Women subnav section pinned firmly at top: 0!
    const catScroll = Math.max(0, scrollY - (topBarHeight + searchHeight + bannerHeight + popularBrandsHeight + 50));
    categoryScrollOffset = Math.min(categoryHeight, catScroll);
  } else {
    // =========================================================
    // DEFAULT HOMEPAGE SCROLL PHASES:
    const bannerScroll = Math.max(0, scrollY - topBarHeight);
    bannerOffset = Math.min(bannerHeight, bannerScroll);

    const searchScroll = Math.max(0, scrollY - (topBarHeight + bannerHeight));
    searchOffset = Math.min(searchHeight, searchScroll);
    searchOpacity = Math.max(0, 1 - (searchOffset / Math.max(1, searchHeight)) * 1.5);

    isCompactHeader = searchOffset >= searchHeight;
  }

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
        style={
          isFashion
            ? { background: "transparent" }
            : { background: headerGradientCss }
        }
        className={`w-full text-white select-none fixed top-0 left-0 right-0 z-40 transition-shadow ${
          !isFashion
            ? isCompactHeader
              ? "pt-2 pb-2.5 sm:pb-3 rounded-b-2xl sm:rounded-b-3xl shadow-2xl border-b border-white/10"
              : "pt-3.5 sm:pt-4 pb-4 sm:pb-6 rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-2xl"
            : ""
        }`}
      >
        {/* UPPER CARD (Figma Rectangle 20926): Holds TopBar, Search, Categories, Banner & SubNav */}
        <div
          style={isFashion ? { background: headerGradientCss } : undefined}
          className={
            isFashion
              ? `w-full text-white shadow-xl shadow-black/25 relative z-20 overflow-hidden ${
                  isCompactHeader
                    ? "pt-2 pb-2 sm:pb-2.5 rounded-b-[20px] sm:rounded-b-[24px] border-b border-white/10"
                    : "pt-3.5 sm:pt-4 pb-2.5 sm:pb-3.5 rounded-b-[20px] sm:rounded-b-[24px]"
                }`
              : ""
          }
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
              {/* Left: User Avatar (James Lowe) & Verification Badge */}
              <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0 flex-shrink">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 shadow-sm flex-shrink-0 bg-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="James Lowe"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="leading-tight min-w-0">
                  <h1 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1 truncate">
                    James Lowe
                  </h1>
                  <p
                    style={{ color: currentCountry.textMutedColor }}
                    className="text-[10px] sm:text-[11px] font-medium flex items-center gap-1 truncate"
                  >
                    <span className="truncate">Level 1 Verified</span>
                  </p>
                </div>
              </div>

              {/* Center: Kanoo Folded Ribbon 'X' Logo */}
              <Link
                href="/"
                onClick={handleHomeClick}
                className="flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 px-1"
                aria-label="Kanoo Home"
              >
                <KanooLogo className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 drop-shadow-md" />
              </Link>

              {/* Right: Quick Action Controls (Combined [Home + Location] Pill & Standalone Notification Bell) */}
              <div className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
                {/* Combined Pill Container: Home & Location Pin */}
                <div
                  style={{
                    backgroundColor: searchBgCss,
                    borderColor: cardBorderCss,
                  }}
                  className="h-9 sm:h-10 px-3 sm:px-3.5 border rounded-2xl flex items-center gap-3 sm:gap-3.5 shadow-sm"
                >
                  {/* Home Action */}
                  <Link
                    href="/"
                    onClick={handleHomeClick}
                    title="Home"
                    className="flex items-center justify-center text-white/90 hover:text-white transition-opacity active:scale-95 cursor-pointer"
                  >
                    <Image
                      src="/icons/home.png"
                      alt="Home"
                      width={20}
                      height={20}
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain brightness-0 invert opacity-95"
                      priority
                    />
                  </Link>

                  {/* Location Pin Action */}
                  <button
                    type="button"
                    onClick={() => setIsCountryModalOpen(true)}
                    title={`Location: ${currentCountry.deliveryCity}`}
                    className="flex items-center justify-center text-white/90 hover:text-white transition-opacity active:scale-95 cursor-pointer"
                    aria-label="Location Settings"
                  >
                    <Image
                      src="/icons/location.png"
                      alt="Location"
                      width={20}
                      height={20}
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain"
                      priority
                    />
                  </button>
                </div>

                {/* Standalone Notification Bell with Red Dot */}
                <button
                  type="button"
                  onClick={() => setHasUnreadNotification(!hasUnreadNotification)}
                  className="relative p-1.5 text-white/90 hover:text-white transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                  aria-label="Notifications"
                >
                  <Image
                    src="/icons/notification.png"
                    alt="Notifications"
                    width={22}
                    height={22}
                    className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain"
                    priority
                  />
                  {hasUnreadNotification && (
                    <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#FF2D20] rounded-full ring-2 ring-black/50 shadow-sm" />
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
                style={{ backgroundColor: searchBgCss, borderColor: cardBorderCss }}
                className="flex items-center h-12 border rounded-2xl px-3.5 shadow-inner transition-all relative overflow-hidden"
              >
                {/* Search Magnifier Icon */}
                <Image
                  src="/icons/Search.png"
                  alt="Search"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain mr-2.5 flex-shrink-0 z-20 opacity-80"
                  priority
                />

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
                  className={`p-1.5 rounded-full transition-all z-20 flex items-center justify-center ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "opacity-80 hover:opacity-100 hover:bg-white/10"
                  }`}
                  title={isListening ? "Listening... (Speak now)" : "Voice Search"}
                  aria-label="Voice Search"
                >
                  <Image
                    src="/icons/Microphone.png"
                    alt="Voice Search"
                    width={18}
                    height={18}
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain"
                    priority
                  />
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
                style={{ backgroundColor: searchBgCss, borderColor: cardBorderCss }}
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
        {/* 3. 3D CATEGORIES ROW                                       */}
        {/* ========================================================= */}
        <div
          ref={categoryRef}
          style={{
            marginTop: isFashion && categoryScrollOffset > 0 ? -categoryScrollOffset : undefined,
            opacity: isFashion && categoryScrollOffset > 0 ? Math.max(0, 1 - (categoryScrollOffset / Math.max(1, categoryHeight)) * 1.5) : 1,
            overflow: isFashion && categoryScrollOffset > 0 ? "hidden" : "visible",
          }}
          className="relative z-20 pb-1 sm:pb-1.5"
        >
          <CategorySection
            onSelectCategory={onCategoryFilter}
            selectedCategory={selectedCategory || undefined}
            isCompact={true}
          />
        </div>

        {/* ========================================================= */}
        {/* 4. HERO BANNER CAROUSEL (Closes like a box on scroll)     */}
        {/* ========================================================= */}
        {displayedBanners.length > 0 && (
          <div
            ref={bannerContainerRef}
            style={{
              height: isCompactHeader && (!isFashion || bannerOffset >= bannerHeight)
                ? 0
                : bannerOffset > 0
                ? Math.max(0, bannerHeight - bannerOffset)
                : undefined,
              opacity: bannerOffset > 0 ? Math.max(0, 1 - (bannerOffset / Math.max(1, bannerHeight)) * 1.5) : 1,
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
              <BannerCarousel banners={displayedBanners} />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. FASHION SUB-NAVIGATION TABS (Men, Women, Kids, Shoes...) */}
        {/* ========================================================= */}
        {isFashion && (
          <div ref={fashionNavRef} className="relative z-20 pt-1 pb-1">
            <FashionSubNav />
          </div>
        )}

          </div>
        </div>

        {/* ========================================================= */}
        {/* LOWER CARD (Figma Rectangle 20927): Separated Popular Brands */}
        {/* ========================================================= */}
        {isFashion && (
          <div
            ref={popularBrandsContainerRef}
            style={{
              height: isCompactHeader && popularBrandsOffset >= popularBrandsHeight
                ? 0
                : popularBrandsOffset > 0
                ? Math.max(0, popularBrandsHeight - popularBrandsOffset)
                : undefined,
              opacity: popularBrandsOffset > 0
                ? Math.max(0, 1 - (popularBrandsOffset / Math.max(1, popularBrandsHeight)) * 1.5)
                : 1,
              overflow: "hidden",
            }}
            className="w-full relative z-10 -mt-3.5 sm:-mt-4"
          >
            <div
              ref={popularBrandsInnerRef}
              style={{ background: popularBrandsBgCss }}
              className="w-full text-white rounded-b-[20px] sm:rounded-b-[24px] shadow-2xl shadow-black/35 pt-4 pb-2.5 sm:pt-5 sm:pb-3"
            >
              <div className="w-full max-w-[1440px] 2xl:max-w-[1560px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
                <PopularBrands />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
