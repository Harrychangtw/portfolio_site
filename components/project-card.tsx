"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  category: string
  subcategory: string
  slug: string
  imageUrl: string
}

export default function ProjectCard({ title, category, slug, imageUrl }: ProjectCardProps) {
  return (
    <motion.div 
      className="group relative"
      whileHover={{ 
        scale: 0.99,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted mb-3">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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

