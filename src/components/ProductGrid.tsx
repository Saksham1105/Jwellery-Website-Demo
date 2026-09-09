import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  searchQuery,
  onClearSearch,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  const [filterBestSellersOnly, setFilterBestSellersOnly] = useState(false);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // New filter
      if (filterNewOnly && !item.isNew) {
        return false;
      }
      // Best Seller filter
      if (filterBestSellersOnly && !item.isBestSeller) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });

    return result;
  }, [products, activeCategory, filterNewOnly, filterBestSellersOnly, searchQuery, sortOption]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'rings', label: 'Rings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bracelets', label: 'Bracelets' },
  ];

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EAE5DD] gap-6">
          <div>
            <span className="text-xs tracking-[0.28em] uppercase text-[#B76E79] font-medium block mb-2">
              High Jewelry Repertoire
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1D1B19]">
              Signature Creations
            </h2>
          </div>

          <div className="text-xs text-[#6D6862] tracking-wider uppercase flex items-center gap-2">
            <span>Showing {filteredAndSortedProducts.length} of {products.length} Masterpieces</span>
          </div>
        </div>

        {/* Filter and Category Controls Bar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[#EAE5DD]/60 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1D1B19] text-[#FAF8F5] font-medium shadow-xs'
                    : 'bg-[#FFFDF9] text-[#4E4943] hover:text-[#1D1B19] border border-[#EAE5DD] hover:border-[#B76E79]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Quick Tags & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            {/* Quick Filters */}
            <div className="flex items-center gap-2">
              <button
                id="filter-best-sellers-btn"
                onClick={() => setFilterBestSellersOnly(!filterBestSellersOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-colors cursor-pointer ${
                  filterBestSellersOnly
                    ? 'bg-[#F7ECED] border-[#B76E79] text-[#1D1B19] font-medium'
                    : 'bg-transparent border-[#D9D2C7] text-[#6D6862] hover:text-[#1D1B19]'
                }`}
              >
                <Flame className="w-3 h-3 text-[#B76E79]" />
                <span>Best Sellers</span>
                {filterBestSellersOnly && <Check className="w-3 h-3 text-[#B76E79]" />}
              </button>

              <button
                id="filter-new-creations-btn"
                onClick={() => setFilterNewOnly(!filterNewOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-colors cursor-pointer ${
                  filterNewOnly
                    ? 'bg-[#F7ECED] border-[#B76E79] text-[#1D1B19] font-medium'
                    : 'bg-transparent border-[#D9D2C7] text-[#6D6862] hover:text-[#1D1B19]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#B76E79]" />
                <span>New Arrivals</span>
                {filterNewOnly && <Check className="w-3 h-3 text-[#B76E79]" />}
              </button>

              {(filterBestSellersOnly || filterNewOnly || activeCategory !== 'all' || searchQuery) && (
                <button
                  id="reset-all-filters-btn"
                  onClick={() => {
                    setFilterBestSellersOnly(false);
                    setFilterNewOnly(false);
                    onSelectCategory('all');
                    onClearSearch();
                  }}
                  className="text-[11px] tracking-wider uppercase text-[#B76E79] hover:text-[#9A535E] underline pl-2 cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6D6862]" />
              <span className="text-[11px] uppercase tracking-wider text-[#6D6862]">Sort By:</span>
              <select
                id="product-sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort jewelry products"
                className="bg-[#FFFDF9] border border-[#D9D2C7] text-[#1D1B19] text-xs py-1.5 px-3 focus:outline-none focus:border-[#B76E79] tracking-wide rounded-none cursor-pointer"
              >
                <option value="featured">Curated & Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Collector Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Notice Banner if Query Active */}
        {searchQuery && (
          <div className="mb-8 p-4 bg-[#FFFDF9] border border-[#E8D5D8] flex items-center justify-between">
            <span className="text-xs text-[#6D6862] tracking-wide">
              Showing search results for <strong className="text-[#1D1B19]">"{searchQuery}"</strong> ({filteredAndSortedProducts.length} items found)
            </span>
            <button
              onClick={onClearSearch}
              className="text-xs uppercase tracking-wider text-[#B76E79] hover:text-[#9A535E] underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#FFFDF9] border border-[#EAE5DD] p-8 max-w-md mx-auto space-y-4">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-[#B76E79]/60" />
            <h3 className="font-serif text-xl text-[#1D1B19]">No Creations Found</h3>
            <p className="text-xs text-[#6D6862] leading-relaxed">
              We could not find any jewelry matching your exact filter criteria. Try adjusting your filters or resetting your search.
            </p>
            <button
              onClick={() => {
                setFilterBestSellersOnly(false);
                setFilterNewOnly(false);
                onSelectCategory('all');
                onClearSearch();
              }}
              className="mt-2 px-6 py-2.5 bg-[#1D1B19] hover:bg-[#B76E79] active:bg-[#9A535E] text-[#FAF8F5] text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              View Full Repertoire
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
