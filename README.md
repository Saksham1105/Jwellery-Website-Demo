# 💎 Maison Aurélia — Haute Joaillerie E-Commerce Platform

<div align="center">

![Maison Aurélia Banner](https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600)

**A bespoke, high-luxury digital flagship experience for Parisian fine jewelry & haute joaillerie.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Live Deployment](https://img.shields.io/badge/Live_Demo-Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://jwellery-website-demo.sswaggyiirush.workers.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

### 🔗 **[🌐 Experience the Live Boutique Flagship →](https://jwellery-website-demo.sswaggyiirush.workers.dev)**

[Live Demo](https://jwellery-website-demo.sswaggyiirush.workers.dev) • [Key Features](#-key-features) • [Design System](#-design-system--palette) • [Architecture](#-architecture--project-structure) • [Getting Started](#-getting-started) • [Code Quality](#-code-quality--standards)

</div>

---

## ✨ Overview

**Maison Aurélia** is an ultra-luxury digital boutique designed for high-jewelry ateliers. Emphasizing elegance, craftsmanship, and seamless user interaction, the platform replicates the prestige and intimacy of a private salon visit at Place Vendôme, Paris.

Every detail—from the luminous hero campaign carousel, subtle diamond-shimmer announcement bar, dynamic glassmorphic navigation, to the high-touch bespoke cart drawer and 256-bit SSL simulated checkout—is crafted with precision and restraint.

---

## 🌟 Key Features

### 1. 🎠 Full-Bleed High-Jewelry Campaign Carousel
- Auto-advancing multi-campaign presentation (6-second cycle with hover freeze).
- Smooth crossfade transitions with individualized headlines, subtitles, and CTA buttons.
- Dynamic navigation scrim ensuring high legibility over rich macro photography.
- Pinned trust badges (*GIA-Certified Diamonds*, *Lifetime Atelier Warranty*, *Bespoke Concierge*).

### 2. 🏛️ Dynamic Sticky Header & Rotating Announcement Bar
- **Announcement Strip**: Cycles through luxury service promises with smooth slide-up fade animations and a diamond-facet shimmer sweep.
- **Context-Aware Navigation**: Transitions seamlessly from transparent scrim (over hero photography) to solid ivory (`#FAF8F5`) with charcoal typography upon scrolling.
- **Center-Outward Underlines**: Luxury hover physics on navigation links with expanded tracking.
- **Integrated Live Search**: Full-text instant search dropdown with image previews and real-time category filtering.

### 3. 💍 Signature Creations Catalog & Dynamic Filtering
- Multi-dimensional filtering by Category (*Rings, Necklaces, Earrings, Bracelets*), Metal (*18K Rose Gold, 18K Yellow Gold, Platinum 950*), Gemstone (*Natural Diamond, Royal Blue Sapphire, Colombian Emerald, Pigeon Blood Ruby*), and Price Range.
- Interactive quick-view triggers, wishlist toggling, and multi-angle product inspection.
- Smart badge attribution (*New Creation*, *High Jewelry*, *Rare Gemstone*, *Best Seller*).

### 4. 🔍 Immersive Product Detail Modal
- High-resolution gallery with thumbnail switcher and zoom inspection.
- Material customization (18K Rose Gold, 18K Yellow Gold, Platinum 950) and ring sizing matrix (US 4 to US 10).
- Diamond specifications breakdown (Carat weight, Clarity grade, Color classification, Cut symmetry).
- Direct "Acquire Creation" and "Reserve Atelier Consultation" actions.

### 5. 🛍️ White-Glove Shopping Bag & Wishlist Drawers
- **Sliding Drawers**: Accessible drawer modals with smooth entrance transitions and backdrop blur.
- **White-Glove Progress Bar**: Real-time calculation towards complimentary insured courier dispatch.
- **Signature Gift Packaging**: Complimentary velvet casket, silk ribbon, and personalized handwritten card options.
- **Wishlist Sync**: Persistent wishlist management with one-click "Move to Bag" or "Move All to Bag" actions.

### 6. 🔒 Simulated 256-Bit SSL Atelier Checkout
- Complete multi-step checkout simulation with client address validation and courier protocol selection (*Complimentary Insured Courier* vs. *White-Glove Overnight Armored Delivery*).
- Instant luxury order confirmation receipt with unique atelier dispatch tracking numbers.

### 7. 🛡️ Robust SafeImage Fallback System
- Self-healing image wrapper (`<SafeImage />`) across all cards, modals, and thumbnails.
- Automatic fallback to a minimalist luxury glyph card upon network or CDN failure.
- Soft pulsing skeleton loader (`#ECE6DC animate-pulse`) to prevent layout shifts during asset resolution.

---

## 🎨 Design System & Palette

The design language embodies modern Parisian haute joaillerie: understated ivory foundations, deep charcoal contrasts, and warm rose gold accents.

| Token | Hex Code | Usage |
|---|---|---|
| **Rose Gold (Primary Accent)** | `#B76E79` | CTAs, active states, badges, star ratings, interactive borders |
| **Rose Gold Light Tint** | `#C9828D` / `#F8EFF1` | Hover backgrounds, progress bars, light highlights |
| **Rose Gold Deep Shade** | `#9A535E` | Active pressed states, subtle subtitle text |
| **Ivory Light** | `#FFFDF9` | Card surfaces, modal containers, dropdown panels |
| **Ivory Background** | `#FAF8F5` | Body background, header solid state, drawer panels |
| **Deep Charcoal** | `#1D1B19` | Primary typography, headers, luxury solid buttons |
| **Muted Stone** | `#6D6862` | Secondary descriptions, specification labels |
| **Subtle Border** | `#EAE5DD` | Dividers, card borders, form input outlines |

### Typography
- **Serif Display**: *Playfair Display* / *Cormorant Garamond* (Bespoke luxury headlines, titles, and monogram branding).
- **Sans Serif**: *Inter* / *Cinzel* (Clean, legible body copy, diamond specifications, and navigation).

---

## 🏗️ Architecture & Project Structure

```text
jwellery-website-demo/
├── index.html                   # HTML entry point with Google Fonts & meta tags
├── package.json                 # Project dependencies and build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
└── src/
    ├── main.tsx                 # React application root mount
    ├── App.tsx                  # Master application orchestrator & state container
    ├── index.css                # Tailwind directives, custom keyframes & luxury utilities
    ├── types.ts                 # TypeScript type definitions (Product, CartItem, Order, Filter)
    ├── data/
    │   └── products.ts          # Curated high-jewelry product dataset & campaigns
    └── components/
        ├── AnnouncementBar.tsx  # Rotating service highlights with diamond shimmer
        ├── Header.tsx           # Transparent-to-solid navigation with search dropdown
        ├── Hero.tsx             # Full-bleed campaign crossfade carousel
        ├── FeaturedCollections.tsx # Category showcase grid (Rings, Necklaces, etc.)
        ├── ProductGrid.tsx      # Filterable & sortable signature creations catalog
        ├── ProductCard.tsx      # Individual product card with quick-actions & badges
        ├── ProductDetailModal.tsx # Full-screen bespoke product inspector modal
        ├── BrandStory.tsx       # Place Vendôme atelier heritage showcase
        ├── Testimonials.tsx     # Verified patron testimonials & acquisitions
        ├── Newsletter.tsx       # "The Aurélia Circle" VIP newsletter invitation
        ├── Footer.tsx           # Global footer with brand promises & salon directory
        ├── CartDrawer.tsx       # Slide-out shopping bag with gift wrapping options
        ├── WishlistDrawer.tsx   # Saved pieces collection drawer
        ├── CheckoutModal.tsx    # Multi-step atelier checkout simulation
        ├── SafeImage.tsx        # Resilient image component with placeholder fallback
        └── Toast.tsx            # Global notification system for cart/wishlist feedback
```

---

## 🌐 Live Deployment

The digital boutique is deployed live and globally distributed:

- **Production URL**: [https://jwellery-website-demo.sswaggyiirush.workers.dev](https://jwellery-website-demo.sswaggyiirush.workers.dev)
- **Platform**: Cloudflare Workers / Edge Runtime
- **Status**: 🟢 Active & Production Ready

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saksham1105/Jwellery-Website-Demo.git
   cd Jwellery-Website-Demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Type checking / Lint:**
   ```bash
   npm run lint
   ```

---

## 🧪 Code Quality & Standards

- **Strict TypeScript**: 100% type safety with zero `any` declarations in production components.
- **Production Build Verified**: Fully optimized Vite bundle with zero build or runtime warnings.
- **Accessible & Responsive**: Accessible ARIA roles, high-contrast states, and mobile-first responsive layout (320px to 4K ultra-wide).
- **Reduced Motion Support**: Non-essential animations respect user system accessibility preferences (`prefers-reduced-motion`).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Crafted with passion for haute joaillerie digital experiences. Maison Aurélia © All Rights Reserved.</sub>
</div>
