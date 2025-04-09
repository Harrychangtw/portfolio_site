"use client"

import { GalleryItemMetadata } from "@/lib/markdown"
import GalleryCard from "./gallery-card"
import { createBalancedLayout } from "./AspectRatioBalancedLayout"

interface GalleryLayoutProps {
  galleryItems: GalleryItemMetadata[]
}

export default function GalleryLayout({ galleryItems }: GalleryLayoutProps) {
  // Handle pinned items (maintain their positions in the layout)
  const getPinnedItemsMap = (items: GalleryItemMetadata[]) => {
    const pinnedMap = new Map<number, { rowIndex: number, columnIndex: number }>();
    
    items.forEach((item, index) => {
      if (typeof item.pinned === 'number' && item.pinned >= 0) {
        const pinOrder = item.pinned - 1;
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

  if (galleryItems.length === 0) {
    return (
      <p className="text-muted-foreground">No gallery items found. Create some in the content/gallery directory.</p>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-4">
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}