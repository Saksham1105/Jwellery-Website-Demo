import React, { useState } from 'react';
import { Gem } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
  className?: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-[#FAF8F5] border border-[#EAE5DD] flex flex-col items-center justify-center p-4 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-[#F8EFF1] text-[#B76E79] flex items-center justify-center mb-2 shadow-xs">
          <Gem className="w-5 h-5 stroke-[1.5]" />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase font-serif text-[#9A535E] font-medium line-clamp-1">
          {alt || 'Maison Aurélia Fine Jewelry'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Soft pulsing ivory skeleton while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-[#ECE6DC] animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};
