"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'zh-TW'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, namespace?: string) => string
  tHtml: (key: string, namespace?: string) => React.ReactNode
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface Translations {
  [namespace: string]: {
    [key: string]: any
  }
}

// Helper function to parse HTML strings and convert to React elements
const parseHtmlToReact = (htmlString: string): React.ReactNode => {
  const linkRegex = /<a\s+href="([^"]*)"[^>]*>([^<]*)<\/a>/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = linkRegex.exec(htmlString)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const textBefore = htmlString.substring(lastIndex, match.index)
      if (textBefore) {
        parts.push(<span key={`text-${key++}`}>{textBefore}</span>)
      }
    }

    // Add the link with proper React props
    const href = match[1]
    const linkText = match[2]
    parts.push(
      <a
        key={`link-${key++}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-external"
      >
        {linkText}
      </a>
    )

    lastIndex = linkRegex.lastIndex
  }

  // Add remaining text after the last link
  if (lastIndex < htmlString.length) {
    const remainingText = htmlString.substring(lastIndex)
    if (remainingText) {
      parts.push(<span key={`text-${key++}`}>{remainingText}</span>)
    }
  }

  // If no links were found, return the original string
  return parts.length > 0 ? <>{parts}</> : htmlString
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load translations for a specific language
  const loadTranslations = async (lang: Language) => {
    setIsLoading(true)
    try {
      const namespaces = ['common', 'about']
      const translationPromises = namespaces.map(async (namespace) => {
        const response = await fetch(`/locales/${lang}/${namespace}.json`)
        if (response.ok) {
          const data = await response.json()
          return { namespace, data }
        }
        return { namespace, data: {} }
      })

      const results = await Promise.all(translationPromises)
      const newTranslations: Translations = {}
      
      results.forEach(({ namespace, data }) => {
        newTranslations[namespace] = data
      })

      setTranslations(newTranslations)
    } catch (error) {
      console.error('Failed to load translations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Translation function for plain text
  const t = (key: string, namespace: string = 'common'): string => {
    const keys = key.split('.')
    let value: any = translations[namespace]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  // Translation function that returns React nodes for HTML content
  const tHtml = (key: string, namespace: string = 'common'): React.ReactNode => {
    const translatedText = t(key, namespace)
    return parseHtmlToReact(translatedText)
  }

  // Set language and load translations
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    loadTranslations(lang)
  }

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    let initialLang: Language = 'en'
    
    // Check localStorage first
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && ['en', 'zh-TW'].includes(savedLang)) {
      initialLang = savedLang
    } else {
      // Check browser language
      const browserLang = navigator.language
      if (browserLang.startsWith('zh')) {
        initialLang = 'zh-TW'
      }
    }

    setLanguageState(initialLang)
    loadTranslations(initialLang)
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        tHtml,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
