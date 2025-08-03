"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"


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

export default function UpdatesSection() {
	const { t, tHtml, getTranslationData } = useLanguage()
	const [currentPage, setCurrentPage] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto')
	const contentRef = useRef<HTMLDivElement>(null)
	const entriesPerPage = 5
	
	// Get localized updates data
	const updatesNamespaceData = getTranslationData('', 'updates') // Get entire updates namespace
	const updates = updatesNamespaceData?.entries || []
	const totalPages = Math.ceil(updates.length / entriesPerPage)

	// Measure content height for smooth transitions
	useEffect(() => {
		if (contentRef.current && !isTransitioning) {
			const height = contentRef.current.scrollHeight
			setContentHeight(height)
		}
	}, [currentPage, isTransitioning, updates])

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
								<p className="font-ibm-plex text-primary flex-1">
									{parseHtmlToReact(entry.text || '')}
								</p>
								<p className="font-ibm-plex text-secondary text-right">
									{entry.date || ''}
								</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}

