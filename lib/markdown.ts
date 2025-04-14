import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { visit } from "unist-util-visit"

// Define the directories
const projectsDirectory = path.join(process.cwd(), "content/projects")
const galleryDirectory = path.join(process.cwd(), "content/gallery")

// Helper function to process image paths
function getThumbnailPath(imagePath: string): string {
  if (!imagePath) return imagePath;
  
  // Ensure path starts with /
  if (!imagePath.startsWith('/') && !imagePath.startsWith('http')) {
    imagePath = '/' + imagePath;
  }
  
  // Handle optimization directory structure
  if (imagePath.includes('/images/') && !imagePath.includes('/optimized/')) {
    imagePath = imagePath.replace('/images/', '/images/optimized/');
  }
  
  // Add thumbnail suffix if not already present
  if (!imagePath.includes('-thumb.webp')) {
    imagePath = imagePath.replace('.webp', '-thumb.webp');
  }
  
  return imagePath;
}

// Helper function to get full resolution path
function getFullResolutionPath(imagePath: string): string {
  if (!imagePath) return imagePath;
  
  // Ensure path starts with /
  if (!imagePath.startsWith('/') && !imagePath.startsWith('http')) {
    imagePath = '/' + imagePath;
  }
  
  // Handle optimization directory structure
  if (imagePath.includes('/images/') && !imagePath.includes('/optimized/')) {
    imagePath = imagePath.replace('/images/', '/images/optimized/');
  }
  
  // Remove thumbnail suffix if present
  return imagePath.replace('-thumb.webp', '.webp');
}

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
  pinned?: number  // Changed from boolean to number, -1 for not pinned, positive numbers for pinning order
  locked?: boolean
}

export interface GalleryImage {
  url: string
  thumbnailUrl?: string // Added thumbnailUrl field
  caption?: string
  width?: number
  height?: number
  aspectRatio?: number
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
  pinned?: number  // Changed from boolean to number, -1 for not pinned, positive numbers for pinning order
  locked?: boolean
  aspectType?: string // 'v' for vertical (4:5) or 'h' for horizontal (5:4)
  aspectRatio?: number
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
        
        // Process imageUrl to add thumbnail for cards/previews
        const data = matterResult.data as Omit<ProjectMetadata, "slug">;
        if (data.imageUrl) {
          data.imageUrl = getThumbnailPath(data.imageUrl);
        }

        // Combine the data with the slug
        return {
          slug,
          ...data,
        }
      })

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
      // Handle pinned items with numeric values
      // -1 means not pinned, positive numbers indicate priority (1 is highest)
      if (typeof a.pinned === 'number' && a.pinned >= 0 && (typeof b.pinned !== 'number' || b.pinned < 0)) {
        return -1; // a is pinned, b is not pinned
      }
      if ((typeof a.pinned !== 'number' || a.pinned < 0) && typeof b.pinned === 'number' && b.pinned >= 0) {
        return 1; // a is not pinned, b is pinned
      }
      if (typeof a.pinned === 'number' && typeof b.pinned === 'number' && a.pinned >= 0 && b.pinned >= 0) {
        return a.pinned - b.pinned; // Both are pinned, compare by pin number
      }
      
      // Then by date
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
        
        // Process imageUrl to add thumbnail for cards/previews
        const data = matterResult.data as Omit<GalleryItemMetadata, "slug">;
        if (data.imageUrl) {
          data.imageUrl = getThumbnailPath(data.imageUrl);
        }

        // Combine the data with the slug
        return {
          slug,
          ...data,
        }
      })

    // Sort gallery items by date
    return allGalleryData.sort((a, b) => {
      // Handle pinned items with numeric values
      // -1 means not pinned, positive numbers indicate priority (1 is highest)
      if (typeof a.pinned === 'number' && a.pinned >= 0 && (typeof b.pinned !== 'number' || b.pinned < 0)) {
        return -1; // a is pinned, b is not pinned
      }
      if ((typeof a.pinned !== 'number' || a.pinned < 0) && typeof b.pinned === 'number' && b.pinned >= 0) {
        return 1; // a is not pinned, b is pinned
      }
      if (typeof a.pinned === 'number' && typeof b.pinned === 'number' && a.pinned >= 0 && b.pinned >= 0) {
        return a.pinned - b.pinned; // Both are pinned, compare by pin number
      }
      
      // Then by date
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
    const processedContent = await remark()
      .use(() => (tree) => {
        // Process the tree to find image nodes and fix URLs
        visit(tree, 'image', (node) => {
          if (node.url) {
            // Ensure full resolution images in content
            node.url = getFullResolutionPath(node.url);
          }
        });
      })
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString()

    // Get the full data for detail view (don't use thumbnails for hero image)
    const data = matterResult.data as Omit<ProjectMetadata, "slug">;

    // Process imageUrl to use full resolution in detail view
    if (data.imageUrl) {
      data.imageUrl = getFullResolutionPath(data.imageUrl);
    }

    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...data,
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

    // Process the gallery images to add thumbnailUrl if available
    const data = matterResult.data as Omit<GalleryItemMetadata, "slug">;
    
    // Ensure the main imageUrl has a leading slash for absolute path
    if (data.imageUrl && !data.imageUrl.startsWith('/') && !data.imageUrl.startsWith('http')) {
      data.imageUrl = '/' + data.imageUrl;
    }
    
    // Process gallery images to include thumbnailUrl and ensure consistent URL format
    if (data.gallery && Array.isArray(data.gallery)) {
      data.gallery = data.gallery.map(image => {
        // Add leading slash if it's a relative path and doesn't start with http(s)
        if (image.url && !image.url.startsWith('/') && !image.url.startsWith('http')) {
          image.url = '/' + image.url;
        }
        
        // Only return thumbnails for card views, not for individual item pages
        return { 
          ...image,
          thumbnailUrl: getThumbnailPath(image.url)
        };
      });
    }

    // Use remark to convert markdown into HTML string
    // Process image URLs in markdown content to use full resolution paths
    const processedContent = await remark()
      .use(() => (tree) => {
        // Process the tree to find image nodes and fix URLs
        visit(tree, 'image', (node) => {
          // Ensure image URLs use the correct path format
          if (node.url) {
            // Remove -thumb suffix if present to ensure full resolution
            node.url = node.url.replace('-thumb.webp', '.webp');
            
            // Ensure URL starts with / for absolute paths from root
            if (!node.url.startsWith('/') && !node.url.startsWith('http')) {
              node.url = '/' + node.url;
            }
            
            // If the URL points to images/gallery but not to optimized, update path
            if (node.url.includes('/images/gallery/') && !node.url.includes('/optimized/')) {
              node.url = node.url.replace('/images/gallery/', '/images/optimized/gallery/');
            }
          }
          return node;
        });
      })
      .use(html)
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    return {
      slug,
      contentHtml,
      ...data,
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

