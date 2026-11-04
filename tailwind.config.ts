import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          hover: "var(--brand-hover)",
          light: "var(--brand-light)",
        },
        surface: "var(--surface)",
        background: "var(--background)",
        border: "var(--border)",
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          yellow: "#F59E0B",
          red: "#EF4444",
          green: "#10B981",
          orange: "#F97316",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      maxWidth: {
        container: "var(--container-width)",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 25px -5px rgba(81, 84, 182, 0.15), 0 8px 10px -6px rgba(81, 84, 182, 0.1)",
        dropdown: "0 12px 30px -4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
