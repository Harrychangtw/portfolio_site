"use client"

import type React from "react"
import { Space_Grotesk, Press_Start_2P, IBM_Plex_Sans } from "next/font/google"
import Header from "@/components/header"
import "./globals.css"
import "@/styles/lcp-optimize.css"
import { Analytics } from "@vercel/analytics/react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
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
    <html lang="en" className={`dark ${pressStart2P.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <body className={`bg-background text-primary antialiased min-h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

