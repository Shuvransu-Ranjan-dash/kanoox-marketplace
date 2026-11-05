import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KanooX Marketplace | Caribbean's Premier Online Store",
  description:
    "Shop authentic electronics, fashion, household appliances, dining experiences, and gala tickets with fast doorstep delivery across the Caribbean.",
  keywords: [
    "KanooX",
    "Kanoo marketplace",
    "Bahamas online store",
    "Guyana online store",
    "Trinidad marketplace",
    "Caribbean digital marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col justify-between bg-background text-content-primary">
        <ThemeProvider>
          <CartProvider>
            <CategoryProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
              </div>
            </CategoryProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
