"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile" // Assuming this hook exists from your old code
import { useLanguage } from "@/contexts/LanguageContext"

// --- Link Data ---
// Centralized data for easy management of links and their tooltips.
const socialLinks = [
  { id: 'gmail', name: 'Gmail', href: 'mailto:pomelo.cw@gmail.com', tooltip: 'Always happy for a chat!' },
  { id: 'discord', name: 'Discord', href: 'https://discord.com/users/836567989209661481', tooltip: 'Ping me, maybe I\'ll ping back' },
  { id: 'github', name: 'GitHub', href: 'https://github.com/Harrychangtw', tooltip: 'Check out my GitHub—where repos go to hide' },
  { id: 'instagram', name: 'Instagram', href: 'https://www.instagram.com/pomelo_chang_08/', tooltip: 'Please stalk responsibly' },
  { id: 'letterboxd', name: 'Letterboxd', href: 'https://boxd.it/fSKuF', tooltip: 'Judge my movie tastes harshly.' }, // Placeholder href
];

const resourceLinks = [
  { id: 'resume', name: 'Resume', href: 'https://drive.google.com/file/d/1l7vCgSFtglvc1gT7LiVRBzxUIv535PYP/view?usp=sharing', tooltip: 'Proof I know how to adult' },
  { id: 'manifesto', name: 'Manifesto', href: '/manifesto', tooltip: 'A bridge back to naiveté' },
  { id: 'wallpapers', name: 'Wallpapers', href: 'https://photos.google.com/u/1/share/AF1QipN_xATdICaaIO4RzR5CzdIj6AFeoueQmu5100b-a9_QIAzGLhz4HD95OurMi8pqBQ?key=MnV1OGlrQUdRTUg3Y0FHSkdnYVZrOXNMOU1PWFpn', tooltip: 'Spent way too much time on these...' },
  { id: 'music', name: 'Music Playlists', href: 'https://open.spotify.com/user/1b7kc6j0zerk49mrv80pwdd96?si=7d5a6e1a4fa34de3', tooltip: 'Make me go :D' },
  { id: 'reading', name: 'Paper Reading List', href: '/paper-reading', tooltip: 'Caffeine-fueled knowledge' },
];

const allLinks = [...socialLinks, ...resourceLinks];


export default function Footer() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showManifesto, setShowManifesto] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowManifesto(window.innerWidth >= 800);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, id: string) => {
    if (!isMobile) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
      setActiveTooltipId(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile && activeTooltipId) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveTooltipId(null);
    }
  };
  
  const currentTooltipText = activeTooltipId ? t(`tooltips.${activeTooltipId}`) : '';
  const filteredResourceLinks = resourceLinks.filter(link => link.id !== 'manifesto' || showManifesto);

  return (
    <>
      <footer className="bg-[#1a1a1a] text-primary py-12 md:py-16 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-2">

            {/* Column 1: Logo & Info - Aligns with the "About" column */}
            <div className="col-span-12 md:col-span-6 md:pr-12 space-y-4">
              {/* --- SVG/PNG Logo Placeholder --- */}
              {/* Replace src with your actual logo file path */}
                <div className="flex items-start">
                <img 
                  src="/chinese_name_icon.png" 
                  alt="Harry Chang/Chi-Wei Chang 張祺煒 Logo" 
                  className="h-12 w-auto pt-2" 
                />
                <span className="sr-only">Harry Chang/Chi-Wei Chang 張祺煒</span>
                </div>
              <div className="font-ibm-plex text-sm text-secondary space-y-2">
                <p>{t('footer.copyright')}</p>
              </div>
            </div>

            {/* Columns 2 & 3 Wrapper - Aligns with the "Roles & Description" columns */}
            <div className="col-span-12 md:col-span-6">
              <div className="grid grid-cols-12 gap-y-10 sm:gap-x-4">
                
                {/* Column 2: Social & Contact - Aligns with "Roles" */}
                <div className="col-span-12 sm:col-span-5">
                  <h3 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary mb-4">
                    {t('footer.socialContact')}
                  </h3>
                  <ul className="space-y-3">
                    {socialLinks.map(link => (
                      <li key={link.id}>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-ibm-plex text-primary hover:text-[#D8F600] transition-colors"
                            onMouseEnter={(e) => handleMouseEnter(e, link.id)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                          >
                            {t(`social.${link.id}`)}
                          </a>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Personal & Resources - Aligns with "Description" */}
                <div className="col-span-12 sm:col-span-7">
                  <h3 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary mb-4">
                    {t('footer.personalResources')}
                  </h3>
                  <ul className="space-y-3">
                    {filteredResourceLinks.map(link => (
                      <li key={link.id}>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-ibm-plex text-primary hover:text-[#D8F600] transition-colors"
                            onMouseEnter={(e) => handleMouseEnter(e, link.id)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                          >
                            {t(`resources.${link.id}`)}
                          </a>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Custom Tooltip Component --- */}
      {currentTooltipText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed bg-[#D8F600] text-black text-sm px-3 py-1.5 rounded-md shadow-lg font-space-grotesk z-50"
          style={{
            top: tooltipPosition.y - 40,
            left: tooltipPosition.x,
            pointerEvents: 'none',
            transform: 'translateX(-50%)'
          }}
        >
          {currentTooltipText}
        </motion.div>
      )}
    </>
  )
}