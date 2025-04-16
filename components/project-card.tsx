"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PinIcon, LockIcon } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useIsMobile } from "@/hooks/use-mobile"

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

  const isMobile = useIsMobile();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  // Tooltip handlers for locked cards
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isMobile && locked) {
      setTooltip({ visible: true, x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile && locked && tooltip.visible) {
      setTooltip({ ...tooltip, x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile && locked) {
      setTooltip({ visible: false, x: 0, y: 0 });
    }
  };

  const CardContent = (
    <>
      <div className="relative overflow-hidden bg-muted">
        {/* Strict 3:2 aspect ratio container */}
        <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
          <div className="absolute inset-0">
            {shouldLoad ? (
              <>
                {thumbnailSrc && !blurComplete && (
                  <Image
                    src={thumbnailSrc}
                    alt={`${title} thumbnail`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
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
                  className={`object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={shouldLoadImmediately}
                  quality={90}
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

      {/* Content area with fixed height and padding */}
      <div className="pt-3">
        <h3 className="font-space-grotesk text-lg font-medium line-clamp-1">{title}</h3>
          <p className="font-ibm-plex text-secondary text-sm mt-0.5 mb-4">
          {category}
          {subcategory && ` • ${subcategory}`}
          </p>
      </div>
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      className="group relative flex flex-col"
      whileHover={!locked ? {
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      } : {}}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {locked ? (
        <div className="block cursor-not-allowed">{CardContent}</div>
      ) : (
        <Link href={`/projects/${slug}`} className="block">
          {CardContent}
        </Link>
      )}
      {/* Tooltip for locked projects */}
      {locked && tooltip.visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bg-[#D8F600] text-black text-sm px-3 py-1 rounded shadow-lg font-space-grotesk z-50"
          style={{ top: tooltip.y - 40, left: tooltip.x, pointerEvents: 'none', transform: 'translateX(-50%)' }}
        >
          Project under construction...
        </motion.div>
      )}
    </motion.div>
  )
}