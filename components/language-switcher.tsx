"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'zh-TW' as const, name: '繁體中文' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 font-ibm-plex text-primary hover:text-[#D8F600] transition-colors"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <span>{t('footer.languageSwitch')}</span>
        <span className="text-secondary">|</span>
        <span>{currentLanguage?.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
        >
          ↓
        </motion.span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-full mb-2 left-0 bg-[#2a2a2a] border border-border rounded-md shadow-lg z-50"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`block w-full px-4 py-2 text-left font-ibm-plex transition-colors first:rounded-t-md last:rounded-b-md ${
                language === lang.code
                  ? 'text-[#D8F600] bg-[#333333]'
                  : 'text-primary hover:text-[#D8F600] hover:bg-[#333333]'
              }`}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.1 }}
            >
              {lang.name}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
