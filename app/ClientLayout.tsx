"use client"

import type React from "react"
import { Space_Grotesk, Press_Start_2P } from "next/font/google"
import Header from "@/components/header"
import "./globals.css"
import "@/styles/lcp-optimize.css"
import { Analytics } from "@vercel/analytics/react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" className={`dark ${pressStart2P.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.className} bg-background text-primary antialiased min-h-screen flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

