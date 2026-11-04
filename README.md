# KanooX Marketplace – Frontend Implementation

A modern, high-performance customer-facing e-commerce homepage for **KanooX Marketplace** built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Project Overview & Architecture

This application is built with a clean **Layered Architecture** strictly separating data and business logic from UI presentation:

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                      │
│      Next.js App Router · Reusable Components · Layout      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      Application Layer                      │
│     Custom Hooks · CartContext · ThemeContext · State Mgmt   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                        Service Layer                        │
│    product.service.ts · category.service.ts · banner.service│
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                         Data Layer                          │
│     products.json · categories.json · banners.json · nav    │
└─────────────────────────────────────────────────────────────┘
```

> **Why this matters for technical review**: The presentation components never directly access raw JSON or hardcode product data. If KanooX provisions live REST or GraphQL backend endpoints, only the files in `src/services/` need updating without touching any UI component.

---

## 2. Complete Project Directory Structure

```
kanoox-marketplace/
│
├── public/
│   ├── images/
│   │   ├── banners/
│   │   ├── products/
│   │   ├── categories/
│   │   └── logos/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with Theme & Cart providers
│   │   ├── page.tsx                  # Homepage assembly
│   │   ├── globals.css               # Design tokens & country CSS variables
│   │   └── not-found.tsx             # Branded 404 handler
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx            # Multi-variant, loading-state button
│   │   │   ├── IconButton.tsx        # Action icon buttons with badge counts
│   │   │   ├── Badge.tsx             # Status, discount, and highlight badges
│   │   │   ├── Container.tsx         # 1280px max-width standardized wrapper
│   │   │   ├── SectionHeading.tsx    # Section titles with badges and action CTAs
│   │   │   └── Loader.tsx            # Skeleton loaders & spinner
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Top utility bar, logo, live search, cart trigger
│   │   │   ├── DesktopNavbar.tsx     # Department button & main nav links
│   │   │   ├── MobileHeader.tsx      # Mobile hamburger drawer & quick action icons
│   │   │   ├── MegaMenu.tsx          # Multi-column department browser & promo spotlight
│   │   │   ├── CartDrawer.tsx        # Slide-over interactive shopping cart drawer
│   │   │   └── Footer.tsx            # Value props, department links, newsletter, payment badges
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Carousel + dual promo spotlight cards
│   │   │   ├── BannerCarousel.tsx    # Auto-play hero carousel with controls & dots
│   │   │   ├── CategorySection.tsx   # Department icons & item count badges
│   │   │   ├── FeaturedProducts.tsx  # Featured 4-column responsive product grid
│   │   │   ├── PopularProducts.tsx   # Best sellers horizontal product carousel
│   │   │   └── PromotionalSection.tsx# Apple M3 & Smart Living dual promo banners
│   │   │
│   │   └── product/
│   │       ├── ProductCard.tsx       # Reusable card with hover preview, wishlist & add-to-cart
│   │       ├── ProductGrid.tsx       # Responsive multi-column grid (2-5 cols)
│   │       ├── ProductCarousel.tsx   # Smooth-scrolling horizontal product carousel
│   │       └── ProductPrice.tsx      # Formatted price, strikethrough original & currency switcher
│   │
│   ├── data/
│   │   ├── products.json             # Mock product catalog with GYD currency & specs
│   │   ├── categories.json           # Catalog departments and subcategories
│   │   ├── banners.json              # Hero slides & promo banner configurations
│   │   └── navigation.json           # Nav menus, mega menu tree, footer columns
│   │
│   ├── services/
│   │   ├── product.service.ts        # getProducts, getFeatured, getPopular, searchProducts
│   │   ├── category.service.ts       # getCategories, getFeaturedCategories
│   │   └── banner.service.ts         # getHeroBanners, getPromoBanners
│   │
│   ├── hooks/
│   │   ├── useProducts.ts            # Client-side product filtering & search
│   │   ├── useCart.ts                # Cart consumer hook
│   │   └── useFavourites.ts          # LocalStorage persistent wishlist hook
│   │
│   ├── context/
│   │   ├── CartContext.tsx           # Cart state, item quantities, drawer visibility
│   │   └── ThemeContext.tsx          # Country & currency switcher with CSS variables
│   │
│   ├── types/
│   │   ├── product.ts                # Product TypeScript contract
│   │   ├── category.ts               # Category & SubCategory interfaces
│   │   ├── banner.ts                 # HeroBanner & PromoBanner types
│   │   └── navigation.ts             # Navigation & MegaMenu structures
│   │
│   ├── constants/
│   │   ├── routes.ts                 # Centralized route strings
│   │   └── theme.ts                  # Supported country themes & currencies
│   │
│   └── utils/
│       ├── formatPrice.ts            # GYD currency formatter with symbol handling
│       └── helpers.ts                # cn (classnames helper), truncateText, getStarRating
│
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Features Implemented

