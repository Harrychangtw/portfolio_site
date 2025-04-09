"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LockIcon } from "lucide-react"

interface GalleryCardProps {
  title: string
  quote: string
  slug: string
  imageUrl: string
  pinned?: number  // Changed from boolean to number (-1 for not pinned, positive for pin order)
  locked?: boolean
}

export default function GalleryCard({ title, slug, imageUrl, pinned, locked }: GalleryCardProps) {
  const [aspectRatio, setAspectRatio] = useState("80%"); // Default 5:4 ratio
  const [originalAspect, setOriginalAspect] = useState<number>(1.25);
  const [isPortrait, setIsPortrait] = useState(false);

  // Ensure imageUrl is absolute and has a fallback
  const processedImageUrl = imageUrl?.startsWith('/') ? imageUrl : `/${imageUrl || 'placeholder.svg'}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const imgElement = new window.Image();
      imgElement.onload = () => {
        if (imgElement.height > 0) {
          const rawAspectRatio = imgElement.width / imgElement.height;
          setOriginalAspect(rawAspectRatio);
          const isImagePortrait = rawAspectRatio < 1;
          setIsPortrait(isImagePortrait);
          
          const maxLandscapeRatio = 1.25; // 5:4
          const minPortraitRatio = 0.8; // 4:5
          
          let constrainedRatio = rawAspectRatio;
          if (isImagePortrait && rawAspectRatio < minPortraitRatio) {
            constrainedRatio = minPortraitRatio;
          } else if (!isImagePortrait && rawAspectRatio > maxLandscapeRatio) {
            constrainedRatio = maxLandscapeRatio;
          }
          setAspectRatio(`${(1 / constrainedRatio) * 100}%`);
        }
      };
      imgElement.src = processedImageUrl;
    }
  }, [processedImageUrl]);

  return (
    <motion.div 
      className="group relative"
      whileHover={{ scale: 0.99, transition: { duration: 0.3, ease: "easeInOut" }}}
    >
      <Link href={`/gallery/${slug}`} className="block">
        <div className="relative overflow-hidden bg-white">
          <div className="relative">
            <div className={`absolute inset-0 z-10 pointer-events-none ${
              isPortrait ? "border-t-4 border-b-4 border-white" : "border-l-4 border-r-4 border-white"
            }`}></div>
            
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: aspectRatio }}>
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={processedImageUrl}
                  alt={title}
                  fill
                  loading="eager"
                  priority
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRsdHR4eIR0jJSgpJSgjISYmLDIwLiY+PDoyPj5BQUFBQUFBQUFBQUFBQUFBQUFBHx/2wBDAR"
                  placeholder="blur"
                  className={`transition-all duration-700 ease-in-out group-hover:brightness-95 ${
                    (isPortrait && originalAspect < 0.8) || (!isPortrait && originalAspect > 1.25)
                      ? "object-contain" : "object-cover"
                  } object-center`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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