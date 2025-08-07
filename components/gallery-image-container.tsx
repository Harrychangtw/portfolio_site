"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useIsMobile } from "../hooks/use-mobile"
import { GalleryLoadingSkeleton } from "./gallery-loading-skeleton"
import { useIntersectionObserver } from "../hooks/use-intersection-observer"

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
  const containerRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver({
    elementRef: containerRef as React.RefObject<Element>,
    rootMargin: '50px'
  })
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [blurComplete, setBlurComplete] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const isMobile = useIsMobile()

  // Get thumbnail URL for blur-up loading
  const thumbnailSrc = src?.replace('.webp', '-thumb.webp')

  // Calculate border thickness as 0.01 (1%) of container width
  // Min 1px, max 4px on mobile and 6px on desktop
  const minThickness = isMobile ? 1 : 1
  const maxThickness = isMobile ? 4 : 6
  const borderThickness = `clamp(${minThickness}px, 0.01 * 100%, ${maxThickness}px)`

  // Responsive internal padding in pixels
  const insetPadding = noInsetPadding ? 0 : (isMobile ? 4 : 7)

  // Reset loading states when source changes
  useEffect(() => {
    setBlurComplete(false)
    setLoading(true)
    setImageError(false)
  }, [src])

  useEffect(() => {
    if (!isVisible && !priority && !hasLoadedOnce) return
    
    if (typeof window === 'undefined') return
    
    if (providedAspectRatio) {
      const width = 1200
      setDimensions({ 
        width, 
        height: Math.round(width / providedAspectRatio)
      })
      setLoading(false)
      return
    }
    
    const img = new window.Image()
    
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
      setLoading(false)
      setHasLoadedOnce(true)
    }
    
    img.onerror = () => {
      setImageError(true)
      setLoading(false)
    }
    
    img.src = src
  }, [src, providedAspectRatio, isVisible, priority, hasLoadedOnce])

  // Calculate aspect ratio from dimensions
  const rawAspectRatio = dimensions.width / dimensions.height
  const isPortrait = rawAspectRatio < 1
  const isCinematic = rawAspectRatio >= 2.2 && rawAspectRatio <= 2.4
  const targetRatio = 1.5
  
  let containerPadding
  let horizontalPadding = '0px'
  let verticalPadding = '0px'
  let containerClass = ""
  
  if (isPortrait) {
    containerPadding = `${(1 / rawAspectRatio) * 100}%`
    const relativeWidth = (rawAspectRatio / targetRatio) * 100
    horizontalPadding = `${(100 - relativeWidth) / 2}%`
    containerClass = `border-t-[${borderThickness}] border-b-[${borderThickness}] border-white`
  } else if (isCinematic) {
    containerPadding = `${(1 / targetRatio) * 100}%`
    const cinematic_height_percentage = (targetRatio / rawAspectRatio) * 100
    verticalPadding = `${(100 - cinematic_height_percentage) / 2}%`
    containerClass = `border-l-[${borderThickness}] border-r-[${borderThickness}] border-white`
  } else {
    containerPadding = `${(1 / rawAspectRatio) * 100}%`
    containerClass = `border-l-[${borderThickness}] border-r-[${borderThickness}] border-white`
  }

  return (
    <figure className="w-full" ref={containerRef}>
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
                {(isVisible || priority || hasLoadedOnce) && (
                  <>
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
                    
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className={`object-contain object-center transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                      sizes="100vw"
                      priority={priority}
                      quality={quality}
                      onLoad={() => setBlurComplete(true)}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}