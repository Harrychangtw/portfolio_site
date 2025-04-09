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
  blurDataUrl?: string // New prop for blur placeholder
}

export function GalleryImageContainer({ 
  src, 
  alt, 
  caption, 
  priority = false, 
  quality = 80,
  aspectRatio: providedAspectRatio,
  noInsetPadding = false,
  blurDataUrl
}: GalleryImageContainerProps) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 }); // Default 3:2 ratio
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  // Reduce padding, especially for full-width images
  const insetPadding = noInsetPadding ? 0 : (isMobile ? 2 : 4);

  useEffect(() => {
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

  const rawAspectRatio = dimensions.width && dimensions.height 
    ? dimensions.width / dimensions.height 
    : 1.5;
    
  const isPortrait = rawAspectRatio < 1;
  const isCinematic = rawAspectRatio >= 2.2 && rawAspectRatio <= 2.4;
  const targetRatio = 1.5;
  
  let containerPadding;
  let horizontalPadding = '0px';
  let verticalPadding = '0px';
  let containerClass = "";
  
  if (isPortrait) {
    containerPadding = `${(1 / rawAspectRatio) * 100}%`;
    const relativeWidth = (rawAspectRatio / targetRatio) * 100;
    horizontalPadding = `${(100 - relativeWidth) / 2}%`;
    containerClass = "border-t-2 border-b-2 border-white";
  } else if (isCinematic) {
    containerPadding = `${(1 / targetRatio) * 100}%`;
    const cinematic_height_percentage = (targetRatio / rawAspectRatio) * 100;
    verticalPadding = `${(100 - cinematic_height_percentage) / 2}%`;
    containerClass = "border-l-2 border-r-2 border-white";
  } else {
    containerPadding = `${(1 / rawAspectRatio) * 100}%`;
    containerClass = "border-l-2 border-r-2 border-white";
  }

  return (
    <div className="w-full">
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
            {!noInsetPadding && (
              <div className={`absolute inset-0 z-10 pointer-events-none ${containerClass}`}></div>
            )}
            
            <div className="absolute inset-0">
              {isCinematic ? (
                <div 
                  className="absolute w-full" 
                  style={{
                    top: verticalPadding,
                    bottom: verticalPadding,
                    height: `calc(100% - ${verticalPadding} - ${verticalPadding})`
                  }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    className="object-contain w-full h-full transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    quality={quality}
                    width={dimensions.width}
                    height={dimensions.height}
                    placeholder={blurDataUrl ? "blur" : "empty"}
                    blurDataURL={blurDataUrl}
                    loading={priority ? "eager" : "lazy"}
                  />
                </div>
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain object-center transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={priority}
                  quality={quality}
                  placeholder={blurDataUrl ? "blur" : "empty"}
                  blurDataURL={blurDataUrl}
                  loading={priority ? "eager" : "lazy"}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-sm text-secondary italic text-center max-w-prose mx-auto">
          {caption}
        </p>
      )}
    </div>
  )
}