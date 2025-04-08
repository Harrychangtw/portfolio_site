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

  // Extract the full image URL (not thumbnail) for the main hero image
  // The thumbnails are only used in list/grid views, not in the detail page
  const fullImageUrl = item.imageUrl?.replace('-thumb.webp', '.webp') || '/placeholder.svg';

  // Check if description exists to adjust layout
  const hasDescription = item.description && item.description.trim() !== '';

  return (
    <div className="page-transition-enter">
      <div className="pb-12">
        {/* Full-width image section at the top - using full resolution */}
        <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-muted mb-8 md:mb-12">
          <Image 
            src={fullImageUrl} 
            alt={item.title} 
            fill 
            className="object-cover" 
            priority
            sizes="100vw" 
            quality={90} // Using higher quality for hero images
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
              {/* Description area and attributes - restructured to handle missing description */}
              <div className="mb-16 md:mb-24">
                {hasDescription && (
                  <p className="text-lg md:text-xl mb-10 md:mb-16">{item.description}</p>
                )}
                
                {/* Additional attributes in a grid - adjusted margins when no description */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-12 ${
                  hasDescription ? 'mb-16 md:mb-24' : 'mt-0'
                } text-secondary`}>
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
              <div className="prose prose-lg max-w-none dark:prose-invert mb-16 md:mb-24" 
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }} />

              {/* Gallery grid with reduced spacing - always use full resolution images */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:gap-12 mb-16 md:mb-24">
                  {item.gallery.map((image, index) => {
                    // Always use the full resolution image URL for the detail view
                    const fullUrl = image.url.replace('-thumb.webp', '.webp');
                    
                    // Calculate aspect ratio to determine if image is landscape, portrait, or square
                    const aspectRatio = image.width && image.height 
                      ? image.width / image.height 
                      : 1.5; // Default to 3:2 photography standard instead of 16:9
                    
                    const isPortrait = aspectRatio < 0.9;
                    const isSquare = aspectRatio >= 0.9 && aspectRatio <= 1.1;
                    
                    return (
                      <div key={index} className="relative w-full">
                        {/* Photo container with responsive sizing based on aspect ratio */}
                        <div className={`mx-auto ${
                          // For portrait images, limit width to avoid excessive height
                          isPortrait ? 'max-w-[70%] md:max-w-[60%] lg:max-w-[50%]' : 
                          // For square images, set appropriate width
                          isSquare ? 'max-w-[85%] md:max-w-[80%]' : 
                          // For landscape, use full width
                          'w-full'
                        }`}>
                          <div className="overflow-hidden bg-background">
                            {/* Dynamic aspect ratio container */}
                            <div className="relative w-full" style={{ 
                              paddingBottom: image.width && image.height 
                                ? `${(image.height / image.width) * 100}%` 
                                : "66.67%" // Default to 3:2 aspect ratio (66.67%) instead of 16:9 (56.25%)
                            }}>
                              <div className="absolute inset-0">
                                <Image
                                  src={fullUrl}
                                  alt={image.caption || `${item.title} image ${index + 1}`}
                                  fill
                                  className="object-cover" // Changed from object-contain to object-cover
                                  sizes={isPortrait ? 
                                    "(max-width: 768px) 70vw, 50vw" : 
                                    "(max-width: 768px) 100vw, 90vw"
                                  }
                                  quality={90}
                                  loading={index === 0 ? "eager" : "lazy"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Optional caption with improved styling */}
                        {image.caption && (
                          <p className="mt-3 text-sm text-secondary italic text-center max-w-prose mx-auto">
                            {image.caption}
                          </p>
                        )}
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

