import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, Gem, ShieldCheck, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'delivery',
    icon: Sparkles,
    text: 'Complimentary Worldwide Insured Delivery',
  },
  {
    id: 'gia',
    icon: Gem,
    text: 'GIA-Certified Diamonds, Ethically Sourced',
  },
  {
    id: 'warranty',
    icon: ShieldCheck,
    text: 'Lifetime Atelier Warranty on Every Creation',
  },
  {
    id: 'appointments',
    icon: Calendar,
    text: 'Private Appointments Available — Book Your Salon Visit',
  },
];

const ROTATION_INTERVAL_MS = 4000;

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const nextMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  }, []);

  const prevMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  }, []);

  // Auto-rotate every 4 seconds when not paused and not reduced motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextMessage();
    }, ROTATION_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReducedMotion, nextMessage, currentIndex]);

  return (
    <div
      id="announcement-bar"
      role="region"
      aria-roledescription="announcement carousel"
      aria-label="Promotions and boutique announcements"
      className="relative bg-[#1D1B19] text-[#FAF8F5] h-9 sm:h-9 border-b border-[#2C2926] overflow-hidden select-none z-50 flex items-center justify-between px-3 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Diamond Facet Shimmer Beam (left to right sweep) */}
      {!prefersReducedMotion && (
        <div
          key={`shimmer-${currentIndex}`}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#B76E79]/25 to-transparent -skew-x-12 animate-shimmer-facet" />
          {/* Subtle bottom accent line */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#B76E79]/40 to-transparent" />
        </div>
      )}

      {/* Left Manual Navigation Arrow */}
      <button
        onClick={prevMessage}
        aria-label="Previous announcement"
        className="relative z-10 p-1 text-[#FAF8F5]/40 hover:text-[#B76E79] active:text-[#9A535E] transition-all duration-200 cursor-pointer focus:outline-none focus:text-[#B76E79]"
      >
        <ChevronLeft className="w-3.5 h-3.5 stroke-[1.75]" />
      </button>

      {/* Center Rotating Message Container */}
      <div
        className="relative flex-1 h-full flex items-center justify-center overflow-hidden mx-2"
        aria-live="polite"
      >
        {ANNOUNCEMENTS.map((item, index) => {
          const isActive = index === currentIndex;
          const Icon = item.icon;

          if (prefersReducedMotion) {
            // Static view for reduced motion users
            if (index !== 0) return null;
            return (
              <div
                key={item.id}
                className="flex items-center justify-center gap-2 text-center"
              >
                <Icon className="w-3 h-3 text-[#B76E79] shrink-0" />
                <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase font-light text-[#FAF8F5]">
                  {item.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex items-center justify-center gap-2 text-center transition-all duration-600 ease-in-out ${
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                  : 'opacity-0 translate-y-2 pointer-events-none z-0'
              }`}
            >
              <Icon className="w-3 h-3 text-[#B76E79] shrink-0" />
              <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase font-light text-[#FAF8F5]">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right Manual Navigation Arrow */}
      <button
        onClick={nextMessage}
        aria-label="Next announcement"
        className="relative z-10 p-1 text-[#FAF8F5]/40 hover:text-[#B76E79] active:text-[#9A535E] transition-all duration-200 cursor-pointer focus:outline-none focus:text-[#B76E79]"
      >
        <ChevronRight className="w-3.5 h-3.5 stroke-[1.75]" />
      </button>
    </div>
  );
};
