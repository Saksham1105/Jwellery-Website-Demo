/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Testimonials } from './components/Testimonials';
import { BrandStory } from './components/BrandStory';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductCategory } from './types';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State - preloaded with 1 signature item so the demo is immediately rich & interactive
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartId: 'preloaded-item-1',
      product: PRODUCTS[0],
      quantity: 1,
      selectedMaterial: '18k Yellow Gold',
      selectedSize: '6.5',
    },
  ]);

  // Wishlist State - preloaded with 2 items
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set([PRODUCTS[1].id, PRODUCTS[2].id])
  );

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: 'cart' | 'wishlist', title: string, subtitle?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Smooth Navigation Helper
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedMaterial?: string,
    selectedSize?: string
  ) => {
    const material = selectedMaterial || product.materialOptions[0] || '18k Yellow Gold';
    const size = selectedSize || product.sizeOptions?.[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedMaterial === material &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          cartId: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedMaterial: material,
          selectedSize: size,
        };
        return [...prev, newItem];
      }
    });

    addToast(
      'cart',
      `Added to Shopping Bag`,
      `${quantity}x ${product.name} (${material})`
    );
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast('wishlist', 'Removed from Wishlist', product.name);
      } else {
        next.add(product.id);
        addToast('wishlist', 'Saved to Wishlist', product.name);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleMoveFromWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    handleRemoveFromWishlist(product.id);
  };

  // Checkout Handlers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = () => {
    setCart([]);
  };

  // Derived Products for Wishlist
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1B19] flex flex-col font-sans selection:bg-[#F4D9DC] selection:text-[#1D1B19]">
      {/* 1. Sticky Header */}
      <Header
        cartCount={cartItemCount}
        wishlistCount={wishlistIds.size}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          navigateToSection('catalog');
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onNavigateToSection={navigateToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onShopNow={() => {
            setActiveCategory('all');
            navigateToSection('catalog');
          }}
          onExploreCollections={() => {
            navigateToSection('featured-collections-section');
          }}
        />

        {/* 3. Featured Collections Categories */}
        <FeaturedCollections
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            navigateToSection('catalog');
          }}
        />

        {/* 4. Best Sellers & Catalog Grid with Filters/Sort */}
        <ProductGrid
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickAdd={handleQuickAdd}
          onSelectProduct={(product) => setSelectedProduct(product)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Atelier & Heritage Story */}
        <BrandStory />

        {/* 8. Collector Testimonials */}
        <Testimonials />

        {/* 9. Newsletter Signup Section */}
        <Newsletter />
      </main>

      {/* 10. Luxury Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          navigateToSection('catalog');
        }}
        onNavigateToSection={navigateToSection}
      />

      {/* 5. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectRelatedProduct={(related) => setSelectedProduct(related)}
      />

      {/* 6. Shopping Cart Slide-in Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveFromWishlistToCart}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* 7. Checkout Modal with Confirmation Screen */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Floating Notifications Toast */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
