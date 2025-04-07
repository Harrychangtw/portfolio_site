"use client"

import { useEffect, useRef } from "react"

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
    const duration = contentWidth / 50 // Adjust speed as needed

    content.style.animationDuration = `${duration}s`
    clone.style.animationDuration = `${duration}s`
  }, [])

  return (
    <div className="border-t border-border py-4 overflow-hidden">
      <div ref={scrollRef} className="scrolling-text">
        <div className="scrolling-text-content flex items-center">
          <span className="mx-4 text-secondary">HARRY CHANG</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">DESIGN</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">DEVELOPMENT</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">INTERACTION</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">HARRY CHANG</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">DESIGN</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">DEVELOPMENT</span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-secondary">INTERACTION</span>
        </div>
      </div>
    </div>
  )
}

