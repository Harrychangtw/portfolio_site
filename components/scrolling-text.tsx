"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ScrollingText() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const content = scrollElement.querySelector(".scrolling-text-content") as HTMLElement
    if (!content) return

    // Clone the content to create a seamless loop
    const clone = content.cloneNode(true) as HTMLElement
    scrollElement.appendChild(clone)

    // Adjust animation duration based on content width
    const contentWidth = content.offsetWidth
    const duration = contentWidth / 40 // Slightly faster for a more dynamic feel

    content.style.animationDuration = `${duration}s`
    clone.style.animationDuration = `${duration}s`
  }, [])

  return (
    <div className="border-t border-border py-3 overflow-hidden bg-background">
      <div ref={scrollRef} className="scrolling-text">
        <div className="scrolling-text-content flex items-center">
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|====| HARRY CHANG |====|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| VIDEO EDITING |==|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| DESIGN |==|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| DEVELOPMENT |==|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|====| HARRY CHANG |====|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| EDITING |==|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| DESIGN |==|</motion.span>
          <span className="ascii-separator">··</span>
          <motion.span 
            className="ascii-text"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >|==| DEVELOPMENT |==|</motion.span>
        </div>
      </div>
    </div>
  )
}

