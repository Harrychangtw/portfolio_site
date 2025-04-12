import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProjectData, getAllProjectSlugs } from "@/lib/markdown"
import { GalleryImageContainer } from "@/components/gallery-image-container"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectData(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Projects`,
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

  return (
    <div className="page-transition-enter">
      <div className="pb-12">
        <div className="container">
          {/* Hero image section */}
          <div className="relative w-full mb-8">
            <GalleryImageContainer
              src={project.imageUrl}
              alt={project.title}
              priority={true}
              quality={90}
              noInsetPadding={true}
            />
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Left column */}
            <div className="md:col-span-4 mb-10 md:mb-0">
              <div className="md:sticky md:top-24">
                <div className="relative">
                  <Link 
                    href="/#projects" 
                    className="inline-flex items-center text-secondary hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="font-ibm-plex">Back to projects</span>
                  </Link>
                  <div className="mt-8">
                    <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4 md:mb-8">{project.title}</h1>
                    <p className="font-ibm-plex text-secondary uppercase text-sm mb-6 md:mb-12">{project.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - aligned with title */}
            <div className="md:col-span-8">
              <div className="md:mt-14">
                {/* Description area */}
                <div className="mb-16 md:mb-24">
                  <p className="font-ibm-plex text-lg md:text-xl mb-10 md:mb-16">{project.description}</p>
                  
                  {/* Additional attributes in a grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 md:gap-x-4 mb-16 md:mb-24 text-secondary">
                    {project.year && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Year</p>
                        <p className="font-ibm-plex">{project.year}</p>
                      </div>
                    )}
                    {project.role && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Role</p>
                        <p className="font-ibm-plex">{project.role}</p>
                      </div>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Technologies</p>
                        <p className="font-ibm-plex">{project.technologies.join(", ")}</p>
                      </div>
                    )}
                    {project.client && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Client</p>
                        <p className="font-ibm-plex">{project.client}</p>
                      </div>
                    )}
                    {project.website && (
                      <div>
                        <p className="font-space-grotesk uppercase text-xs mb-1">Website</p>
                        <p className="font-ibm-plex">
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

                {/* Main content */}
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert mb-16 md:mb-24" 
                  dangerouslySetInnerHTML={{ 
                    __html: project.contentHtml 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

