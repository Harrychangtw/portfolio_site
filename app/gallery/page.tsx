import type { Metadata } from "next"
import GalleryCard from "@/components/gallery-card"

export const metadata: Metadata = {
  title: "Gallery | Harry Chang",
  description: "A collection of visual explorations and photography by Harry Chang",
}

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Cursor AI",
      quote: "Exploring the future of AI-assisted coding",
      slug: "cursor-ai",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Thinkspace",
      quote: "Artificial AI agents for creative exploration",
      slug: "thinkspace",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Skiff Icons",
      quote: "Branding & systems design for privacy-focused tools",
      slug: "skiff-icons",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Aiga Hue",
      quote: "Data visualization experiments",
      slug: "aiga-hue",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Light Engine",
      quote: "Computational design systems",
      slug: "light-engine",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Metalink Labs",
      quote: "Design systems for web3",
      slug: "metalink-labs",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
  ]

  return (
    <div className="page-transition-enter">
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl font-heading font-bold mb-12">Photo Gallery</h1>
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
      </div>
    </div>
  )
}

