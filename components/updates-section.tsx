"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const updates = [
	{ date: "2025-08-01", text: "[Update] Added support for Google Drive and YouTube video links" },
	{ date: "2025-08-01", text: "[Update] Made some layout improvements to the portfolio site" },
	{ date: "2025-07-31", text: "[Event] Gave a speech for [AI WAVE Opening Ceramony](https://www.technice.com.tw/issues/ai/185561/) at TWTC" },
	{ date: "2025-07-30", text: "[Research] PATCH has been submitted to ACL ARR July cycle after extensive revisions" },
	{ date: "2025-07-04", text: "[Achievement] Participated in the AIGO program's one-day hackathon at NTU, won [first prize](https://drive.google.com/file/d/1-Nm6tdic38YQcUcuploRbdpE28b4S9rS/view)" },
	{ date: "2025-07-05", text: "[Research] FORTRESS has underwent review for [TMLR](https://openreview.net/forum?id=lCn7RT9DGq)" },
	{ date: "2025-06-30", text: "[Achievement] PATCH won first prize in school's research competition" },
	{ date: "2025-06-15", text: "[Achievement] Won championship at Fushing Debate Open 2025 thanks to my amazing team!" },
	{ date: "2025-06-11", text: "[Award] Excited to announce that I have been awarded the Harvard Prize Book!" },
	{ date: "2025-05-18", text: "[Project] Kicked off the FORTRESS project, a RAG-inspired defense system" },
	{ date: "2025-05-15", text: "[Research] PATCH has been submitted to ACL ARR May cycle" },
	{ date: "2025-04-01", text: "[Milestone] Personal portfolio site launched 🎉" },
]

const parseTextWithLinks = (text: string) => {
	const regex = /\[([^\]]+)\]\(([^)]+)\)/g
	const parts = []
	let lastIndex = 0
	let match

	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.substring(lastIndex, match.index))
		}
		const linkText = match[1]
		const linkUrl = match[2]
		parts.push(
			<a
				href={linkUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="link-external"
			>
				{linkText}
			</a>
		)
		lastIndex = regex.lastIndex
	}

	if (lastIndex < text.length) {
		parts.push(text.substring(lastIndex))
	}

	return parts.map((part, index) => <span key={index}>{part}</span>)
}


export default function UpdatesSection() {
	const { t } = useLanguage()
	const [currentPage, setCurrentPage] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto')
	const contentRef = useRef<HTMLDivElement>(null)
	const entriesPerPage = 5
	const totalPages = Math.ceil(updates.length / entriesPerPage)

	// Measure content height for smooth transitions
	useEffect(() => {
		if (contentRef.current && !isTransitioning) {
			const height = contentRef.current.scrollHeight
			setContentHeight(height)
		}
	}, [currentPage, isTransitioning])

	const handlePrevPage = () => {
		if (contentRef.current) {
			// Capture current height before transition
			const currentHeight = contentRef.current.scrollHeight
			setContentHeight(currentHeight)
		}
		setIsTransitioning(true)
		setTimeout(() => {
			setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
			setIsTransitioning(false)
		}, 300)
	}

	const handleNextPage = () => {
		if (contentRef.current) {
			// Capture current height before transition
			const currentHeight = contentRef.current.scrollHeight
			setContentHeight(currentHeight)
		}
		setIsTransitioning(true)
		setTimeout(() => {
			setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
			setIsTransitioning(false)
		}, 300)
	}

	const startIndex = currentPage * entriesPerPage
	const endIndex = startIndex + entriesPerPage
	const currentEntries = updates.slice(startIndex, endIndex)

	return (
		<section id="updates" className="py-12 md:py-16 border-b border-border">
			<div className="container">
				<div className="flex justify-between items-center mb-4">
					<h2 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary">
						{t('updates.title')}
					</h2>
					<div className="flex space-x-4">
						<motion.div
							whileHover={currentPage > 0 ? { y: -2 } : {}}
							transition={{ duration: 0.2 }}
						>
							<button
								onClick={handlePrevPage}
								disabled={currentPage === 0}
								className="font-space-grotesk text-2xl text-[#4F4F4F] hover:text-[#D8F600] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								←
							</button>
						</motion.div>
						<motion.div
							whileHover={currentPage < totalPages - 1 ? { y: -2 } : {}}
							transition={{ duration: 0.2 }}
						>
							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages - 1}
								className="font-space-grotesk text-2xl text-[#4F4F4F] hover:text-[#D8F600] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								→
							</button>
						</motion.div>
					</div>
				</div>
				<motion.div
					animate={{ height: contentHeight }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
					className="overflow-hidden"
				>
					<div
						ref={contentRef}
						className={`space-y-4 transition-opacity duration-300 ${
							isTransitioning ? "opacity-0" : "opacity-100"
						}`}
					>
						{currentEntries.map((entry, index) => (
							<div key={index} className="flex justify-between items-start gap-4">
								<p className="font-ibm-plex text-primary flex-1">{parseTextWithLinks(entry.text)}</p>
								<p className="font-ibm-plex text-secondary text-right">{entry.date}</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
