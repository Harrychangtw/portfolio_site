"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { GalleryImageContainer } from "@/components/gallery-image-container"
import type { GalleryItemMetadata } from "@/lib/markdown"

interface GalleryItemClientProps {
  item: GalleryItemMetadata & { contentHtml: string }
}

export default function GalleryItemClient({ item }: GalleryItemClientProps) {
  return (
    <div className="page-transition-enter">
      <div className="pb-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Left column */}
            <div className="md:col-span-4 mb-10 md:mb-0">
              <div className="md:sticky md:top-24">
                <div className="relative">
                  <Link
                    href="/#gallery"
                    className="inline-flex items-center text-secondary hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="font-ibm-plex">Back to gallery</span>
                  </Link>
                  <div className="mt-8">
                    <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4 md:mb-8">{item.title}</h1>
                    <p className="font-ibm-plex text-secondary mb-6 md:mb-12">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - aligned with title */}
            <div className="md:col-span-8">
              <div className="md:mt-14">
                {/* Description area and attributes - restructured to handle missing description */}
                <div className="mb-16 md:mb-24">
                  {item.description && (
                    <p className="font-ibm-plex text-lg md:text-xl mb-10 md:mb-16">{item.description}</p>
                  )}
                  
                  {/* Additional attributes in a grid */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-12 ${
                    item.description ? 'mb-16 md:mb-24' : 'mt-0'
                  } text-secondary`}>
                    {item.camera && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Camera</p>
                        <p className="font-ibm-plex">{item.camera}</p>
                      </div>
                    )}
                    {item.lens && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Lens</p>
                        <p className="font-ibm-plex">{item.lens}</p>
                      </div>
                    )}
                    {item.location && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Location</p>
                        <p className="font-ibm-plex">{item.location}</p>
                      </div>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Tags</p>
                        <p className="font-ibm-plex">{item.tags.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Main content */}
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert mb-16 md:mb-24" 
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }} 
                />

                {/* Gallery grid */}
                {item.gallery && item.gallery.length > 0 && (
                  <div className="flex flex-col gap-6 md:gap-12">
                    {item.gallery.map((image, index) => (
                      <div key={index} className="space-y-4">
                        <GalleryImageContainer
                          src={image.url}
                          alt={image.caption || "Gallery image"}
                          caption={image.caption}
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}