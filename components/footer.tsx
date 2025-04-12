"use client"

import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="bg-[#1a1a1a] py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-3`}>
            <span className="inline-flex items-center px-3 py-1 rounded-full border-2 border-[#D8F600] text-xs text-[#D8F600]">
              v2.0.2
            </span>
            {!isMobile && (
              <span className="text-sm text-secondary">Last updated: April 12, 2025</span>
            )}
          </div>
          
          <div className="flex space-x-5">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://www.instagram.com/pomelo_chang_08/" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Instagram</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://discord.com/users/836567989209661481" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Discord</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="https://github.com/Harrychangtw" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">GitHub</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <a href="mailto:pomelo.cw@gmail.com" className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1">
                <span className="relative z-10">Gmail</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}