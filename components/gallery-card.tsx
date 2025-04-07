"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface GalleryCardProps {
  title: string
  quote: string
  slug: string
  imageUrl: string
}

export default function GalleryCard({ title, quote, slug, imageUrl }: GalleryCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group relative">
      <Link href={`/gallery/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-background bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
            <p className="text-primary text-center">{quote}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

