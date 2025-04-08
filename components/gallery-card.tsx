"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PinIcon, LockIcon } from "lucide-react"

interface GalleryCardProps {
  title: string
  quote: string
  slug: string
  imageUrl: string
  pinned?: boolean
  locked?: boolean
}

export default function GalleryCard({ title, slug, imageUrl, pinned, locked }: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  // Default to a more natural 3:2 ratio (landscape photography standard) instead of 16:9
  const [aspectRatio, setAspectRatio] = useState("66.67%"); 

  // Detect original image dimensions when possible
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create an HTML image element instead of using the imported Next.js Image
      const imgElement = new window.Image();
      
      imgElement.onload = () => {
        // Calculate actual aspect ratio from the image
        if (imgElement.height > 0) {
          console.log(`Image loaded: ${imageUrl} with dimensions ${imgElement.width}x${imgElement.height}`);
          setAspectRatio(`${(imgElement.height / imgElement.width) * 100}%`);
        }
        setImageLoaded(true);
      };
      
      imgElement.onerror = () => {
        console.warn(`Failed to load image: ${imageUrl}, using default aspect ratio`);
        // Keep default aspect ratio on error
        setImageLoaded(true);
      };
      
      imgElement.src = imageUrl || "/placeholder.svg";
    }
  }, [imageUrl]);

  return (
    <motion.div 
      className="group relative"
      whileHover={{ 
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/gallery/${slug}`} className="block">
        <div className="relative overflow-hidden bg-muted">
          {/* Using dynamically calculated aspect ratio when available */}
          <div 
            className="relative w-full" 
            style={{ paddingBottom: aspectRatio }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover object-center transition-all duration-700 ease-in-out group-hover:brightness-95"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

