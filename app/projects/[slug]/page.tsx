import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProjectData, getAllProjectSlugs } from "@/lib/markdown"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectData(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export async function generateStaticParams() {
  const paths = getAllProjectSlugs()
  return paths
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectData(params.slug)

  if (!project) {
    notFound()
  }
  
  // Extract the full image URL (not thumbnail) for the main hero image
  const fullImageUrl = project.imageUrl?.replace('-thumb.webp', '.webp') || '/placeholder.svg';

  return (
    <div className="page-transition-enter">
      <div className="pb-12">
        <div className="container">
          {/* Hero image section with 3:2 aspect ratio */}
          <div className="relative w-full mb-8">
            <div className="relative w-full overflow-hidden bg-muted" style={{ paddingBottom: '66.67%' }}>
              <Image
                src={fullImageUrl}
                alt={project.title}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
                quality={90}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-secondary hover:text-primary mb-8 md:mb-12 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to projects
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Left column - full width on mobile, now 4/12 (1/3) on desktop */}
            <div className="md:col-span-4 mb-10 md:mb-0">
              <div className="md:sticky md:top-24">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 md:mb-8">{project.title}</h1>
                <p className="text-secondary uppercase text-sm mb-6 md:mb-12">{project.category}</p>
                {/* Intentional negative space below */}
              </div>
            </div>

            {/* Right column - full width on mobile, now 8/12 (2/3) on desktop */}
            <div className="md:col-span-8">
              {/* Description area */}
              <div className="mb-16 md:mb-24">
                <p className="text-lg md:text-xl mb-10 md:mb-16">{project.description}</p>
                
                {/* Additional attributes in a single row grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 md:gap-x-4 mb-16 md:mb-24 text-secondary">
                  {project.year && (
                    <div>
                      <p className="uppercase text-xs mb-1">Year</p>
                      <p>{project.year}</p>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <p className="uppercase text-xs mb-1">Role</p>
                      <p>{project.role}</p>
                    </div>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <p className="uppercase text-xs mb-1">Technologies</p>
                      <p>{project.technologies.join(", ")}</p>
                    </div>
                  )}
                  {project.client && (
                    <div>
                      <p className="uppercase text-xs mb-1">Client</p>
                      <p>{project.client}</p>
                    </div>
                  )}
                  {project.website && (
                    <div>
                      <p className="uppercase text-xs mb-1">Website</p>
                      <p>
                        <a 
                          href={project.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline"
                        >
                          {project.website.replace(/^https?:\/\//, '')}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Main content - Transforms any markdown image references to use full-res versions */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert mb-16 md:mb-24" 
                dangerouslySetInnerHTML={{ 
                  __html: project.contentHtml.replace(
                    /-thumb\.webp/g, 
                    '.webp'
                  ) 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

