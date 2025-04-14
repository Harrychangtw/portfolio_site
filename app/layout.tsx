import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: {
    template: "%s | Harry Chang",
    default: "Harry Chang | Portfolio",
  },
  description: "Harry Chang's portfolio showcasing photography development and design work",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      }
    ],
    apple: {
      url: '/apple-icon.png',
      type: 'image/png'
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClientLayout>
      <div className="flex-1 pt-16">
        {children}
      </div>
      <Footer />
    </ClientLayout>
  )
}

import './globals.css'