import React from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss, onOpenCart }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1D1B19] text-[#FAF8F5] p-4 border border-[#B76E79]/40 shadow-xl flex items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B76E79] text-[#1D1B19] flex items-center justify-center shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : (
                <Heart className="w-4 h-4 fill-current" />
              )}
            </div>
            <div>
              <p className="text-xs font-serif text-[#FAF8F5] tracking-wide">{toast.title}</p>
              {toast.subtitle && (
                <p className="text-[10px] text-[#D9D2C7] tracking-wider uppercase mt-0.5">{toast.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {toast.type === 'cart' && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="text-[10px] uppercase tracking-wider text-[#B76E79] hover:text-[#C9828D] underline cursor-pointer"
              >
                View Bag
              </button>
            )}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#9C948B] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
