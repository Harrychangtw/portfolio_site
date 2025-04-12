import type { Metadata } from "next"
import GalleryCard from "@/components/gallery-card"
import { getAllGalleryMetadata } from "@/lib/markdown"
import { createBalancedLayout } from "@/components/AspectRatioBalancedLayout"

export const metadata: Metadata = {
  title: "Gallery | Harry Chang",
  description: "A collection of visual explorations and photography by Harry Chang",
}

export default function GalleryPage() {
  const galleryItems = getAllGalleryMetadata()
  
  // Handle pinned items (maintain their positions in the layout)
  const getPinnedItemsMap = (items: typeof galleryItems) => {
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

  // Create a balanced layout
  const layoutResult = createBalancedLayout(galleryItems, getPinnedItemsMap(galleryItems));

  return (
    <div className="page-transition-enter">
      <div className="container py-16 md:py-24">
        <h1 className="font-space-grotesk text-4xl font-bold mb-12">Photo Gallery</h1>
        {galleryItems.length === 0 ? (
          <p className="font-ibm-plex text-muted-foreground">No gallery items found. Create some in the content/gallery directory.</p>
        ) : (
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4">
            {layoutResult.columns.map((column, colIndex) => (
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
                    priority={layoutItem.itemIndex < 3}
                    index={layoutItem.itemIndex}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

