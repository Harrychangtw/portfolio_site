"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PinIcon, LockIcon } from "lucide-react"

interface ProjectCardProps {
  title: string
  category: string
  subcategory?: string
  slug: string
  imageUrl: string
  pinned?: boolean
  locked?: boolean
}

export default function ProjectCard({ title, category, slug, imageUrl, pinned, locked }: ProjectCardProps) {
  return (
    <motion.div 
      className="group relative"
      whileHover={{ 
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative overflow-hidden bg-muted mb-3">
          {/* Using a container with specific aspect ratio constraints */}
          <div className="relative w-full pb-[66.67%]"> {/* 3:2 aspect ratio */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                loading="eager"
                priority={true}
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
          {/* This overlay provides just the darkening effect on hover, without text */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        {/* Project info displayed below the image */}
        <div className="px-1">
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <div className="uppercase text-xs tracking-wider text-secondary">{category}</div>
        </div>
      </Link>
    </motion.div>
  )
}

