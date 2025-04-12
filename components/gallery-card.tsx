"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LockIcon } from "lucide-react"
import { useIntersectionObserver } from "../hooks/use-intersection-observer"

interface GalleryCardProps {
  title: string
  quote: string
  slug: string
  imageUrl: string
  pinned?: number
  locked?: boolean
  priority?: boolean
  index?: number
}

export default function GalleryCard({ 
  title, 
  quote, 
  slug, 
  imageUrl, 
  pinned, 
  locked,
  priority = false,
  index = 0
}: GalleryCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver({
    elementRef: containerRef as React.RefObject<Element>,
    rootMargin: '50px'
  })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("80%")
  const [originalAspect, setOriginalAspect] = useState<number>(1.25)
  const [isPortrait, setIsPortrait] = useState(false)
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

  // Detect original image dimensions when possible
  useEffect(() => {
    if (!isVisible && !priority) return

    if (typeof window !== 'undefined') {
      const imgElement = new window.Image()
      
      imgElement.onload = () => {
        if (imgElement.height > 0) {
          const rawAspectRatio = imgElement.width / imgElement.height
          setOriginalAspect(rawAspectRatio)
          setIsPortrait(rawAspectRatio < 1)
          
          // Apply aspect ratio constraints
          const maxLandscapeRatio = 1.25 // 5:4
          const minPortraitRatio = 0.8 // 4:5
          
          let constrainedRatio = rawAspectRatio
          
          if (rawAspectRatio < minPortraitRatio) {
            constrainedRatio = minPortraitRatio
          } else if (rawAspectRatio > maxLandscapeRatio) {
            constrainedRatio = maxLandscapeRatio
          }
          
          setAspectRatio(`${(1 / constrainedRatio) * 100}%`)
        }
        setImageLoaded(true)
      }
      
      imgElement.onerror = () => {
        setImageLoaded(true)
      }
      
      imgElement.src = imageUrl || "/placeholder.svg"
    }
  }, [imageUrl, isVisible, priority])

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
      <Link href={`/gallery/${slug}`} className="block">
        <div className="relative overflow-hidden bg-white">
          {/* Container for the image and border */}
          <div className="relative">
            {/* Border overlay */}
            <div 
              className={`absolute inset-0 z-10 pointer-events-none ${
                isPortrait 
                  ? "border-t-4 border-b-4 border-white" 
                  : "border-l-4 border-r-4 border-white"
              }`}
            ></div>
            
            {/* Image container */}
            <div 
              className="relative w-full overflow-hidden" 
              style={{ paddingBottom: aspectRatio }}
            >
              <div className="absolute inset-0 w-full h-full">
                {shouldLoad && (
                  <>
                    {!blurComplete && thumbnailSrc && (
                      <Image
                        src={thumbnailSrc}
                        alt={title}
                        fill
                        className={`transition-all duration-700 ease-in-out group-hover:brightness-95 ${
                          (isPortrait && originalAspect < 0.8) || (!isPortrait && originalAspect > 1.25)
                            ? "object-contain" : "object-cover"
                        } object-center ${blurComplete ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={20}
                      />
                    )}
                    
                    <Image
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={title}
                      fill
                      className={`transition-all duration-700 ease-in-out group-hover:brightness-95 ${
                        (isPortrait && originalAspect < 0.8) || (!isPortrait && originalAspect > 1.25)
                          ? "object-contain" : "object-cover"
                      } object-center ${blurComplete ? 'opacity-100' : 'opacity-0'}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={priority || index < 3}
                      quality={90}
                      onLoadingComplete={() => setBlurComplete(true)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Status indicators */}
          {locked && (
            <div className="absolute top-3 right-3 flex gap-2 z-20">
              <div className="bg-secondary text-white p-1.5 rounded-full shadow-md">
                <LockIcon className="h-4 w-4" />
              </div>
            </div>
          )}
          
          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <h3 className="font-space-grotesk text-lg font-medium text-white">{title}</h3>
            <p className="font-ibm-plex text-sm text-white/80 mt-1">{quote}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}