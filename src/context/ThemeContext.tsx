"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CountryTheme, COUNTRIES } from "@/constants/theme";

interface ThemeContextType {
  currentCountry: CountryTheme;
  setCountry: (countryId: string) => void;
  availableCountries: CountryTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to Guyana (GYD) as specified in KanooX plan, or default theme
  const [currentCountry, setCurrentCountry] = useState<CountryTheme>(
    COUNTRIES.find((c) => c.id === "guyana") || COUNTRIES[0]
  );

  useEffect(() => {
    try {
      const savedCountryId = localStorage.getItem("kanoox_country_theme");
      if (savedCountryId) {
        const found = COUNTRIES.find((c) => c.id === savedCountryId);
        if (found) {
          setCurrentCountry(found);
          applyTheme(found.themeClass);
          return;
        }
      }
    } catch {
      // LocalStorage unavailable
    }
    applyTheme(currentCountry.themeClass);
  }, []);

  const applyTheme = (themeClass: string) => {
    if (typeof document !== "undefined") {
      if (themeClass) {
        document.documentElement.setAttribute("data-theme", themeClass);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    }
  };

  const setCountry = (countryId: string) => {
    const selected = COUNTRIES.find((c) => c.id === countryId);
    if (selected) {
      setCurrentCountry(selected);
      applyTheme(selected.themeClass);
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
