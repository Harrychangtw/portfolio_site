"use client"

import { useEffect, useState } from "react"
import GalleryCard from "./gallery-card"
import { GalleryItemMetadata } from "@/lib/markdown"

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const response = await fetch('/api/gallery')
        const data = await response.json()
        setGalleryItems(data)
      } catch (error) {
        console.error('Failed to fetch gallery items:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  return (
    <section id="gallery" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {galleryItems.map((item) => (
              <GalleryCard
                key={item.slug}
                title={item.title}
                quote={item.quote}
                slug={item.slug}
                imageUrl={item.imageUrl}
                pinned={item.pinned}
                locked={item.locked}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

