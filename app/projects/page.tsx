import type { Metadata } from "next"
import ProjectsPageClient from "@/components/projects-page-client"

export const metadata: Metadata = {
  title: "Projects | Harry Chang 張祺煒",
  description: "Browse design and development projects by Harry Chang (張祺煒)",
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
