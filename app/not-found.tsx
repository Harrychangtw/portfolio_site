import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
      <h1 className="text-6xl font-heading font-bold mb-6">404</h1>
      <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="px-6 py-3 border border-primary hover:bg-primary hover:text-background transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

