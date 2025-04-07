"use client"

import type React from "react"

import { Inter, Space_Grotesk, Press_Start_2P } from "next/font/google"
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
  return (
    <html lang="en" className={`dark ${pressStart2P.variable}`}>
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
                  <a href="https://instagram.com" className="relative text-secondary hover:text-primary transition-colors group px-2 py-1">
                    <span className="absolute inset-0 bg-[#D8F600]/0 group-hover:bg-[#D8F600]/10 rounded transition-all duration-300"></span>
                    <span className="relative z-10">Instagram</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D8F600] group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="https://discord.com" className="relative text-secondary hover:text-primary transition-colors group px-2 py-1">
                    <span className="absolute inset-0 bg-[#D8F600]/0 group-hover:bg-[#D8F600]/10 rounded transition-all duration-300"></span>
                    <span className="relative z-10">Discord</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D8F600] group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="https://github.com" className="relative text-secondary hover:text-primary transition-colors group px-2 py-1">
                    <span className="absolute inset-0 bg-[#D8F600]/0 group-hover:bg-[#D8F600]/10 rounded transition-all duration-300"></span>
                    <span className="relative z-10">GitHub</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D8F600] group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="mailto:pomelo.cw@gmail.com" className="relative text-secondary hover:text-primary transition-colors group px-2 py-1">
                    <span className="absolute inset-0 bg-[#D8F600]/0 group-hover:bg-[#D8F600]/10 rounded transition-all duration-300"></span>
                    <span className="relative z-10">Gmail</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D8F600] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-secondary">Let's build something together.</p>
                  <a href="mailto:pomelo.cw@gmail.com" className="text-primary hover:underline">
                    pomelo.cw@gmail.com
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

