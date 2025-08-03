"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const handleToggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh-TW' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={handleToggleLanguage}
      className="flex items-center space-x-2 font-space-grotesk text-sm text-secondary hover:text-[#D8F600] transition-colors duration-200"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="tracking-wider">
        {language === 'en' ? 'English' : '繁體中文'}
      </span>
    </motion.button>
  );
}
