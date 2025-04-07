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

export default function ProjectCard({ title, category, subcategory, slug, imageUrl }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group">
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted mb-4">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="uppercase text-xs tracking-wider text-secondary mb-1">{category}</div>
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="text-xs text-secondary uppercase">{subcategory}</div>
      </Link>
    </motion.div>
  )
}

