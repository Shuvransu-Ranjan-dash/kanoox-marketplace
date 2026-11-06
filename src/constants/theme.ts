export interface CountryTheme {
  id: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  primaryColor: string;
  themeClass: string;
  deliveryCity: string;
  headerGradientCss: string;
  cardBgCss: string;
  cardBorderCss: string;
  searchBgCss: string;
  accentColor: string;
  textMutedColor: string;
}

export const COUNTRIES: CountryTheme[] = [
  {
    id: "bahamas",
    name: "The Bahamas",
    flag: "🇧🇸",
    currency: "BSD",
    currencySymbol: "B$",
    primaryColor: "#08495B",
    themeClass: "bahamas",
    deliveryCity: "Nassau, Bahamas",
    headerGradientCss: "linear-gradient(180deg, #08495B 0%, #1BCECB 100%)",
    cardBgCss: "rgba(255, 255, 255, 0.08)",
    cardBorderCss: "rgba(255, 255, 255, 0.16)",
    searchBgCss: "rgba(255, 255, 255, 0.10)",
    accentColor: "#1BCECB",
    textMutedColor: "#C9F4F3",
  },
  {
    id: "trinidad",
    name: "Trinidad & Tobago",
    flag: "🇹🇹",
    currency: "TTD",
    currencySymbol: "TT$",
    primaryColor: "#D00B5B",
    themeClass: "trinidad",
    deliveryCity: "Port of Spain, Trinidad & Tobago",
    headerGradientCss: "linear-gradient(180deg, #1C0000 0%, #D00B5B 100%)",
    cardBgCss: "rgba(255, 255, 255, 0.08)",
    cardBorderCss: "rgba(255, 255, 255, 0.16)",
    searchBgCss: "rgba(255, 255, 255, 0.10)",
    accentColor: "#D00B5B",
    textMutedColor: "#FCD8E6",
  },
  {
    id: "jamaica",
    name: "Jamaica",
    flag: "🇯🇲",
    currency: "JMD",
    currencySymbol: "J$",
    primaryColor: "#0D2102",
    themeClass: "jamaica",
    deliveryCity: "Kingston, Jamaica",
    headerGradientCss: "linear-gradient(180deg, #0D2102 0%, #D2EDF4 100%)",
    cardBgCss: "rgba(255, 255, 255, 0.08)",
    cardBorderCss: "rgba(255, 255, 255, 0.16)",
    searchBgCss: "rgba(255, 255, 255, 0.10)",
    accentColor: "#15803D",
    textMutedColor: "#D2EDF4",
  },
  {
    id: "guyana",
    name: "Guyana",
    flag: "🇬🇾",
    currency: "GYD",
    currencySymbol: "GYD $",
    primaryColor: "#C60BD0",
    themeClass: "guyana",
    deliveryCity: "Georgetown, Guyana",
    headerGradientCss: "linear-gradient(180deg, #220032 0%, #C60BD0 100%)",
    cardBgCss: "rgba(255, 255, 255, 0.08)",
    cardBorderCss: "rgba(255, 255, 255, 0.16)",
    searchBgCss: "rgba(255, 255, 255, 0.10)",
    accentColor: "#C60BD0",
    textMutedColor: "#F5CEF8",
  },
];
