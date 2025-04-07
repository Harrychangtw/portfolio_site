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
    const duration = contentWidth / 35 // Slightly faster for a more dynamic feel

    content.style.animationDuration = `${duration}s`
    clone.style.animationDuration = `${duration}s`
  }, [])

  return (
    <div className="border-t border-border py-6 overflow-hidden bg-gradient-to-r from-[#0a0a0a] via-[#12120f] to-[#0a0a0a]">
      <div ref={scrollRef} className="scrolling-text">
        <div className="scrolling-text-content flex items-center">
          <div className="fancy-block"></div>
          <span className="mx-3 fancy-text text-secondary">HARRY CHANG</span>
          <span className="fancy-separator">
            <span className="fancy-diamond"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">DESIGN</span>
          <span className="fancy-separator">
            <span className="fancy-dot"></span>
            <span className="fancy-dot accent"></span>
            <span className="fancy-dot"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">DEVELOPMENT</span>
          <span className="fancy-separator">
            <span className="fancy-diamond"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">INTERACTION</span>
          <div className="fancy-block"></div>
          <span className="mx-3 fancy-text text-secondary">HARRY CHANG</span>
          <span className="fancy-separator">
            <span className="fancy-dot"></span>
            <span className="fancy-dot accent"></span>
            <span className="fancy-dot"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">DESIGN</span>
          <span className="fancy-separator">
            <span className="fancy-diamond"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">DEVELOPMENT</span>
          <span className="fancy-separator">
            <span className="fancy-dot"></span>
            <span className="fancy-dot accent"></span>
            <span className="fancy-dot"></span>
          </span>
          <span className="mx-3 fancy-text text-secondary">INTERACTION</span>
        </div>
      </div>
    </div>
  )
}

