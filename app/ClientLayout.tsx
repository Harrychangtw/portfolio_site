"use client"

import type React from "react"

import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import ScrollingText from "@/components/scrolling-text"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-primary antialiased`}>
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <ScrollingText />
          <footer className="border-t border-border py-6">
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-secondary mb-4 md:mb-0">v1.0.0 | Last updated: 2023-02-28</div>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" className="text-secondary hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://instagram.com" className="text-secondary hover:text-primary transition-colors">
                    Instagram
                  </a>
                  <a href="https://twitter.com" className="text-secondary hover:text-primary transition-colors">
                    Twitter
                  </a>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-secondary">Let's build something together.</p>
                  <a href="mailto:harrychang@gmail.com" className="text-primary hover:underline">
                    harrychang@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}

