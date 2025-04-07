import type { Metadata } from "next"
import GalleryCard from "@/components/gallery-card"
import { getAllGalleryMetadata } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Gallery | Harry Chang",
  description: "A collection of visual explorations and photography by Harry Chang",
}

export default function GalleryPage() {
  const galleryItems = getAllGalleryMetadata()

  return (
    <div className="page-transition-enter">
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl font-heading font-bold mb-12">Photo Gallery</h1>
        {galleryItems.length === 0 ? (
          <p className="text-muted-foreground">No gallery items found. Create some in the content/gallery directory.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <GalleryCard
                key={item.slug}
                title={item.title}
                quote={item.quote}
                slug={item.slug}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

