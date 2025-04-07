import type { Metadata } from "next"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import GallerySection from "@/components/gallery-section"

export const metadata: Metadata = {
  title: "Harry Chang | Portfolio",
  description: "Harry Chang's portfolio showcasing design and development work",
}

export default function Home() {
  return (
    <div className="page-transition-enter">
      <AboutSection />
      <ProjectsSection />
      <GallerySection />
    </div>
  )
}

