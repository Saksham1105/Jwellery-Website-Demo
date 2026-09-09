import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [giftMessage, setGiftMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-[#1D1B19]/70 backdrop-blur-xs transition-opacity duration-300 flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE5DD] animate-slideLeft relative"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-[#EAE5DD] flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B76E79]" />
            <h3 className="font-serif text-xl tracking-wide text-[#1D1B19]">
              Your Shopping Bag
            </h3>
            <span className="text-xs text-[#6D6862] bg-[#F2EDE4] px-2 py-0.5 rounded-full">
              {items.reduce((total, i) => total + i.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            aria-label="Close Shopping Bag"
            className="p-2 text-[#6D6862] hover:text-[#1D1B19] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping / White Glove Progress Bar */}
        <div className="bg-[#F8EFF1] px-6 py-3 border-b border-[#EAE5DD] text-xs">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-[#2E6B4F] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2E6B4F]" />
              <span>You have unlocked complimentary White-Glove Insured Courier</span>
            </p>
          ) : (
            <div className="space-y-1.5">
              <p className="text-[#4E4943]">
                Add <strong className="text-[#1D1B19]">${(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for White-Glove Hand-Courier
              </p>
              <div className="w-full bg-[#EAE5DD] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#B76E79] h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 divide-y divide-[#EAE5DD]">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8EFF1] flex items-center justify-center mx-auto text-[#B76E79]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h4 className="font-serif text-xl text-[#1D1B19]">Your bag is empty</h4>
              <p className="text-xs text-[#6D6862] max-w-xs mx-auto leading-relaxed">
                Explore our fine jewelry collection and find a timeless piece crafted to last a lifetime.
              </p>
              <button
                id="cart-continue-shopping-btn"
                onClick={onClose}
                className="inline-block mt-2 px-6 py-3 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
              >
                Discover Creations
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="pt-5 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 shrink-0 bg-[#ECE6DC] overflow-hidden border border-[#EAE5DD] relative">
                  <SafeImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif text-base text-[#1D1B19] leading-snug">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#9A535E] mt-0.5">
                        {item.selectedMaterial} • {item.selectedSize}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      aria-label="Remove item"
                      className="text-[#9C948B] hover:text-[#C53030] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D9D2C7] bg-[#FFFDF9]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#1D1B19] hover:bg-[#F2EDE4] text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-[#1D1B19]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#1D1B19] hover:bg-[#F2EDE4] text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-sans font-medium text-sm text-[#1D1B19]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Gift Wrapping Option */}
          {items.length > 0 && (
            <div className="pt-5 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGiftWrap}
                  onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                  className="mt-0.5 accent-[#B76E79]"
                />
                <span className="text-xs text-[#1D1B19]">
                  <strong className="font-medium">Complimentary Signature Gift Packaging</strong>
                  <span className="block text-[11px] text-[#6D6862]">
                    Includes velvet presentation casket, silk ribbon, and wax-sealed certificate.
                  </span>
                </span>
              </label>

              {includeGiftWrap && (
                <input
                  type="text"
                  placeholder="Add a personalized handwritten gift note..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full mt-2 text-xs p-2.5 bg-[#FFFDF9] border border-[#D9D2C7] focus:border-[#B76E79] focus:outline-none"
                />
              )}
            </div>
          )}
        </div>

        {/* Bottom Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FFFDF9] border-t border-[#EAE5DD] space-y-4">
            <div className="space-y-1.5 text-xs text-[#6D6862]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#1D1B19]">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Global Courier</span>
                <span className="text-[#2E6B4F] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-serif pt-2 border-t border-[#EAE5DD] text-[#1D1B19]">
                <span>Estimated Total</span>
                <span className="font-sans font-semibold">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs tracking-[0.22em] uppercase font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase text-[#9C948B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B76E79]" />
              <span>Encrypted 256-Bit SSL Checkout • Paris Atelier Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
