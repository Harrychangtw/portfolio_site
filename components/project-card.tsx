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
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-all duration-700 ease-in-out group-hover:brightness-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
            <div className="uppercase text-xs tracking-wider text-white/80">{category}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

