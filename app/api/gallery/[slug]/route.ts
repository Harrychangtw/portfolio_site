import { NextResponse } from "next/server"
import { getGalleryItemData } from "@/lib/markdown"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    const item = await getGalleryItemData(slug)
    
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error fetching gallery item:", error)
    return NextResponse.json({ error: "Failed to fetch gallery item" }, { status: 500 })
  }
}
