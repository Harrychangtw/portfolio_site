import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Harry Chang | Portfolio",
  description: "Harry Chang's portfolio showcasing design and development work",
  other: {
    "priority": "high"
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4">This is my personal portfolio website.</p>
      </div>
    </main>
  );
}

