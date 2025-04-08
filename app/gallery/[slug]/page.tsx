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
      <div className="pb-12">
        {/* Full-width image section at the top */}
        <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-muted mb-8 md:mb-12">
          <Image 
            src={item.imageUrl || "/placeholder.svg"} 
            alt={item.title} 
            fill 
            className="object-cover" 
            priority
            sizes="100vw" 
          />
        </div>
        
        <div className="container">
          <Link
            href="/#gallery"
            className="inline-flex items-center text-secondary hover:text-primary mb-8 md:mb-12 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to gallery
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Left column - full width on mobile, now 4/12 (1/3) on desktop */}
            <div className="md:col-span-4 mb-10 md:mb-0">
              <div className="md:sticky md:top-24">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 md:mb-8">{item.title}</h1>
                <p className="text-secondary mb-6 md:mb-12">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {/* Intentional negative space below */}
              </div>
            </div>

            {/* Right column - full width on mobile, now 8/12 (2/3) on desktop */}
            <div className="md:col-span-8">
              {/* Description area */}
              <div className="mb-16 md:mb-24">
                <p className="text-lg md:text-xl mb-10 md:mb-16">{item.description}</p>
                
                {/* Additional attributes in a grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-12 mb-16 md:mb-24 text-secondary">
                  {item.camera && (
                    <div>
                      <p className="uppercase text-xs mb-1">Camera</p>
                      <p>{item.camera}</p>
                    </div>
                  )}
                  {item.lens && (
                    <div>
                      <p className="uppercase text-xs mb-1">Lens</p>
                      <p>{item.lens}</p>
                    </div>
                  )}
                  {item.location && (
                    <div>
                      <p className="uppercase text-xs mb-1">Location</p>
                      <p>{item.location}</p>
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div>
                      <p className="uppercase text-xs mb-1">Tags</p>
                      <p>{item.tags.join(", ")}</p>
                    </div>
                  )}
                  {/* Display pinned status if it exists */}
                  {item.pinned && (
                    <div>
                      <p className="uppercase text-xs mb-1">Status</p>
                      <p className="flex items-center">
                        <span className="inline-flex items-center">
                          <span className="h-2 w-2 rounded-full bg-[#D8F600] mr-2"></span>
                          Pinned
                        </span>
                      </p>
                    </div>
                  )}
                  {/* Display locked status if it exists */}
                  {item.locked && (
                    <div>
                      <p className="uppercase text-xs mb-1">{item.pinned ? "" : "Status"}</p>
                      <p className="flex items-center">
                        <span className="inline-flex items-center">
                          <span className="h-2 w-2 rounded-full bg-secondary mr-2"></span>
                          Locked
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Main content */}
              <div className="prose prose-lg max-w-none dark:prose-invert mb-16 md:mb-24" 
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

              {/* Gallery grid with generous spacing */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="grid grid-cols-1 gap-12 md:gap-24 mb-16 md:mb-24">
                  {item.gallery.map((image, index) => (
                    <div key={index} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-muted">
                      <Image
                        src={image.url}
                        alt={image.caption || `${item.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      {image.caption && (
                        <p className="absolute bottom-0 left-0 p-4 md:p-6 text-sm text-white bg-black/30 w-full">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

