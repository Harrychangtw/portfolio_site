import type { Metadata } from "next"
import ProjectCard from "@/components/project-card"
import { getAllProjectsMetadata } from "@/lib/markdown"

export const metadata: Metadata = {
  title: "Projects | Harry Chang",
  description: "Browse design and development projects by Harry Chang",
}

export default function ProjectsPage() {
  const projects = getAllProjectsMetadata()

  return (
    <div className="page-transition-enter">
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl font-heading font-bold mb-12">Projects</h1>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects found. Create some in the content/projects directory.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                priority={index < 3} // Prioritize first 3 projects
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}