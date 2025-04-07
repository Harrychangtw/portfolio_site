import { NextResponse } from "next/server"
import { getAllGalleryMetadata } from "@/lib/markdown"

export async function GET() {
  try {
    const galleryItems = getAllGalleryMetadata()
    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}