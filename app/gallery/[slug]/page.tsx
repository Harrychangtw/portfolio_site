import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

// This would normally come from a database or CMS
const galleryItems = [
  {
    slug: "cursor-ai",
    title: "Cursor AI",
    description: "Exploring the future of AI-assisted coding",
    content: "Detailed gallery item description would go here...",
    imageUrl: "/placeholder.svg?height=800&width=1200",
    date: "2023-05-15",
  },
  {
    slug: "thinkspace",
    title: "Thinkspace",
    description: "Artificial AI agents for creative exploration",
    content: "Detailed gallery item description would go here...",
    imageUrl: "/placeholder.svg?height=800&width=1200",
    date: "2023-03-22",
  },
  // Add more gallery items here
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = galleryItems.find((i) => i.slug === params.slug)

  if (!item) {
    return {
      title: "Gallery Item Not Found",
    }
  }

  return {
    title: `${item.title} | Gallery`,
    description: item.description,
  }
}

export async function generateStaticParams() {
  return galleryItems.map((item) => ({
    slug: item.slug,
  }))
}

export default function GalleryItemPage({ params }: { params: { slug: string } }) {
  const item = galleryItems.find((i) => i.slug === params.slug)

  if (!item) {
    notFound()
  }

  return (
    <div className="page-transition-enter">
      <div className="container py-12">
        <Link
          href="/gallery"
          className="inline-flex items-center text-secondary hover:text-primary mb-12 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to gallery
        </Link>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">{item.title}</h1>
              <p className="text-secondary">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xl">{item.description}</p>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-muted mb-12">
            <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
          </div>

          <div className="prose prose-lg max-w-none">
            <p>{item.content}</p>
            {/* More content would go here */}
          </div>
        </div>
      </div>
    </div>
  )
}

