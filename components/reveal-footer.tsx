"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion" // Import motion from framer-motion

export default function RevealFooter() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Function to detect when user scrolls to bottom
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const threshold = document.documentElement.scrollHeight - 50 // Reveal slightly before reaching absolute bottom
      
      if (scrollPosition >= threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check in case page is short
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-10 bg-[#1a1a1a] h-[100px]"
      // Always in position, never moves
    >
      <div className="container py-6 h-full">
        <div className="flex flex-col md:flex-row justify-between items-center h-full">
          {/* Version info with accent outline */}
          <div className="mb-4 md:mb-0 flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#D8F600] text-xs text-[#D8F600]">
              v2.0.1
            </span>
            <span className="text-sm text-secondary">Last updated: April 8, 2025</span>
          </div>
          
          {/* Contact links - white color */}
          <div className="flex space-x-5">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://www.instagram.com/pomelo_chang_08/" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Instagram</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://discord.com/users/836567989209661481" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Discord</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://github.com/Harrychangtw" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">GitHub</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="mailto:pomelo.cw@gmail.com" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Gmail</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}