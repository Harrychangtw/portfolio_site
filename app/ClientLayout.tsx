"use client"

import type React from "react"
import Header from "@/components/header"
import { Analytics } from "@vercel/analytics/react"
import ClickSpark from "@/components/ui/click-spark"
import { useIsMobile } from "@/hooks/use-mobile"
import { LanguageProvider } from "@/contexts/LanguageContext"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = useIsMobile()
  
  return (
    <LanguageProvider>
      <Header />
      {isMobile ? (
        children
      ) : (
        <ClickSpark
          sparkColor="#ffffff"
          sparkSize={8}
          sparkRadius={15}
          sparkCount={4}
          duration={500}
          extraScale={1.2}
        >
          {children}
        </ClickSpark>
      )}
      <Analytics />
    </LanguageProvider>
  )
}

