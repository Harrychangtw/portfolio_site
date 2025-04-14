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
    threshold: 0.1
  })

  const [blurComplete, setBlurComplete] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const thumbnailSrc = imageUrl
  const fullImageUrl = imageUrl ? imageUrl.replace('-thumb.webp', '.webp') : "/placeholder.svg"

  const shouldLoadImmediately = priority || (index !== undefined && index < 3)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const shouldLoad = shouldLoadImmediately || (mounted && isVisible) || hasLoadedOnce

  return (
    <motion.div
      ref={containerRef}
      className="group relative flex flex-col h-full"
      whileHover={{
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/projects/${slug}`} className="block flex-1 flex flex-col h-full">
        <div className="relative overflow-hidden bg-muted mb-3">
          {/* Fixed aspect ratio container */}
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            <div className="absolute inset-0 w-full h-full">
              {shouldLoad ? (
                <>
                  {thumbnailSrc && !blurComplete && (
                    <Image
                      src={thumbnailSrc}
                      alt={`${title} thumbnail`}
                      fill
                      className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={20}
                      onLoad={() => {
                        if (!hasLoadedOnce) setHasLoadedOnce(true);
                      }}
                    />
                  )}
                  <Image
                    src={fullImageUrl}
                    alt={title}
                    fill
                    className={`project-image object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={shouldLoadImmediately}
                    loading={shouldLoadImmediately ? 'eager' : 'lazy'}
                    onLoad={() => setBlurComplete(true)}
                    onError={(e) => {
                      console.error("Image failed to load:", fullImageUrl, e);
                      setBlurComplete(true);
                      if (!hasLoadedOnce) setHasLoadedOnce(true);
                    }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-muted animate-pulse">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                </div>
              )}
            </div>
          </div>

          {locked && (
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <div className="bg-secondary text-white p-1.5 rounded-full shadow-md">
                <LockIcon className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>

        {/* Content area with fixed height */}
        <div className="px-1 flex-1 flex flex-col min-h-[4.5rem]">
          <h3 className="font-space-grotesk text-lg font-medium mb-1 line-clamp-2">{title}</h3>
          <p className="font-ibm-plex text-secondary text-sm">
            {category}
            {subcategory && ` • ${subcategory}`}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}