import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getGalleryItemData, getAllGallerySlugs } from "@/lib/markdown"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getGalleryItemData(params.slug)

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
  const paths = getAllGallerySlugs()
  return paths
}

export default async function GalleryItemPage({ params }: { params: { slug: string } }) {
  const item = await getGalleryItemData(params.slug)

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
            <Image 
              src={item.imageUrl || "/placeholder.svg"} 
              alt={item.title} 
              fill 
              className="object-cover" 
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px" 
            />
          </div>

          {/* Display additional images if available */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {item.gallery.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={image.url}
                    alt={image.caption || `${item.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
        </div>
      </div>
    </div>
  )
}

