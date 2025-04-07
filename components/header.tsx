"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("about")

  const isActive = (path: string) => {
    return pathname === path
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header height

      // Get all sections
      const aboutSection = document.getElementById("about")
      const projectsSection = document.getElementById("projects")
      const gallerySection = document.getElementById("gallery")

      // Check which section is currently in view
      if (aboutSection && scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight) {
        setActiveSection("about")
      } else if (projectsSection && scrollPosition < projectsSection.offsetTop + projectsSection.offsetHeight) {
        setActiveSection("projects")
      } else if (gallerySection) {
        setActiveSection("gallery")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="border-b border-border py-4 sticky top-0 z-50 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Harry Chang
        </Link>
        <nav className="flex space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className={`relative ${activeSection === "about" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
          >
            {activeSection === "about" && (
              <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" />
            )}
            About
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className={`relative ${activeSection === "projects" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
          >
            {activeSection === "projects" && (
              <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" />
            )}
            Projects
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className={`relative ${activeSection === "gallery" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
          >
            {activeSection === "gallery" && (
              <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" />
            )}
            Gallery
          </button>
        </nav>
      </div>
    </header>
  )
}

