import type { Metadata } from "next"
import ProjectCard from "@/components/project-card"
import { getAllProjectsMetadata } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Projects | Harry Chang 張祺煒",
  description: "Browse design and development projects by Harry Chang (張祺煒)",
}

export default function ProjectsPage() {
  const projects = getAllProjectsMetadata()

  return (
    <div className="page-transition-enter">
      <div className="container py-16 md:py-24">
        <h1 className="font-space-grotesk text-4xl font-bold mb-12">Projects</h1>
        {projects.length === 0 ? (
          <p className="font-ibm-plex text-muted-foreground">No projects found. Create some in the content/projects directory.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                category={project.category}
                subcategory={project.subcategory || ""}
                slug={project.slug}
                imageUrl={project.imageUrl}
                pinned={project.pinned}
                locked={project.locked}
                priority={index < 3}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}