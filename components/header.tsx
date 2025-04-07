"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("about")
  const isHomePage = pathname === "/"
  const isMobile = useIsMobile()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const scrollToSection = (id: string) => {
    // If we're already on the home page, scroll to the section
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveSection(id)
      }
    }
    // Otherwise, we'll navigate to the home page with a hash
    // The hash will be handled after navigation in the useEffect below
  }

  useEffect(() => {
    // When landing on the homepage with a hash, scroll to that section
    if (isHomePage && window.location.hash) {
      const id = window.location.hash.substring(1) // Remove the leading #
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
          setActiveSection(id)
        }, 100) // Small delay to ensure the DOM is ready
      }
    }
  }, [isHomePage, pathname])

  useEffect(() => {
    // Only track scroll on homepage
    if (!isHomePage) return

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
  }, [isHomePage])

  // On non-homepage paths, set active based on pathname
  useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith('/projects')) {
        setActiveSection('projects')
      } else if (pathname.startsWith('/gallery')) {
        setActiveSection('gallery') 
      } else {
        setActiveSection('about')
      }
    }
  }, [pathname, isHomePage])

  // Display logic for section title
  const showSectionTitle = activeSection !== "about";
  
  return (
    <header className="border-b border-border py-4 sticky top-0 z-50 bg-background">
      <div className="container flex justify-between items-center">
        <div className="flex items-center text-xl font-bold">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="transition-colors hover:text-[#D8F600]">
              Harry Chang
            </Link>
          </motion.div>
          <AnimatePresence mode="wait">
            {showSectionTitle && (
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <span className="text-secondary mx-1">｜</span>
                <motion.span 
                  className="font-space-grotesk text-secondary"
                  key={activeSection}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!isMobile && (
          <nav className="flex space-x-8">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`relative ${activeSection === "about" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
                >
                  {activeSection === "about" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`relative ${activeSection === "projects" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
                >
                  {activeSection === "projects" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className={`relative ${activeSection === "gallery" ? "text-primary" : "text-secondary hover:text-primary transition-colors"} cursor-pointer`}
                >
                  {activeSection === "gallery" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  Gallery
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/#about"
                  className={`relative ${activeSection === "about" ? "text-primary" : "text-secondary hover:text-primary transition-colors"}`}
                >
                  {activeSection === "about" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  About
                </Link>
                <Link 
                  href={isActive("/projects") ? "/projects" : "/#projects"}
                  className={`relative ${activeSection === "projects" ? "text-primary" : "text-secondary hover:text-primary transition-colors"}`}
                >
                  {activeSection === "projects" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  Projects
                </Link>
                <Link 
                  href={isActive("/gallery") ? "/gallery" : "/#gallery"}
                  className={`relative ${activeSection === "gallery" ? "text-primary" : "text-secondary hover:text-primary transition-colors"}`}
                >
                  {activeSection === "gallery" && (
                    <motion.span layoutId="navUnderline" className="absolute left-0 top-full h-[1px] w-full bg-primary" transition={{ duration: 0.15, ease: "easeOut" }} />
                  )}
                  Gallery
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

