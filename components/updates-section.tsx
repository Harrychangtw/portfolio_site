"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const updates = [
	{ date: "2024-07-29", text: "Gave a speech for AI WAVE Opening Ceramony" },
	
]

export default function UpdatesSection() {
	const [currentPage, setCurrentPage] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const entriesPerPage = 5
	const totalPages = Math.ceil(updates.length / entriesPerPage)

	const handlePrevPage = () => {
		setIsTransitioning(true)
		setTimeout(() => {
			setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
			setIsTransitioning(false)
		}, 300)
	}

	const handleNextPage = () => {
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
						Updates
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
				<div
					className={`space-y-4 transition-opacity duration-300 ${
						isTransitioning ? "opacity-0" : "opacity-100"
					}`}
				>
					{currentEntries.map((entry, index) => (
						<div key={index} className="flex justify-between items-center">
							<p className="font-ibm-plex text-primary">{entry.text}</p>
							<p className="font-ibm-plex text-secondary">{entry.date}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
