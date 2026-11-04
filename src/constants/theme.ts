export interface CountryTheme {
  id: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  primaryColor: string;
  themeClass: string;
}

export const COUNTRIES: CountryTheme[] = [
  {
    id: "default",
    name: "Global / Default",
    flag: "🌐",
    currency: "USD",
    currencySymbol: "$",
    primaryColor: "#5154b6",
    themeClass: "",
  },
  {
    id: "guyana",
    name: "Guyana",
    flag: "🇬🇾",
    currency: "GYD",
    currencySymbol: "GYD $",
    primaryColor: "#059669",
    themeClass: "guyana",
  },
  {
    id: "suriname",
    name: "Suriname",
    flag: "🇸🇷",
    currency: "SRD",
    currencySymbol: "SRD $",
    primaryColor: "#dc2626",
    themeClass: "suriname",
  },
  {
    id: "barbados",
    name: "Barbados",
    flag: "🇧🇧",
    currency: "BBD",
    currencySymbol: "Bds$",
    primaryColor: "#1d4ed8",
    themeClass: "barbados",
  },
];
