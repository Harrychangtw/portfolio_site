import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getGalleryItemData, getAllGallerySlugs } from "@/lib/markdown"
import { GalleryImageContainer } from "@/components/gallery-image-container"

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

  const fullImageUrl = item.imageUrl?.replace('-thumb.webp', '.webp') || '/placeholder.svg';
  const hasDescription = item.description && item.description.trim() !== '';

  return (
    <div className="page-transition-enter">
      <div className="min-h-screen">
        <div className="container">
          {/* Hero image */}
          <div className="relative w-full">
            <GalleryImageContainer
              src={fullImageUrl}
              alt={item.title}
              priority={true}
              quality={90}
              aspectRatio={item.aspectRatio}
              noInsetPadding={true}
            />
          </div>
        </div>
        
        <div className="container mt-4">
          <Link
            href="/#gallery"
            className="inline-flex items-center text-secondary hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to gallery
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left column - metadata */}
            <div className="md:col-span-4 mb-6 md:mb-0">
              <div className="md:sticky md:top-24">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{item.title}</h1>
                <p className="text-secondary mb-6">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Right column - content */}
            <div className="md:col-span-8">
              <div className="mb-8">
                {hasDescription && (
                  <p className="text-lg md:text-xl mb-6">{item.description}</p>
                )}
                
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 md:gap-x-12 text-secondary`}>
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
                </div>
              </div>
              
              {/* Main content */}
              <div className="prose prose-lg max-w-none dark:prose-invert mb-8" 
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

              {/* Gallery grid */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  {item.gallery.map((image, index) => {
                    const fullUrl = image.url.replace('-thumb.webp', '.webp');
                    const aspectRatio = image.aspectRatio || 
                      (image.width && image.height ? image.width / image.height : undefined);
                    
                    return (
                      <div key={index} className="relative w-full">
                        <GalleryImageContainer
                          src={fullUrl}
                          alt={image.caption || `${item.title} image ${index + 1}`}
                          caption={image.caption}
                          priority={index === 0}
                          quality={90}
                          aspectRatio={aspectRatio}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

