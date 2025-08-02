"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage - 1));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage + 1));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <motion.div 
      className="flex justify-between items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Button onClick={handlePrev} disabled={!hasPrevPage} variant="outline">
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage}
      </span>
      <Button onClick={handleNext} disabled={!hasNextPage} variant="outline">
        Next
      </Button>
    </motion.div>
  );
}
