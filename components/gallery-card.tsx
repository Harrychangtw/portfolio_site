"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LockIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface GalleryCardProps {
  title: string
  quote: string
  slug: string
  imageUrl: string
  pinned?: number
  locked?: boolean
}

export default function GalleryCard({ title, slug, imageUrl, pinned, locked }: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [originalAspect, setOriginalAspect] = useState<number>(1.25)
  const [isPortrait, setIsPortrait] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("80%")
  const router = useRouter()
  const isNavigating = useRef(false)

  // Load and determine image dimensions
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const imgElement = new window.Image();
    
    imgElement.onload = () => {
      if (imgElement.height > 0) {
        const rawAspectRatio = imgElement.width / imgElement.height;
        setOriginalAspect(rawAspectRatio);
        setIsPortrait(rawAspectRatio < 1);
        
        const maxLandscapeRatio = 1.25; // 5:4
        const minPortraitRatio = 0.8; // 4:5
        
        let constrainedRatio = rawAspectRatio;
        
        if (isPortrait && rawAspectRatio < minPortraitRatio) {
          constrainedRatio = minPortraitRatio;
        } else if (!isPortrait && rawAspectRatio > maxLandscapeRatio) {
          constrainedRatio = maxLandscapeRatio;
        }
        
        setAspectRatio(`${(1 / constrainedRatio) * 100}%`);
      }
      setImageLoaded(true);
    };
    
    imgElement.src = imageUrl || "/placeholder.svg";
  }, [imageUrl, isPortrait]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isNavigating.current) return;
    
    e.preventDefault();
    isNavigating.current = true;

    // Start navigation immediately
    router.push(`/gallery/${slug}`);
  };

  return (
    <motion.div 
      className="group relative"
      whileHover={{ 
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/gallery/${slug}`} onClick={handleNavigation} className="block">
        <div className="relative overflow-hidden bg-white">
          <div className="relative">
            <div 
              className={`absolute inset-0 z-10 pointer-events-none ${
                isPortrait 
                  ? "border-t-4 border-b-4 border-white" 
                  : "border-l-4 border-r-4 border-white"
              }`}
            ></div>
            
            <div 
              className="relative w-full overflow-hidden" 
              style={{ paddingBottom: aspectRatio }}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  fill
                  className={`transition-all duration-700 ease-in-out group-hover:brightness-95 ${
                    (isPortrait && originalAspect < 0.8) || (!isPortrait && originalAspect > 1.25)
                    ? "object-contain" : "object-cover"
                  } object-center`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
          
          {locked && (
            <div className="absolute top-3 right-3 flex gap-2 z-20">
              <div className="bg-secondary text-white p-1.5 rounded-full shadow-md">
                <LockIcon className="h-4 w-4" />
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}