"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import { Inter, Space_Grotesk, Press_Start_2P } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"
import Header from "@/components/header"
import { Analytics } from "@vercel/analytics/react"

// Dynamically import RevealFooter with specific settings
const RevealFooter = dynamic(() => import("@/components/reveal-footer"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-[#1a1a1a] h-[100px]"></div>
  ),
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const threshold = document.documentElement.scrollHeight - 50
      
      if (scrollPosition >= threshold) {
        setIsAtBottom(true)
      } else {
        setIsAtBottom(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <html lang="en" className={`dark ${pressStart2P.variable}`}>
      <body className={`${inter.className} bg-background text-primary antialiased`}>
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
        
        {/* Header stays fixed and separate from the sliding content */}
        <Header />
        
        {/* The main content slides up */}
        <div
          className={`relative z-20 bg-background min-h-screen pt-16 transition-transform duration-500 ${
            isAtBottom ? 'transform -translate-y-[100px]' : ''
          }`}
        >
          <main className="flex-1">{children}</main>
          <div className="h-[100px]"></div> {/* Spacer to account for footer height */}
        </div>
        
        <RevealFooter />
        <Analytics />
      </body>
    </html>
  )
}

