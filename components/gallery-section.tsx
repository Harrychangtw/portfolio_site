import GalleryCard from "./gallery-card"

export default function GallerySection() {
  const galleryItems = [
    {
      title: "Cursor AI",
      quote: "Exploring the future of AI-assisted coding",
      slug: "cursor-ai",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Thinkspace",
      quote: "Artificial AI agents for creative exploration",
      slug: "thinkspace",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Skiff Icons",
      quote: "Branding & systems design for privacy-focused tools",
      slug: "skiff-icons",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Aiga Hue",
      quote: "Data visualization experiments",
      slug: "aiga-hue",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Light Engine",
      quote: "Computational design systems",
      slug: "light-engine",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
    {
      title: "Metalink Labs",
      quote: "Design systems for web3",
      slug: "metalink-labs",
      imageUrl: "/placeholder.svg?height=600&width=600",
    },
  ]

  return (
    <section id="gallery" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.slug}
              title={item.title}
              quote={item.quote}
              slug={item.slug}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

