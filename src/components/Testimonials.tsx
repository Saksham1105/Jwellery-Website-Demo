import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-20 sm:py-28 bg-[#F3EFE9] border-t border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-[#B76E79] font-medium">
            Collector Endorsements
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1D1B19]">
            Words from Our Patrons
          </h2>
          <div className="w-12 h-[1px] bg-[#B76E79] mx-auto mt-4" />
          <p className="text-sm text-[#6D6862] font-light leading-relaxed pt-2">
            Discerning collectors share their encounters with Maison Aurélia fine jewelry creations.
          </p>
        </div>

        {/* 3 Testimonials Grid (Responsive: 1 col on mobile, 3 cols on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => {
            const starCount = t.rating && t.rating > 0 ? t.rating : 5;
            return (
              <div
                key={t.id}
                id={`testimonial-card-${t.id}`}
                className="bg-[#FFFDF9] p-6 sm:p-8 border border-[#EAE5DD] shadow-xs flex flex-col justify-between space-y-6 relative group hover:border-[#B76E79]/60 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1" aria-label={`${starCount} out of 5 stars`}>
                      {[...Array(starCount)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B76E79] text-[#B76E79]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#E8D5D8] group-hover:text-[#B76E79] stroke-[1] transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-[#1D1B19] font-normal leading-snug">
                    "{t.title}"
                  </h3>

                  {/* Body */}
                  <p className="text-xs text-[#4E4943] leading-relaxed font-light">
                    {t.comment}
                  </p>
                </div>

                {/* Author & Piece Meta */}
                <div className="pt-4 border-t border-[#EAE5DD] space-y-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-medium text-sm text-[#1D1B19] tracking-wide">
                      {t.author}
                    </span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#2E6B4F]" title="Verified Collector" />
                  </div>
                  <p className="text-[11px] text-[#6D6862]">{t.location}</p>
                  <p className="text-[10px] tracking-wider uppercase text-[#9A535E] pt-1">
                    Acquired: {t.pieceName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
