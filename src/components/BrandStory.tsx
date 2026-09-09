import React from 'react';
import { Gem, Award, Sparkles, Compass } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const BrandStory: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with Safe Overlay Positioning */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE6DC] border border-[#EAE5DD] shadow-sm">
              <SafeImage
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"
                alt="Maison Aurélia master bench jeweler at work"
                className="w-full h-full object-cover object-center filter contrast-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1B19]/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Luxury Atelier Card - Constrained safely within bounds without overflow */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#FFFDF9] border border-[#EAE5DD] p-4 sm:p-5 shadow-2xl max-w-[260px] sm:max-w-xs space-y-2 z-10">
              <div className="flex items-center gap-2 text-[#B76E79]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Atelier Place Vendôme</span>
              </div>
              <p className="font-serif text-sm sm:text-base text-[#1D1B19] leading-snug">
                "Where raw earth yields to centuries of French goldsmithing tradition."
              </p>
              <p className="text-[10px] text-[#6D6862] tracking-wider uppercase">Paris • Est. 1928</p>
            </div>
          </div>

          {/* Right Column: Story Narrative & Core Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.28em] uppercase text-[#B76E79] font-medium block">
                The Heritage of Maison Aurélia
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1D1B19] leading-tight">
                An Obsession with Light, <br />
                <span className="italic font-serif font-normal text-[#B76E79]">Symmetry & Touch</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#B76E79] my-4" />
              <p className="text-sm text-[#4E4943] leading-relaxed font-light pt-2">
                Founded with a devotion to sculpt jewelry that exists beyond transient seasonal trends, Maison Aurélia brings together master lapidaries, gemologists, and artisan setters. Every creation is conceived as an architectural sculpture meant to be touched, lived in, and passed down.
              </p>
            </div>

            {/* 2 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#F8EFF1] flex items-center justify-center text-[#B76E79]">
                  <Gem className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-[#1D1B19]">Ethical Sourcing</h4>
                <p className="text-xs text-[#6D6862] leading-relaxed">
                  100% Kimberly Process certified, conflict-free diamonds and traceable Akoya pearls directly from ethical co-ops.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#F8EFF1] flex items-center justify-center text-[#B76E79]">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-[#1D1B19]">18k Recycled Gold</h4>
                <p className="text-xs text-[#6D6862] leading-relaxed">
                  Purified and alloyed in-house to achieve our signature warm hue, leaving minimal environmental impact.
                </p>
              </div>
            </div>

            {/* Quote Signature */}
            <div className="pt-4 border-t border-[#EAE5DD] flex items-center gap-4">
              <Compass className="w-5 h-5 text-[#B76E79]" />
              <span className="text-xs text-[#6D6862] tracking-wide">
                Bespoke Commissions & Atelier Appointments Available by Request
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
