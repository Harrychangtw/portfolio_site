import ProjectCard from "./project-card"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Anime.com",
      category: "Project",
      subcategory: "",
      slug: "anime-com",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Multimodal Search",
      category: "Brain Technologies",
      subcategory: "Conversational AI",
      slug: "multimodal-search",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Apple",
      category: "Apple",
      subcategory: "Conversational AI",
      slug: "apple",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Azuki",
      category: "Consumer Product",
      subcategory: "",
      slug: "azuki",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Plane",
      category: "Productivity",
      subcategory: "",
      slug: "plane",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Skiff Mail",
      category: "Productivity Tooling",
      subcategory: "",
      slug: "skiff-mail",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Skiff",
      category: "Productivity",
      subcategory: "",
      slug: "skiff",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Skiff Pages",
      category: "Editor Tool",
      subcategory: "",
      slug: "skiff-pages",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Pixel Push",
      category: "Multiplayer Art",
      subcategory: "",
      slug: "pixel-push",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
  ]

  return (
    <section id="projects" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              category={project.category}
              subcategory={project.subcategory}
              slug={project.slug}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