1. **Header & Navigation**:
   - Top utility bar with telephone helpline, Guyana delivery notice, track order, and country switcher.
   - Interactive live search with category filter and instant dropdown results.
   - Account trigger, wishlist icon with badge count, and shopping cart totalizer.
2. **Mega Menu**:
   - Multi-column category tree organized by departments (Electronics, Appliances, Fashion).
   - Category sub-sections with "NEW" badges.
   - Featured product spotlight card directly embedded in the dropdown.
3. **Hero & Banner Carousel**:
   - Auto-playing carousel with 5-second interval and hover pause.
   - Previous/Next controls, active slide indicators, and high-impact typography.
   - Adjacent dual spotlight cards on large screens.
4. **Category Section**:
   - 8-column department browser featuring high-resolution icons and total inventory count.
5. **Product Display Components**:
   - `ProductCard`: High-fidelity card featuring hover preview image, discount badge, star ratings, and review counts.
   - `ProductGrid`: Responsive 4-column desktop / 2-column mobile grid.
   - `ProductCarousel`: Horizontal touch-scrollable product carousel with arrow controls.
6. **Cart Drawer**:
   - Global slide-out panel with item image, quantity increment/decrement, item deletion, subtotal calculation, and checkout CTA.
7. **Country-Wise Theme Switching (Bonus)**:
   - Dynamic theme selector supporting **Guyana (GYD)**, **Suriname (SRD)**, **Barbados (BBD)**, and **Global (USD)**.
   - Switches primary brand colors and prices across the entire application instantly via CSS variables without layout shifts.

---

## 4. Getting Started

### Prerequisites
- Node.js >= 18.x (tested on v22.13.0)
- npm >= 9.x

### Installation & Local Run
```bash
# Clone the repository
git clone <repository-url>
cd kanoox-marketplace

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Technical Review & Live Modification Guide

During the technical review with Vishal, here is how each common modification request can be completed in seconds:

### A. Adding a New Product to Featured Section
1. Open `src/data/products.json`.
2. Add a new product object with `"isFeatured": true`:
   ```json
   {
     "id": "prod-013",
     "name": "New Gaming Headset",
     "price": 19500,
     "currency": "GYD",
     "rating": 5.0,
     "reviewCount": 12,
     "image": "https://images.unsplash.com/photo-...",
     "categoryId": "electronics",
     "categoryName": "Consumer Electronics",
     "isFeatured": true,
     "inStock": true
   }
   ```
3. Refresh the page: the item immediately appears in the Featured Products grid.

### B. Changing the Primary Brand Theme Color
1. Open `src/app/globals.css`.
2. Modify `--brand-primary`:
   ```css
   :root {
     --brand-primary: #0284c7; /* Switch from Indigo to Sky Blue */
   }
   ```
3. All buttons, headers, prices, and focus outlines update automatically across the site.

### C. Adding a New Department / Category
1. Open `src/data/categories.json` and append a new category.
2. The category immediately renders in `CategorySection.tsx`, the search category dropdown, and the mobile navigation drawer.

### D. Modifying the Product Grid Columns
1. In `src/components/home/FeaturedProducts.tsx`, update the `columns` prop:
   ```tsx
   <ProductGrid products={products} columns={3} />
   ```
