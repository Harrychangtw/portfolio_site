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
    elementRef: containerRef,
    rootMargin: '50px'
  })
  const [blurComplete, setBlurComplete] = useState(false)
  
  // Get the full resolution image URL and thumbnail
  const fullImageUrl = imageUrl?.replace('-thumb.webp', '.webp')
  const thumbnailSrc = imageUrl

  // Prefetch full resolution image on hover
  const prefetchFullImage = () => {
    if (typeof window !== 'undefined' && fullImageUrl) {
      const imgElement = new window.Image()
      imgElement.src = fullImageUrl
    }
  }

  const shouldLoad = isVisible || priority || index < 6 // Load first 6 images immediately

  return (
    <motion.div 
      ref={containerRef}
      className="group relative"
      whileHover={{ 
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      onHoverStart={prefetchFullImage}
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative overflow-hidden bg-muted mb-3">
          {/* Image container with 3:2 aspect ratio (height = width * 2/3) */}
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {shouldLoad && (
                <>
                  {/* Thumbnail for blur-up effect */}
                  {!blurComplete && thumbnailSrc && (
                    <Image
                      src={thumbnailSrc}
                      alt={title}
                      fill
                      className={`object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={20}
                    />
                  )}
                  
                  {/* Full resolution image */}
                  <Image
                    src={fullImageUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority || index < 3}
                    quality={90}
                    onLoadingComplete={() => setBlurComplete(true)}
                  />
                </>
              )}

              {!shouldLoad && (
                <div className="absolute inset-0 bg-muted animate-pulse overflow-hidden">
                  <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                </div>
              )}
            </div>
          </div>

          {/* Status indicators in the top-right corner */}
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
        </div>

        <div className="px-1">
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-secondary text-sm">
            {category}
            {subcategory && ` • ${subcategory}`}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

