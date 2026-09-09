import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col bg-[#FFFDF9] border border-[#EAE5DD] hover:border-[#B76E79]/60 hover:shadow-md transition-all duration-300 relative"
    >
      {/* Visual Stage */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F1EB]">
        {/* Main Product Image with Fallback and Skeleton */}
        <SafeImage
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Top Badges (Only shown when genuine and uncluttered) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#1D1B19] text-[#FAF8F5] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#B76E79] text-[#FAF8F5] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium shadow-xs">
              New Creation
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-[#B76E79] hover:bg-[#C9828D] active:bg-[#9A535E] text-white shadow-md'
              : 'bg-[#FAF8F5]/80 hover:bg-white text-[#1D1B19] hover:text-[#B76E79] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
        </button>

        {/* Floating Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAddClick}
            className={`flex-1 py-2.5 px-3 text-[10px] tracking-[0.18em] uppercase font-medium flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer ${
              justAdded
                ? 'bg-[#2E6B4F] text-white'
                : 'bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-10 bg-[#FAF8F5] hover:bg-white text-[#1D1B19] hover:text-[#B76E79] active:text-[#9A535E] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Block */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subtitle / Spec */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A535E] mb-1 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-[#1D1B19] font-normal tracking-wide group-hover:text-[#B76E79] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Rating & Pricing Row */}
        <div className="pt-2 border-t border-[#EAE5DD]/80 flex items-baseline justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-base font-semibold text-[#1D1B19] tracking-tight">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9C948B] line-through font-light">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Review Stars */}
          <div className="flex items-center gap-1 text-[11px] text-[#6D6862]">
            <Star className="w-3 h-3 fill-[#B76E79] text-[#B76E79]" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-[#9C948B]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Available Metals Indicator */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[9px] uppercase tracking-wider text-[#9C948B]">Available in:</span>
          <span className="text-[10px] text-[#6D6862] font-medium">
            {product.materialOptions.slice(0, 2).join(' • ')}
            {product.materialOptions.length > 2 ? ` +${product.materialOptions.length - 2}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};
