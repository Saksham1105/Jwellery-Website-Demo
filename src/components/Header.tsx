import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { ProductCategory } from '../types';
import { AnnouncementBar } from './AnnouncementBar';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onNavigateToSection: (sectionId: string) => void;
}

const BRAND_NAME = 'MAISON AURÉLIA';

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onSearchChange,
  searchQuery,
  onNavigateToSection,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Badge pop animation triggers
  const [cartPopped, setCartPopped] = useState(false);
  const [wishlistPopped, setWishlistPopped] = useState(false);
  const prevCartCountRef = useRef(cartCount);
  const prevWishlistCountRef = useRef(wishlistCount);

  // Scroll listener for compact sticky state (> 80px)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge on item addition
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setCartPopped(true);
      const timer = setTimeout(() => setCartPopped(false), 600);
      prevCartCountRef.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  // Animate wishlist badge on item addition
  useEffect(() => {
    if (wishlistCount > prevWishlistCountRef.current) {
      setWishlistPopped(true);
      const timer = setTimeout(() => setWishlistPopped(false), 600);
      prevWishlistCountRef.current = wishlistCount;
      return () => clearTimeout(timer);
    }
    prevWishlistCountRef.current = wishlistCount;
  }, [wishlistCount]);

  const navLinks: { label: string; category?: ProductCategory; sectionId?: string }[] = [
    { label: 'Rings', category: 'rings' },
    { label: 'Necklaces', category: 'necklaces' },
    { label: 'Earrings', category: 'earrings' },
    { label: 'Bracelets', category: 'bracelets' },
    { label: 'Atelier & Heritage', sectionId: 'about' },
  ];

  return (
    <>
      {/* Top Luxury Animated Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Header with permanent contrast scrim for transparent state */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 -mb-20 sm:-mb-24 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#EAE5DD]/80 shadow-[0_4px_24px_-4px_rgba(29,27,25,0.06)]'
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        {/* Soft Dark Gradient Scrim (active only in transparent state) for guaranteed contrast over light photos */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-32 sm:h-36 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out ${
            isScrolled ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
              isScrolled ? 'h-16 sm:h-18' : 'h-20 sm:h-24'
            }`}
          >
            {/* Left Nav (Desktop) */}
            <nav id="desktop-navigation" aria-label="Main Navigation" className="hidden lg:flex items-center space-x-8">
              {navLinks.map((item) => {
                const isActive = item.category && activeCategory === item.category;
                return (
                  <button
                    key={item.label}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      if (item.category) {
                        onSelectCategory(item.category);
                        onNavigateToSection('catalog');
                      } else if (item.sectionId) {
                        onNavigateToSection(item.sectionId);
                      }
                    }}
                    className={`group text-xs uppercase py-1.5 relative transition-all duration-250 cursor-pointer ${
                      isActive
                        ? 'text-[#B76E79] font-medium tracking-[0.18em]'
                        : isScrolled
                        ? 'text-[#1D1B19] hover:text-[#B76E79] tracking-[0.18em] hover:tracking-[0.22em]'
                        : 'text-[#FAF8F5] hover:text-[#B76E79] tracking-[0.18em] hover:tracking-[0.22em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    <span className="transition-colors duration-500 ease-in-out">{item.label}</span>
                    {/* Center-outward growing underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B76E79] transition-transform duration-300 ease-out origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 hover:text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
                isScrolled ? 'text-[#1D1B19]' : 'text-[#FAF8F5] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Center Brand Identity with Staggered Entrance & Unified Color/Scale Transition */}
            <div className="flex-1 lg:flex-none text-center">
              <button
                id="brand-logo"
                onClick={() => {
                  onSelectCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex flex-col items-center cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02]"
              >
                {/* Letter-by-letter entrance & Color Transition */}
                <span
                  className={`font-serif tracking-[0.22em] uppercase font-light transition-all duration-500 ease-in-out group-hover:text-[#B76E79] ${
                    isScrolled
                      ? 'text-[#1D1B19] text-xl sm:text-2xl'
                      : 'text-[#FAF8F5] text-2xl sm:text-3xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]'
                  }`}
                >
                  {BRAND_NAME.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-letter-entrance motion-reduce:animate-none"
                      style={{ animationDelay: `${index * 32}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span
                  className={`tracking-[0.38em] uppercase -mt-0.5 group-hover:text-[#9A535E] transition-all duration-500 ease-in-out animate-tagline-entrance motion-reduce:animate-none ${
                    isScrolled
                      ? 'text-[#6D6862] text-[8px] opacity-90'
                      : 'text-[#FAF8F5]/90 text-[9px] opacity-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  Haute Joaillerie • Paris
                </span>
              </button>
            </div>

            {/* Right Action Icons with Scroll Color Inversion and Hover Scale */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button
                id="header-search-toggle"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 hover:text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer ${
                  isSearchOpen
                    ? 'text-[#B76E79]'
                    : isScrolled
                    ? 'text-[#1D1B19]'
                    : 'text-[#FAF8F5] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                }`}
                aria-label="Search Catalog"
                title="Search pieces"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist Button */}
              <button
                id="header-wishlist-button"
                onClick={onOpenWishlist}
                className={`p-2 hover:text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer ${
                  isScrolled ? 'text-[#1D1B19]' : 'text-[#FAF8F5] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                }`}
                aria-label="View Wishlist"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <div className="absolute top-1 right-1 pointer-events-none">
                    {wishlistPopped && (
                      <span className="absolute inset-0 rounded-full bg-[#B76E79] animate-badge-ring motion-reduce:hidden" />
                    )}
                    <span
                      id="wishlist-badge-count"
                      className={`relative bg-[#B76E79] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none shadow-xs ${
                        wishlistPopped ? 'animate-badge-pop motion-reduce:animate-none' : ''
                      }`}
                    >
                      {wishlistCount}
                    </span>
                  </div>
                )}
              </button>

              {/* Cart Button */}
              <button
                id="header-cart-button"
                onClick={onOpenCart}
                className={`p-2 hover:text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 relative flex items-center gap-2 cursor-pointer ${
                  isScrolled ? 'text-[#1D1B19]' : 'text-[#FAF8F5] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                }`}
                aria-label="View Shopping Cart"
                title="Your Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <div className="absolute top-1 right-1 pointer-events-none">
                    {cartPopped && (
                      <span className="absolute inset-0 rounded-full bg-[#B76E79] animate-badge-ring motion-reduce:hidden" />
                    )}
                    <span
                      id="cart-badge-count"
                      className={`relative bg-[#B76E79] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none shadow-xs ${
                        cartPopped ? 'animate-badge-pop motion-reduce:animate-none' : ''
                      }`}
                    >
                      {cartCount}
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Drawer / Bar with Smooth Height/Opacity Transition */}
          <div
            id="search-bar-container"
            className={`overflow-hidden transition-all duration-350 ease-out ${
              isSearchOpen
                ? `max-h-24 opacity-100 py-3 sm:py-4 border-t ${
                    isScrolled
                      ? 'border-[#EAE5DD]'
                      : 'border-[#3E3A36]/60 bg-[#1D1B19]/80 backdrop-blur-md px-4 rounded-sm'
                  }`
                : 'max-h-0 opacity-0 py-0 pointer-events-none border-t-0'
            }`}
          >
            <div className="max-w-2xl mx-auto relative flex items-center">
              <Search className={`absolute left-4 w-4 h-4 ${isScrolled ? 'text-[#6D6862]' : 'text-[#FAF8F5]/60'}`} />
              <input
                id="search-input-field"
                type="text"
                placeholder="Search solitaire rings, pearl necklaces, 18k tennis bracelets..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (e.target.value) {
                    onNavigateToSection('catalog');
                  }
                }}
                className={`w-full border focus:border-[#B76E79] focus:outline-none pl-11 pr-10 py-2.5 sm:py-3 text-sm tracking-wide rounded-none transition-colors ${
                  isScrolled
                    ? 'bg-[#FFFDF9] border-[#D9D2C7] text-[#1D1B19] placeholder:text-[#9C948B]'
                    : 'bg-[#262422]/90 border-[#3E3A36] text-[#FAF8F5] placeholder:text-[#FAF8F5]/50'
                }`}
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className={`absolute right-3 text-xs uppercase tracking-wider px-2 py-1 cursor-pointer ${
                    isScrolled ? 'text-[#6D6862] hover:text-[#1D1B19]' : 'text-[#FAF8F5]/70 hover:text-white'
                  }`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="lg:hidden bg-[#1D1B19]/95 text-[#FAF8F5] border-b border-[#3E3A36] px-6 py-8 space-y-6 backdrop-blur-md animate-fadeIn"
          >
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#B76E79]">High Jewelry Categories</p>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  id={`mobile-nav-${item.label.toLowerCase()}`}
                  onClick={() => {
                    if (item.category) {
                      onSelectCategory(item.category);
                      onNavigateToSection('catalog');
                    } else if (item.sectionId) {
                      onNavigateToSection(item.sectionId);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left font-serif text-xl tracking-wider text-[#FAF8F5] hover:text-[#B76E79] transition-colors py-1 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-[#3E3A36] text-xs text-[#FAF8F5]/70 space-y-2">
              <p>Place Vendôme • Madison Avenue • Ginza</p>
              <p>Private Atelier Consultation: concierge@aurelia-paris.com</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
