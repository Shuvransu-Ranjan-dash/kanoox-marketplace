"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CountryTheme, COUNTRIES } from "@/constants/theme";

interface ThemeContextType {
  currentCountry: CountryTheme;
  setCountry: (countryId: string) => void;
  availableCountries: CountryTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.id === "bahamas") || COUNTRIES[0];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to The Bahamas (matching Figma linear gradient: #08495B -> #1BCECB)
  const [currentCountry, setCurrentCountry] = useState<CountryTheme>(DEFAULT_COUNTRY);

  useEffect(() => {
    try {
      const savedCountryId = localStorage.getItem("kanoox_country_theme");
      if (savedCountryId) {
        const found = COUNTRIES.find((c) => c.id === savedCountryId);
        if (found) {
          setCurrentCountry(found);
          applyTheme(found);
          return;
        }
      }
    } catch {
      // LocalStorage unavailable
    }
    // Default to The Bahamas
    setCurrentCountry(DEFAULT_COUNTRY);
    applyTheme(DEFAULT_COUNTRY);
  }, []);

  const applyTheme = (country: CountryTheme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", country.themeClass);
      document.documentElement.style.setProperty("--brand-primary", country.primaryColor);
      document.documentElement.style.setProperty("--header-bg", country.headerGradientCss);
    }
  };

  const setCountry = (countryId: string) => {
    const selected = COUNTRIES.find((c) => c.id === countryId);
    if (selected) {
      setCurrentCountry(selected);
      applyTheme(selected);
      try {
        localStorage.setItem("kanoox_country_theme", countryId);
      } catch {
        // ignore
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentCountry,
        setCountry,
        availableCountries: COUNTRIES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
