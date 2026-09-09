import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Gift, Truck, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedMaterial: string, selectedSize: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onSelectRelatedProduct,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materialOptions[0] || '18k Yellow Gold');
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'craft' | 'spec'>('story');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedMaterial(product.materialOptions[0] || '18k Yellow Gold');
    setSelectedSize(product.sizeOptions?.[0] || 'Standard');
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedMaterial, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // Related products: items in same category or other best sellers, excluding current
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)).slice(0, 3);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image, product.hoverImage].filter(Boolean);

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1D1B19]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF8F5] w-full max-w-5xl overflow-hidden shadow-2xl border border-[#EAE5DD] my-8"
      >
        {/* Close Button */}
        <button
          id="close-product-detail-modal"
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF8F5]/80 hover:bg-white text-[#1D1B19] hover:text-[#B76E79] active:text-[#9A535E] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          
          {/* Left: Visual Gallery (7 columns) */}
          <div className="lg:col-span-7 bg-[#F3EFE9] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EAE5DD]">
            {/* Primary Large Image */}
            <div className="relative aspect-square overflow-hidden bg-white/60 border border-[#E8D5D8]/60 mb-4 flex items-center justify-center">
              <SafeImage
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {/* Material Pill */}
              <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-[#1D1B19] z-10 shadow-xs">
                {selectedMaterial}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-18 h-18 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#B76E79] shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form (5 columns) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#B76E79] font-semibold">
                  Maison Aurélia • {product.category}
                </span>
                
                <div className="flex items-center gap-1 text-xs text-[#6D6862]">
                  <Star className="w-3.5 h-3.5 fill-[#B76E79] text-[#B76E79]" />
                  <span className="font-medium text-[#1D1B19]">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1B19] font-normal tracking-wide leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#6D6862] tracking-wide">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-sans text-2xl font-semibold text-[#1D1B19] tracking-tight">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#9C948B] line-through font-light">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-[#2E6B4F] tracking-wide font-medium bg-[#EBF4EE] px-2 py-0.5">
                  Complimentary Insured Shipping
                </span>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-5 border-t border-b border-[#EAE5DD] py-5">
              
              {/* Material Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="tracking-widest uppercase text-[#1D1B19] font-medium text-[11px]">Material</span>
                  <span className="text-[#6D6862]">{selectedMaterial}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.materialOptions.map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-3 py-2 text-xs text-left border tracking-wide transition-all cursor-pointer ${
                        selectedMaterial === mat
                          ? 'border-[#B76E79] bg-[#FFFDF9] text-[#1D1B19] font-medium ring-1 ring-[#B76E79]'
                          : 'border-[#D9D2C7] bg-[#FAF8F5] text-[#4E4943] hover:border-[#B76E79]/60'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size / Dimensions Selector */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="tracking-widest uppercase text-[#1D1B19] font-medium text-[11px]">
                      {product.category === 'rings' ? 'Ring Size' : product.category === 'necklaces' ? 'Chain Length' : 'Size'}
                    </span>
                    <span className="text-[#9A535E] text-[11px] underline cursor-pointer hover:text-[#B76E79]">
                      Size & Fitting Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizeOptions.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[40px] px-3 py-1.5 text-xs text-center border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-[#1D1B19] bg-[#1D1B19] text-[#FAF8F5] font-medium'
                            : 'border-[#D9D2C7] bg-[#FFFDF9] text-[#1D1B19] hover:border-[#1D1B19]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-1">
                <span className="tracking-widest uppercase text-[#1D1B19] font-medium text-[11px]">Quantity</span>
                <div className="flex items-center border border-[#D9D2C7] bg-[#FFFDF9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-[#1D1B19] hover:bg-[#F2EDE4] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#1D1B19]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#1D1B19] hover:bg-[#F2EDE4]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Bag & Wishlist */}
            <div className="space-y-3">
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  addedSuccess
                    ? 'bg-[#2E6B4F] text-white'
                    : 'bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Your Shopping Bag</span>
                  </>
                ) : (
                  <span>Add To Bag — ${(product.price * quantity).toLocaleString()}</span>
                )}
              </button>

              <button
                id="modal-toggle-wishlist-btn"
                onClick={() => onToggleWishlist(product)}
                className={`w-full py-3 text-xs tracking-[0.18em] uppercase font-medium border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isWishlisted
                    ? 'border-[#B76E79] bg-[#FFFDF9] text-[#B76E79]'
                    : 'border-[#1D1B19] bg-transparent text-[#1D1B19] hover:bg-[#F2EDE4]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved In Your Wishlist' : 'Save To Wishlist'}</span>
              </button>
            </div>

            {/* Luxury Service Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#6D6862] border-t border-[#EAE5DD]">
              <div className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-[#B76E79] shrink-0 mt-0.5" />
                <span>Complimentary white-glove insured delivery</span>
              </div>
              <div className="flex items-start gap-2">
                <Gift className="w-3.5 h-3.5 text-[#B76E79] shrink-0 mt-0.5" />
                <span>Signature velvet casket & wax seal certificate</span>
              </div>
            </div>

            {/* Editorial Information Tabs */}
            <div className="border-t border-[#EAE5DD] pt-4">
              <div className="flex gap-4 border-b border-[#EAE5DD] pb-2 text-xs">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-1 uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'story'
                      ? 'border-b-2 border-[#B76E79] text-[#1D1B19] font-medium'
                      : 'text-[#6D6862] hover:text-[#1D1B19]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('craft')}
                  className={`pb-1 uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'craft'
                      ? 'border-b-2 border-[#B76E79] text-[#1D1B19] font-medium'
                      : 'text-[#6D6862] hover:text-[#1D1B19]'
                  }`}
                >
                  Craftsmanship
                </button>
                <button
                  onClick={() => setActiveTab('spec')}
                  className={`pb-1 uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'spec'
                      ? 'border-b-2 border-[#B76E79] text-[#1D1B19] font-medium'
                      : 'text-[#6D6862] hover:text-[#1D1B19]'
                  }`}
                >
                  Specifications
                </button>
              </div>

              <div className="pt-3 text-xs text-[#4E4943] leading-relaxed">
                {activeTab === 'story' && <p>{product.description}</p>}
                {activeTab === 'craft' && <p>{product.craftsmanship}</p>}
                {activeTab === 'spec' && (
                  <div className="space-y-1.5 text-[11px]">
                    {product.caratWeight && (
                      <p><strong className="text-[#1D1B19]">Carat / Diamond:</strong> {product.caratWeight}</p>
                    )}
                    {product.dimensions && (
                      <p><strong className="text-[#1D1B19]">Dimensions:</strong> {product.dimensions}</p>
                    )}
                    <p><strong className="text-[#1D1B19]">Metal Purity:</strong> Certified 18k (750/1000) / Platinum 950</p>
                    <p><strong className="text-[#1D1B19]">Origin:</strong> Crafted in Paris, France</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section at Bottom */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#FFFDF9] border-t border-[#EAE5DD] p-6 sm:p-8">
            <h4 className="font-serif text-lg text-[#1D1B19] tracking-wide mb-4">
              You May Also Cherish
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedProduct(rel)}
                  className="group cursor-pointer flex items-center gap-3 p-2 bg-[#FAF8F5] border border-[#EAE5DD] hover:border-[#B76E79] transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-[#ECE6DC]">
                    <SafeImage src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1D1B19] group-hover:text-[#B76E79] truncate">{rel.name}</p>
                    <p className="text-xs font-semibold text-[#1D1B19]">${rel.price.toLocaleString()}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9C948B] group-hover:text-[#1D1B19] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
