"use client"

import { useEffect, useState, useRef } from "react"
import ProjectCard from "./project-card"
import { ProjectMetadata } from "@/lib/markdown"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersectionObserver({
    elementRef: sectionRef,
    rootMargin: '100px'
  })

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isVisible) {
      fetchProjects()
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} id="projects" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative w-full mb-3 overflow-hidden">
                <div className="relative w-full pb-[66.67%]">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="w-full h-full bg-muted animate-pulse">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                    </div>
                  </div>
                </div>
                {/* Placeholder for text content */}
                <div className="px-1 mt-3">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md mb-1"></div>
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
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
    </section>
  )
}

