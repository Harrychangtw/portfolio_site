import type { Metadata } from "next"
import { getAllGalleryMetadata } from "@/lib/markdown"
import GalleryLayout from "@/components/gallery-layout"

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
        <GalleryLayout galleryItems={galleryItems} />
      </div>
    </div>
  )
}

