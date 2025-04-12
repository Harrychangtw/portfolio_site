"use client"

import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"

export default function Footer() {
  const isMobile = useIsMobile();
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      setTooltip({ visible: true, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (!isMobile && tooltip.visible) {
      setTooltip({ ...tooltip, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setTooltip({ visible: false, x: 0, y: 0 });
    }
  };

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
            {['Instagram', 'Discord', 'GitHub', 'Gmail'].map((platform, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <a
                  href={
                    platform === 'Instagram' ? 'https://www.instagram.com/pomelo_chang_08/' :
                    platform === 'Discord' ? 'https://discord.com/users/836567989209661481' :
                    platform === 'GitHub' ? 'https://github.com/Harrychangtw' :
                    'mailto:pomelo.cw@gmail.com'
                  }
                  className="relative text-white hover:text-[#D8F600] transition-colors px-2 py-1"
                >
                  <span className="relative z-10">{platform}</span>
                </a>
                <div
                  className="absolute inset-0 -m-5"
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              </motion.div>
            ))}
          </div>
        </div>
        {tooltip.visible && (
          <div
            className="fixed bg-[#D8F600] text-black text-sm px-3 py-1 rounded shadow-lg"
            style={{ top: tooltip.y - 40, left: tooltip.x, pointerEvents: 'none', transform: 'translateX(-50%)' }}
          >
            Always happy to chat!
          </div>
        )}
      </div>
    </footer>
  )
}