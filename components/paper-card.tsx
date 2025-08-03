
import { Paper } from "@/types/paper";
import Link from "next/link";
import { motion } from "framer-motion";

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  // Format date as yyyy-mm-dd
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  };
  
  return (
    <motion.div 
      className="border-b border-border py-4"
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.1 }
      }}
    >
      <h3 className="text-lg font-semibold">
        <Link href={paper.url} target="_blank" rel="noopener noreferrer" className="link-external hover:text-primary transition-colors duration-200">
          {paper.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600">{paper.authors.join(", ")}</p>
      <p className="text-sm text-gray-500">{formatDate(paper.date)}</p>
    </motion.div>
  );
}
