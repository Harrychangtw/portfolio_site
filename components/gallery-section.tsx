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

  // Organize gallery items into three columns
  const organizeInColumns = (items: GalleryItemMetadata[]) => {
    const columns = [[], [], []] as GalleryItemMetadata[][];
    
    // Distribute items into columns sequentially
    items.forEach((item, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(item);
    });
    
    return columns;
  };

  const columns = organizeInColumns(galleryItems);

  return (
    <section id="gallery" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row w-full gap-4 md:gap-6">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex-1 space-y-4 md:space-y-6">
                {column.map((item) => (
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

