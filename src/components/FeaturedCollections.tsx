import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { SafeImage } from './SafeImage';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCategory }) => {
  return (
    <section id="featured-collections-section" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-[#B76E79] font-medium">
            Curated Expressions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1D1B19]">
            The Iconic Categories
          </h2>
          <div className="w-12 h-[1px] bg-[#B76E79] mx-auto mt-4" />
          <p className="text-sm text-[#6D6862] font-light leading-relaxed pt-2">
            Each creation is an exploration of symmetry, balance, and the intrinsic warmth of French fine metalwork.
          </p>
        </div>

        {/* Categories Grid (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`collection-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className="group cursor-pointer relative overflow-hidden bg-[#F3EFE9] border border-[#EAE5DD] hover:border-[#B76E79]/60 transition-all duration-500 flex flex-col shadow-xs hover:shadow-md"
            >
              {/* Image Container with Luxury Zoom and Fallback */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DC]">
                <SafeImage
                  src={cat.image}
                  alt={`Explore Maison Aurélia ${cat.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B19]/75 via-[#1D1B19]/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Corner Piece Count Tag */}
                <div className="absolute top-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase text-[#1D1B19] z-10 shadow-xs">
                  {cat.itemCount}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-[#FAF8F5] space-y-1.5 z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl tracking-wide font-normal">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5]/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#B76E79] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-[#EAE5DD] font-light tracking-wide line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Action Bar */}
              <div className="p-4 bg-[#FFFDF9] flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#1D1B19] group-hover:text-[#B76E79] transition-colors border-t border-[#EAE5DD]">
                <span>Discover {cat.name}</span>
                <span className="text-[#B76E79] font-semibold text-sm">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
