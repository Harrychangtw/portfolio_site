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
    elementRef: sectionRef as React.RefObject<Element>,
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            // Placeholder cards while loading
            [...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col bg-card rounded-lg overflow-hidden">
                <div className="relative w-full pb-[66.67%]">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="w-full h-full bg-muted animate-pulse">
                      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                    </div>
                  </div>
                </div>
                {/* Placeholder for text content */}
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md mb-3"></div>
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual project cards
            projects.map((project, index) => (
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}

