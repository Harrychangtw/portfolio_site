"use client"

import { useEffect, useState } from "react"
import GalleryCard from "./gallery-card"
import { GalleryItemMetadata } from "@/lib/markdown"
import { createBalancedLayout } from "./AspectRatioBalancedLayout"

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

  // Handle pinned items (maintain their positions in the layout)
  const getPinnedItemsMap = (items: GalleryItemMetadata[]) => {
    const pinnedMap = new Map<number, { rowIndex: number, columnIndex: number }>();
    
    items.forEach((item, index) => {
      // Check if item is pinned (pinned value is a number >= 0)
      if (typeof item.pinned === 'number' && item.pinned >= 0) {
        // Calculate position based on pin order
        // Pin order starts at 1, rows are 0-indexed
        const pinOrder = item.pinned - 1; // Convert 1-based to 0-based
        const naturalRow = Math.floor(pinOrder / 3);
        const naturalColumn = pinOrder % 3;
        
        pinnedMap.set(index, {
          rowIndex: naturalRow,
          columnIndex: naturalColumn
        });
      }
    });
    
    return pinnedMap;
  };

  // Create a balanced layout using our new algorithm
  const layoutResult = isLoading ? null : createBalancedLayout(galleryItems, getPinnedItemsMap(galleryItems));

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
          <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-4">
            {layoutResult && layoutResult.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex-1 space-y-2 md:space-y-4">
                {column.map((layoutItem) => (
                  <GalleryCard
                    key={layoutItem.item.slug}
                    title={layoutItem.item.title}
                    quote={layoutItem.item.quote}
                    slug={layoutItem.item.slug}
                    imageUrl={layoutItem.item.imageUrl}
                    pinned={layoutItem.item.pinned}
                    locked={layoutItem.item.locked}
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

