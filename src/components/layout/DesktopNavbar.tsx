"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Flame, Zap, ShieldCheck } from "lucide-react";
import navigationData from "@/data/navigation.json";
import MegaMenu from "@/components/layout/MegaMenu";

export default function DesktopNavbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { mainNav } = navigationData;

  return (
    <div className="relative border-b border-border bg-surface hidden md:block">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: Department Dropdown Button */}
          <div className="flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="inline-flex items-center justify-between w-56 px-4 py-2 bg-brand-primary text-white font-medium text-sm rounded-t-md hover:bg-brand-hover transition-colors shadow-sm"
              >
                <div className="flex items-center space-x-2.5">
                  <Menu className="w-4 h-4" />
                  <span className="font-semibold">All Departments</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex items-center space-x-1 lg:space-x-4">
              {mainNav.slice(1).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-medium text-content-primary hover:text-brand-primary transition-colors flex items-center gap-1.5 rounded-md hover:bg-black/5"
                >
                  {item.id === "deals" && <Flame className="w-4 h-4 text-accent-red animate-pulse" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold bg-accent-red text-white px-1.5 py-0.2 rounded-full uppercase">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Fast Delivery / Guarantee badge */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-content-secondary">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fast Doorstep Delivery in Guyana</span>
            </div>
            <div className="flex items-center gap-1.5 text-content-secondary">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              <span>100% Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />
    </div>
  );
}
