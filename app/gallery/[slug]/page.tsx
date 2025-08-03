import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getGalleryItemData, getAllGallerySlugs } from "@/lib/markdown"
import GalleryItemPageClient from "@/components/gallery-item-page-client"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params?.slug
  if (!slug) return { title: "Gallery Item Not Found" }
  
  const item = await getGalleryItemData(slug)

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
  const slug = params?.slug
  if (!slug) notFound()
  
  const item = await getGalleryItemData(slug)

  if (!item) {
    notFound()
  }

  return <GalleryItemPageClient initialItem={item} />
}

