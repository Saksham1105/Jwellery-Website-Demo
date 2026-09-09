import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-[#1D1B19]/70 backdrop-blur-xs transition-opacity duration-300 flex justify-end"
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE5DD] relative animate-slideLeft"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5DD] flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#B76E79] fill-[#B76E79]" />
            <h3 className="font-serif text-xl tracking-wide text-[#1D1B19]">
              Saved Wishlist
            </h3>
            <span className="text-xs text-[#6D6862] bg-[#F2EDE4] px-2 py-0.5 rounded-full">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            aria-label="Close Wishlist"
            className="p-2 text-[#6D6862] hover:text-[#1D1B19] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-[#EAE5DD]">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8EFF1] flex items-center justify-center mx-auto text-[#B76E79]">
                <Heart className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h4 className="font-serif text-xl text-[#1D1B19]">Your wishlist is empty</h4>
              <p className="text-xs text-[#6D6862] max-w-xs mx-auto leading-relaxed">
                Save your favorite high jewelry creations by clicking the heart icon on any piece.
              </p>
              <button
                onClick={onClose}
                className="inline-block mt-2 px-6 py-3 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="pt-5 first:pt-0 flex gap-4">
                {/* Image */}
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-20 h-20 shrink-0 bg-[#ECE6DC] overflow-hidden border border-[#EAE5DD] cursor-pointer group relative"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="cursor-pointer"
                    >
                      <h4 className="font-serif text-base text-[#1D1B19] hover:text-[#B76E79] transition-colors leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#9A535E] mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                      className="text-[#9C948B] hover:text-[#C53030] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-sans font-semibold text-sm text-[#1D1B19]">
                      ${product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onMoveToCart(product)}
                      className="px-3 py-1.5 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-[10px] tracking-wider uppercase font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 bg-[#FFFDF9] border-t border-[#EAE5DD]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onMoveToCart(p));
              }}
              className="w-full py-3.5 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Move All to Shopping Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
