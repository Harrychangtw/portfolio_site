import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProjectData, getAllProjectSlugs } from "@/lib/markdown"
import ProjectPageClient from "@/components/project-page-client"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) return { title: "Project Not Found" }
  
  const project = await getProjectData(slug)

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
  const resolvedParams = await params
  const slug = resolvedParams?.slug
  if (!slug) notFound()
  
  const project = await getProjectData(slug)

  if (!project || project.locked) { // Check if project exists and is not locked
    notFound()
  }


  return <ProjectPageClient initialProject={project} />
}

