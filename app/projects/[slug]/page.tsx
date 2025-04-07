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

  return (
    <div className="page-transition-enter">
      <div className="container py-12">
        <Link href="/" className="inline-flex items-center text-secondary hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to projects
        </Link>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">{project.title}</h1>
              <p className="text-secondary uppercase text-sm">{project.category}</p>
              {project.subcategory && <p className="text-secondary uppercase text-sm">{project.subcategory}</p>}
            </div>

            <div className="md:col-span-2">
              <p className="text-xl mb-4">{project.description}</p>
              <div className="flex space-x-8 text-secondary">
                <div>
                  <p className="uppercase text-xs mb-1">Year</p>
                  <p>{project.year}</p>
                </div>
                {project.role && (
                  <div>
                    <p className="uppercase text-xs mb-1">Role</p>
                    <p>{project.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-muted mb-12">
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        </div>
      </div>
    </div>
  )
}

