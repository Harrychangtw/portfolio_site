"use client"

import { useEffect, useState, useRef } from "react"
import GalleryCard from "./gallery-card"
import { GalleryItemMetadata } from "@/lib/markdown"
import { createBalancedLayout } from "./AspectRatioBalancedLayout"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver({
    elementRef: sectionRef as React.RefObject<Element>,
    rootMargin: '100px'
  })

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

    if (isVisible) {
      fetchGalleryItems()
    }
  }, [isVisible])

  // Handle pinned items (maintain their positions in the layout)
  const getPinnedItemsMap = (items: GalleryItemMetadata[]) => {
    const pinnedMap = new Map<number, { rowIndex: number, columnIndex: number }>()
    
    items.forEach((item, index) => {
      if (typeof item.pinned === 'number' && item.pinned >= 0) {
        const pinOrder = item.pinned - 1
        const naturalRow = Math.floor(pinOrder / 3)
        const naturalColumn = pinOrder % 3
        
        pinnedMap.set(index, {
          rowIndex: naturalRow,
          columnIndex: naturalColumn
        })
      }
    })
    
    return pinnedMap
  }

  // Create a balanced layout using our algorithm
  const layoutResult = isLoading ? null : createBalancedLayout(galleryItems, getPinnedItemsMap(galleryItems))

  // Helper function to create a placeholder with a specific aspect ratio
  const renderPlaceholderCard = (aspectRatio: string, index: number) => (
    <div key={index} className="mb-2 md:mb-4">
      <div className="relative overflow-hidden bg-white">
        <div className="relative">
          <div className="absolute inset-0 z-10 pointer-events-none border-l-4 border-r-4 border-white"></div>
          
          <div 
            className="relative w-full overflow-hidden" 
            style={{ paddingBottom: aspectRatio }}
          >
            <div className="absolute inset-0 w-full h-full">
              <div className="w-full h-full bg-muted animate-pulse overflow-hidden">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} id="gallery" className="py-12 md:py-16">
      <div className="container">
        <h2 className="font-space-grotesk text-3xl font-bold mb-8">Gallery</h2>
        {isLoading ? (
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-[var(--column-spacing)]" >
            <div className="flex-1 space-y-2 md:space-y-[var(--column-spacing)]">
              {renderPlaceholderCard("80%", 1)}
              {renderPlaceholderCard("125%", 2)}
            </div>
            
            <div className="flex-1 space-y-2 md:space-y-[var(--column-spacing)]">
              {renderPlaceholderCard("125%", 3)}
              {renderPlaceholderCard("80%", 4)}
            </div>
            
            <div className="flex-1 space-y-2 md:space-y-[var(--column-spacing)]">
              {renderPlaceholderCard("80%", 5)}
              {renderPlaceholderCard("125%", 6)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-[var(--column-spacing)]">
            {layoutResult && layoutResult.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex-1 space-y-2 md:space-y-[var(--column-spacing)]">
                {column.map((layoutItem) => (
                  <GalleryCard
                    key={layoutItem.item.slug}
                    title={layoutItem.item.title}
                    quote={layoutItem.item.quote}
                    slug={layoutItem.item.slug}
                    imageUrl={layoutItem.item.imageUrl}
                    pinned={layoutItem.item.pinned}
                    locked={layoutItem.item.locked}
                    priority={layoutItem.itemIndex < 3}
                    index={layoutItem.itemIndex}
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

