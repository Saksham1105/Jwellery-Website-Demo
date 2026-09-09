import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ShieldCheck, Gem, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
}

interface HeroSlide {
  id: string;
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  alt: string;
  shopCtaText?: string;
  exploreCtaText?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'echoes-of-eternity',
    tag: 'The 2026 Solstice High Jewelry Campaign',
    titlePrefix: 'Echoes of',
    titleHighlight: 'Eternity',
    subtitle:
      'Hand-forged in certified 18-karat recycled gold and conflict-free solitaire diamonds. Discover pieces designed to illuminate life’s defining milestones.',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2200&q=90',
    alt: 'Echoes of Eternity solitaire diamond rings in 18k gold',
    shopCtaText: 'Shop The Collection',
    exploreCtaText: 'Explore Categories',
  },
  {
    id: 'solstice-collection',
    tag: 'Haute Joaillerie & Radiant Gold',
    titlePrefix: 'The Solstice',
    titleHighlight: 'Collection',
    subtitle:
      'Radiant yellow gold and sun-drenched pavé accents crafted to capture the warmth and brilliance of perpetual golden hour.',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2200&q=90',
    alt: 'The Solstice Collection fine gold pendant necklace',
    shopCtaText: 'Shop The Collection',
    exploreCtaText: 'Explore Categories',
  },
  {
    id: 'atelier-craftsmanship',
    tag: 'Heritage Master Goldsmithing',
    titlePrefix: 'Atelier',
    titleHighlight: 'Craftsmanship',
    subtitle:
      'Over 200 hours of meticulous hand-setting in our Parisian atelier, where time-honored lapidary traditions meet modern architectural lines.',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2200&q=90',
    alt: 'Atelier craftsmanship fine diamond drop earrings',
    shopCtaText: 'Shop The Collection',
    exploreCtaText: 'Explore Categories',
  },
  {
    id: 'bridal-heritage',
    tag: 'Bespoke Bridal & Ceremony Suite',
    titlePrefix: 'Bridal',
    titleHighlight: 'Heritage',
    subtitle:
      'Rare oval and emerald-cut solitaires crowned in platinum and 18k gold—heirloom engagement rings destined to be cherished for generations.',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2200&q=90',
    alt: 'Bridal Heritage bespoke solitaire engagement ring',
    shopCtaText: 'Shop The Collection',
    exploreCtaText: 'Explore Categories',
  },
  {
    id: 'celestial-radiance',
    tag: 'Rare Gemstone & Diamond Nocturne',
    titlePrefix: 'Celestial',
    titleHighlight: 'Radiance',
    subtitle:
      'Unheated royal blue sapphires and brilliant pavé diamonds woven into fluid, sculptural silhouettes that shimmer with every movement.',
    image:
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=2200&q=90',
    alt: 'Celestial Radiance fine jewelry diamond and sapphire bracelet',
    shopCtaText: 'Shop The Collection',
    exploreCtaText: 'Explore Categories',
  },
];

const AUTO_ADVANCE_MS = 6000;

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreCollections }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-advance interval with pause on hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentSlide]);

  // Preload images
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section
      id="hero-section"
      className="group relative w-full overflow-hidden bg-[#1D1B19] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="High Jewelry Campaign Carousel"
    >
      {/* Editorial Luxury Hero Banner Container */}
      <div className="relative min-h-[660px] sm:min-h-[740px] lg:min-h-[820px] flex items-center">
        {/* Visual Background Slides Layer - Subtle Crossfade */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-[6000ms] ease-out scale-100"
                  style={{
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transitionProperty: 'transform, opacity',
                  }}
                />

                {/* Subtle Editorial Dark Scrim specifically behind text column & top vignette for guaranteed contrast */}
                <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black/75 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Content Container - Crossfading High-Contrast Typography Per Slide */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 w-full flex flex-col justify-center min-h-[660px] sm:min-h-[740px] lg:min-h-[820px]">
          <div className="max-w-xl relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-center">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`space-y-6 sm:space-y-8 transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 translate-y-0 relative z-10 pointer-events-auto'
                      : 'opacity-0 translate-y-3 absolute inset-0 z-0 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Top Curated Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1D1B19]/75 border border-[#B76E79]/50 backdrop-blur-md text-[11px] tracking-[0.25em] uppercase text-[#F0B8C0] shadow-md">
                    <Sparkles className="w-3 h-3 text-[#F0B8C0]" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Headline with Luxury Serif Hierarchy and High Contrast */}
                  <div className="space-y-2">
                    <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#FAF8F5] leading-[1.08] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      {slide.titlePrefix} <br />
                      <span className="italic font-normal font-serif text-[#F0B8C0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {slide.titleHighlight}
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#EAE5DD] font-sans font-light leading-relaxed tracking-wide pt-2 max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* High-Contrast CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    <button
                      id={`hero-shop-now-btn-${slide.id}`}
                      onClick={onShopNow}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-[#FAF8F5] text-[#1D1B19] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#B76E79] hover:text-[#FAF8F5] active:bg-[#9A535E] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>{slide.shopCtaText || 'Shop The Collection'}</span>
                      <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      id={`hero-explore-collections-btn-${slide.id}`}
                      onClick={onExploreCollections}
                      className="inline-flex items-center justify-center px-8 py-4 bg-black/35 border border-[#FAF8F5]/80 text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#FAF8F5] hover:text-[#1D1B19] active:bg-white/90 backdrop-blur-xs transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      {slide.exploreCtaText || 'Explore Categories'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pinned Micro Trust Pillars with High Contrast */}
          <div className="pt-8 mt-4 border-t border-white/20 text-[#FAF8F5] max-w-xl z-20 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <Gem className="w-4 h-4 text-[#F0B8C0] shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" />
                <span className="text-xs tracking-wide font-light text-[#FAF8F5]">GIA Certified Diamonds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#F0B8C0] shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" />
                <span className="text-xs tracking-wide font-light text-[#FAF8F5]">Lifetime Atelier Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Arrow Navigation Controls - High Contrast */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/45 hover:bg-black/75 text-[#FAF8F5] hover:text-[#F0B8C0] active:text-[#9A535E] border border-white/20 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/45 hover:bg-black/75 text-[#FAF8F5] hover:text-[#F0B8C0] active:text-[#9A535E] border border-white/20 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Minimal Dot Indicators at Bottom Center */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-md">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={`dot-${slide.id}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.titlePrefix} ${slide.titleHighlight}`}
                className={`transition-all duration-500 ease-out cursor-pointer rounded-full ${
                  isActive
                    ? 'w-6 h-1.5 bg-[#B76E79]'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-[#B76E79]/80'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
