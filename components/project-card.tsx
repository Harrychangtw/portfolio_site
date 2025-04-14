"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PinIcon, LockIcon } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface ProjectCardProps {
  title: string
  category: string
  subcategory?: string
  slug: string
  imageUrl: string
  pinned?: number  // Changed from boolean to number
  locked?: boolean
  priority?: boolean
  index?: number
}

export default function ProjectCard({
  title,
  category,
  subcategory,
  slug,
  imageUrl,
  pinned,
  locked,
  priority = false,
  index = 0
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver({
    elementRef: containerRef as React.RefObject<Element>,
    rootMargin: '50px',
    threshold: 0.1 // Keep the threshold if desired
  })

  const [blurComplete, setBlurComplete] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const thumbnailSrc = imageUrl
  // Provide a fallback empty string or placeholder if replace fails or imageUrl is null/undefined
  const fullImageUrl = imageUrl ? imageUrl.replace('-thumb.webp', '.webp') : "/placeholder.svg";

  const shouldLoadImmediately = priority || (index !== undefined && index < 3)
  // Ensure isVisible check happens only after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shouldLoad = shouldLoadImmediately || (mounted && isVisible) || hasLoadedOnce;

  // Effect to track if the component has ever been loaded/visible based on image load completion
  useEffect(() => {
    // This effect is primarily handled by onLoad now
  }, [shouldLoad, hasLoadedOnce]);


  return (
    <motion.div
      ref={containerRef}
      className="group relative"
      whileHover={{
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/projects/${slug}`} className="block">

        {/* Image container with fixed aspect ratio */}
        {/* --- Re-added mb-3 for spacing --- */}
        <div className="relative overflow-hidden bg-muted mb-3">
          {/* Aspect ratio padding div */}
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            {/* Absolute container for images */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {shouldLoad ? (
                <>
                  {/* Thumbnail image */}
                  {thumbnailSrc && !blurComplete && ( // Only render thumbnail if blur isn't complete
                    <Image
                      src={thumbnailSrc}
                      alt={`${title} thumbnail`}
                      fill
                      // Added project-image class if used elsewhere, keep object-cover
                      className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={20}
                      // No priority/loading on thumbnail usually needed if full image loads eagerly
                      loading={'lazy'} // Thumbnail can usually be lazy
                    />
                  )}

                  {/* Full resolution image - Removed duplicate */}
                  <Image
                    src={fullImageUrl || "/placeholder.svg"} // Added fallback again
                    alt={title}
                    fill
                    // Added project-image class if used elsewhere, keep object-cover
                    className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                    onLoad={() => {
                      setBlurComplete(true)
                      // Set hasLoadedOnce here guarantees the image actually loaded
                      if (!hasLoadedOnce) setHasLoadedOnce(true)
                    }}
                    priority={shouldLoadImmediately} // Use calculated priority
                    loading={shouldLoadImmediately ? 'eager' : 'lazy'} // Use calculated loading
                    onError={(e) => {
                       console.error("Image failed to load:", fullImageUrl, e);
                       setBlurComplete(true); // Ensure transition completes on error
                       // Optionally set hasLoadedOnce here too, or handle differently
                       if (!hasLoadedOnce) setHasLoadedOnce(true);
                    }}
                  />
                </>
              ) : (
                // Placeholder
                <div className="absolute inset-0 bg-muted animate-pulse overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                </div>
              )}
            </div>
          </div>

          {/* Status indicators */}
          {locked && (
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <div className="bg-secondary text-white p-1.5 rounded-full shadow-md">
                <LockIcon className="h-4 w-4" />
              </div>
            </div>
          )}
        </div> {/* End Image Container Div */}

        {/* Content area */}
        {/* --- Reverted text container className, added pt-2 for top padding --- */}
        {/* Adjust pt-2 and pb-1 as needed for desired spacing */}
        <div className="px-1 pt-2 pb-1">
          {/* line-clamp-2 can optionally truncate long titles */}
          <h3 className="font-space-grotesk text-lg font-medium mb-1 line-clamp-2">{title}</h3>
          <p className="font-ibm-plex text-secondary text-sm">
            {category}
            {subcategory && ` • ${subcategory}`}
          </p>
        </div> {/* End Content Area Div */}

      </Link> {/* End Link */}
    </motion.div> // End Motion Div
  )
}