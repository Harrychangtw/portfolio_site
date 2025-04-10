"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useIsMobile } from "../hooks/use-mobile"
import { GalleryLoadingSkeleton } from "./gallery-loading-skeleton"

interface GalleryImageContainerProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  quality?: number
  aspectRatio?: number // Optional aspect ratio override (width/height)
  noInsetPadding?: boolean // Option to remove the inset padding (outline effect)
}

export function GalleryImageContainer({ 
  src, 
  alt, 
  caption, 
  priority = false, 
  quality = 80,
  aspectRatio: providedAspectRatio,
  noInsetPadding = false
}: GalleryImageContainerProps) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [blurComplete, setBlurComplete] = useState(false);
  const isMobile = useIsMobile();

  // Get thumbnail URL for blur-up loading
  const thumbnailSrc = src?.replace('.webp', '-thumb.webp');

  // Responsive internal padding in pixels
  const insetPadding = noInsetPadding ? 0 : (isMobile ? 4 : 7);

  useEffect(() => {
    // Reset states when src changes
    setLoading(true);
    setBlurComplete(false);
    
    if (typeof window === 'undefined') return;
    
    if (providedAspectRatio) {
      const width = 1200;
      setDimensions({ 
        width, 
        height: Math.round(width / providedAspectRatio)
      });
      setLoading(false);
      return;
    }
    
    const img = new window.Image();
    
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setLoading(false);
    };
    
    img.onerror = () => {
      setImageError(true);
      setLoading(false);
    };
    
    img.src = src;
  }, [src, providedAspectRatio]);

  // Calculate aspect ratio from actual image dimensions
  // Default to 3:2 (landscape photography standard) if dimensions aren't available
  const rawAspectRatio = dimensions.width && dimensions.height 
    ? dimensions.width / dimensions.height 
    : 1.5;  // 3:2 ratio = 1.5
    
  // Determine orientation
  const isPortrait = rawAspectRatio < 1;
  
  // Check if this is a cinematic 2.35:1 aspect ratio (or similar ultra-wide)
  const isCinematic = rawAspectRatio >= 2.2 && rawAspectRatio <= 2.4;
  
  // Target aspect ratio for the container frame (3:2)
  const targetRatio = 1.5;
  
  // Different handling based on image type
  let containerPadding;
  let horizontalPadding = '0px';
  let verticalPadding = '0px';
  let containerClass = "";
  
  if (isPortrait) {
    // Portrait image handling (existing logic)
    containerPadding = `${(1 / rawAspectRatio) * 100}%`;
    const relativeWidth = (rawAspectRatio / targetRatio) * 100;
    horizontalPadding = `${(100 - relativeWidth) / 2}%`;
    containerClass = "border-t-2 border-b-2 border-white";
  } else if (isCinematic) {
    // Cinematic image handling (new logic)
    // Container has 3:2 aspect ratio
    containerPadding = `${(1 / targetRatio) * 100}%`;
    
    // Calculate vertical padding needed to center the image
    // For a cinematic image in a 3:2 container, we need padding above and below
    const cinematic_height_percentage = (targetRatio / rawAspectRatio) * 100;
    verticalPadding = `${(100 - cinematic_height_percentage) / 2}%`;
    containerClass = "border-l-2 border-r-2 border-white";
  } else {
    // Normal landscape image
    containerPadding = `${(1 / rawAspectRatio) * 100}%`;
    containerClass = "border-l-2 border-r-2 border-white";
  }

  return (
    <figure className="w-full">
      {/* All images get the same container width for consistent column layout */}
      <div className="w-full">
        {/* Container with consistent padding or no padding based on prop */}
        <div 
          className={`relative w-full ${noInsetPadding ? '' : 'bg-white'}`}
          style={{ 
            paddingTop: `${insetPadding}px`, 
            paddingBottom: `${insetPadding}px`,
            paddingLeft: isPortrait ? `calc(${horizontalPadding} + ${insetPadding}px)` : `${insetPadding}px`,
            paddingRight: isPortrait ? `calc(${horizontalPadding} + ${insetPadding}px)` : `${insetPadding}px`
          }}
        >
          {loading ? (
            <GalleryLoadingSkeleton />
          ) : (
            <div 
              className="relative w-full overflow-hidden"
              style={{ 
                paddingBottom: containerPadding,
              }}
            >
              {/* Border overlay */}
              {!noInsetPadding && (
                <div className={`absolute inset-0 z-10 pointer-events-none ${containerClass}`}></div>
              )}
              
              <div className="absolute inset-0">
                {/* Thumbnail for blur-up effect */}
                {!blurComplete && thumbnailSrc && (
                  <Image
                    src={thumbnailSrc}
                    alt={alt}
                    fill
                    className={`object-contain object-center transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                    sizes="100vw"
                    quality={20}
                  />
                )}
                
                {/* Full resolution image */}
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`object-contain object-center transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                  sizes="100vw"
                  priority={priority}
                  quality={quality}
                  onLoadingComplete={() => setBlurComplete(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <p className="mt-3 text-sm text-secondary italic text-center max-w-prose mx-auto">
          {caption}
        </p>
      )}
    </figure>
  );
}