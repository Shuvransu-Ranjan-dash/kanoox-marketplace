import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KanooX Marketplace | Guyana's Premier Online Store",
  description:
    "Shop authentic electronics, laptops, home appliances, fashion, and pantry groceries with fast doorstep delivery across Guyana and the Caribbean.",
  keywords: [
    "KanooX",
    "Guyana marketplace",
    "online shopping Guyana",
    "electronics Georgetown",
    "home appliances",
    "GYD currency store",
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
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
