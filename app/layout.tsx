import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css"
import "../styles/lcp-optimize.css"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: {
    template: "%s | Harry Chang",
    default: "Harry Chang | Portfolio",
  },
  description: "Harry Chang's portfolio showcasing design and development work",
    generator: 'v0.dev'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          href="/images/optimized/gallery/placeholder.webp" 
          as="image"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}