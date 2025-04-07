import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

// Define the directories
const projectsDirectory = path.join(process.cwd(), "content/projects")
const galleryDirectory = path.join(process.cwd(), "content/gallery")

export interface ProjectMetadata {
  slug: string
  title: string
  category: string
  subcategory?: string
  description: string
  imageUrl: string
  year: string
  date: string
  role?: string
  technologies?: string[]
  client?: string
  website?: string
  featured?: boolean
}

export interface GalleryImage {
  url: string
  caption?: string
  width?: number
  height?: number
}

export interface GalleryItemMetadata {
  slug: string
  title: string
  description: string
  imageUrl: string
  quote: string
  date: string
  gallery?: GalleryImage[]
  camera?: string
  lens?: string
  location?: string
  tags?: string[]
  featured?: boolean
}

// Ensure content directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(projectsDirectory)) {
    fs.mkdirSync(projectsDirectory, { recursive: true })
  }
  if (!fs.existsSync(galleryDirectory)) {
    fs.mkdirSync(galleryDirectory, { recursive: true })
  }
}

// Get all project files
export function getAllProjectSlugs() {
  ensureDirectoriesExist()
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          params: {
            slug: fileName.replace(/\.md$/, ""),
          },
        }
      })
  } catch (error) {
    console.error("Error reading project directory:", error)
    return []
  }
}

// Get all gallery item files
export function getAllGallerySlugs() {
  ensureDirectoriesExist()
  try {
    if (!fs.existsSync(galleryDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(galleryDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          params: {
            slug: fileName.replace(/\.md$/, ""),
          },
        }
      })
  } catch (error) {
    console.error("Error reading gallery directory:", error)
    return []
  }
}

// Get all projects metadata
export function getAllProjectsMetadata(): ProjectMetadata[] {
  ensureDirectoriesExist()
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjectsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "")

        // Read markdown file as string
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the slug
        return {
          slug,
          ...(matterResult.data as Omit<ProjectMetadata, "slug">),
        }
      })

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting projects metadata:", error)
    return []
  }
}

// Get all gallery items metadata
export function getAllGalleryMetadata(): GalleryItemMetadata[] {
  ensureDirectoriesExist()
  try {
    if (!fs.existsSync(galleryDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(galleryDirectory)
    const allGalleryData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "")

        // Read markdown file as string
        const fullPath = path.join(galleryDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the slug
        return {
          slug,
          ...(matterResult.data as Omit<GalleryItemMetadata, "slug">),
        }
      })

    // Sort gallery items by date
    return allGalleryData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error getting gallery metadata:", error)
    return []
  }
}

// Get project data by slug
export async function getProjectData(slug: string) {
  ensureDirectoriesExist()
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...(matterResult.data as Omit<ProjectMetadata, "slug">),
    }
  } catch (error) {
    console.error(`Error getting project data for slug ${slug}:`, error)
    return null
  }
}

// Get gallery item data by slug
export async function getGalleryItemData(slug: string) {
  ensureDirectoriesExist()
  try {
    const fullPath = path.join(galleryDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...(matterResult.data as Omit<GalleryItemMetadata, "slug">),
    }
  } catch (error) {
    console.error(`Error getting gallery item data for slug ${slug}:`, error)
    return null
  }
}

// Save a new project
export function saveProject(slug: string, data: Omit<ProjectMetadata, "slug">, content: string) {
  ensureDirectoriesExist()
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContent = matter.stringify(content, data)
    fs.writeFileSync(fullPath, fileContent)
    return true
  } catch (error) {
    console.error(`Error saving project ${slug}:`, error)
    return false
  }
}

// Save a new gallery item
export function saveGalleryItem(slug: string, data: Omit<GalleryItemMetadata, "slug">, content: string) {
  ensureDirectoriesExist()
  try {
    const fullPath = path.join(galleryDirectory, `${slug}.md`)
    const fileContent = matter.stringify(content, data)
    fs.writeFileSync(fullPath, fileContent)
    return true
  } catch (error) {
    console.error(`Error saving gallery item ${slug}:`, error)
    return false
  }
}

