"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import { Inter, Space_Grotesk, Press_Start_2P } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"
import Header from "@/components/header"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"

// Dynamically import RevealFooter with specific settings
const RevealFooter = dynamic(() => import("@/components/reveal-footer"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-[#1a1a1a] h-[100px]"></div>
  ),
})

// Optimize font loading with preload strategy
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
  preload: true,
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Optimize font loading
  useEffect(() => {
    // Mark fonts as loaded once document is interactive
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setFontsLoaded(true);
    } else {
      document.addEventListener('DOMContentLoaded', () => setFontsLoaded(true));
      return () => document.removeEventListener('DOMContentLoaded', () => setFontsLoaded(true));
    }
  }, []);

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
      <Head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical CSS */}
        <link rel="preload" as="style" href="/globals.css" />
        
        {/* Preload critical LCP content */}
        <link rel="preload" fetchPriority="high" as="fetch" href="/api/about" />
      </Head>
      <body className={`${inter.className} bg-background text-primary antialiased`}>
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${spaceGrotesk.style.fontFamily};
          }
          
          /* Optimize LCP text rendering */
          [data-lcp="true"] {
            content-visibility: auto;
            contain-intrinsic-size: auto;
            font-display: swap;
          }
        `}</style>
        
        {/* Header stays fixed and separate from the sliding content */}
        <Header />
        
        {/* The main content slides up - optimized for rendering */}
        <div
          className={`relative z-20 bg-background min-h-screen pt-16 transition-transform duration-500 ${
            isAtBottom ? 'transform -translate-y-[100px]' : ''
          }`}
        >
          <main className="flex-1">
            {fontsLoaded ? children : (
              <Suspense fallback={
                <div className="container py-12">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 md:col-span-6">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-24"></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-full"></div>
                    </div>
                  </div>
                </div>
              }>
                {children}
              </Suspense>
            )}
          </main>
          <div className="h-[100px]"></div> {/* Spacer to account for footer height */}
        </div>
        
        <RevealFooter />
        <Analytics />
      </body>
    </html>
  )
}

