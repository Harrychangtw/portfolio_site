"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useIsMobile } from "../hooks/use-mobile"

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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  // Responsive internal padding in pixels
  const insetPadding = noInsetPadding ? 0 : (isMobile ? 4 : 7); // Use 0 padding when noInsetPadding is true

  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;
    
    // If explicit aspectRatio is provided, use that directly
    if (providedAspectRatio) {
      setDimensions({ 
        width: 100, 
        height: 100 / providedAspectRatio 
      });
      setLoading(false);
      return;
    }
    
    const img = new window.Image();
    
    img.onload = () => {
      console.log(`GalleryImage loaded: ${src} with dimensions ${img.width}x${img.height}`);
      setDimensions({ width: img.width, height: img.height });
      setLoading(false);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load gallery image: ${src}, using fallback dimensions`);
      // Set fallback dimensions (3:2 aspect ratio)
      setDimensions({ width: 3, height: 2 });
      setLoading(false);
      setImageError(true);
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
  
  // Calculate appropriate padding based on orientation
  const containerPadding = `${(1 / rawAspectRatio) * 100}%`;
  
  // For portrait images, calculate the horizontal padding needed to make
  // the container width consistent with landscape images
  // The reference width-to-height ratio is 1.5 (3:2 landscape)
  const referenceRatio = 1.5;
  
  // Get the percentage width the portrait image would occupy in the container
  // compared to a landscape image
  const relativeWidth = isPortrait ? (rawAspectRatio / referenceRatio) * 100 : 100;
  
  // Calculate the horizontal padding needed on each side to center the image
  // This only applies to portrait images
  const horizontalPadding = isPortrait ? `${(100 - relativeWidth) / 2}%` : '0px';

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
          {!loading && (
            <div 
              className="relative w-full overflow-hidden"
              style={{ 
                paddingBottom: containerPadding,
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={priority}
                  quality={quality}
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