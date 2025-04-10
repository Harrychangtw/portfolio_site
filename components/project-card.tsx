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
  pinned?: boolean
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
    threshold: 0.1
  })

  const [blurComplete, setBlurComplete] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const thumbnailSrc = imageUrl
  const fullImageUrl = imageUrl?.replace('-thumb.webp', '.webp') || "/placeholder.svg";

  const shouldLoadImmediately = priority || index < 3
  const shouldLoad = shouldLoadImmediately || isVisible || hasLoadedOnce;

  // Effect to track if the component has ever been loaded/visible
  useEffect(() => {
    if (shouldLoad && !hasLoadedOnce) {
        // Note: We set hasLoadedOnce in onLoadingComplete now
    }
  }, [shouldLoad, hasLoadedOnce]);


  return (
    <motion.div
      ref={containerRef}
      className="group relative project-card-container" // No flex here
      whileHover={{
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/projects/${slug}`} className="flex flex-col h-full"> {/* Stacks children vertically */}

        {/* Image container with fixed aspect ratio */}
        <div className="relative overflow-hidden bg-muted">
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {shouldLoad ? (
                <>
                  {/* Thumbnail image */}
                  {thumbnailSrc && (
                    <Image
                      src={thumbnailSrc}
                      alt={`${title} thumbnail`}
                      fill
                      className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={20}
                      priority={shouldLoadImmediately}
                      loading={shouldLoadImmediately ? 'eager' : 'lazy'}
                    />
                  )}

                  {/* Full resolution image */}
                  <Image
                    src={fullImageUrl}
                    alt={title}
                    fill
                    className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                    onLoadingComplete={() => {
                      setBlurComplete(true)
                      if (!hasLoadedOnce) setHasLoadedOnce(true)
                    }}
                    priority={shouldLoadImmediately}
                    loading={shouldLoadImmediately ? 'eager' : 'lazy'}
                    onError={(e) => {
                        console.error("Image failed to load:", fullImageUrl, e);
                        setBlurComplete(true); // Ensure transition completes on error
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
          {(pinned || locked) && (
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              {pinned && (
                <div className="bg-[#D8F600] text-black p-1.5 rounded-full shadow-md">
                  <PinIcon className="h-4 w-4" />
                </div>
              )}
              {locked && (
                <div className="bg-secondary text-white p-1.5 rounded-full shadow-md">
                  <LockIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          )}
        </div> {/* End Image Container Div */}

        {/* Content area */}
        {/* Changed p-4 to pt-4 pb-4 for vertical padding only */}
        <div className="pt-4 pb-4 mt-auto">
          {/* Removed min-h, changed mb-2 to mb-1 */}
          <h3 className="text-lg font-medium mb-1 line-clamp-2">{title}</h3>
          {/* Removed min-h */}
          <p className="text-secondary text-sm">
            {category}
            {subcategory && ` • ${subcategory}`}
          </p>
        </div> {/* End Content Area Div */}

      </Link> {/* End Link */}
    </motion.div> // End Motion Div
  )
}