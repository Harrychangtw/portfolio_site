import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getGalleryItemData, getAllGallerySlugs } from "@/lib/markdown"
import GalleryItemClient from "./GalleryItemClient"

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

  return <GalleryItemClient item={item} />
}

