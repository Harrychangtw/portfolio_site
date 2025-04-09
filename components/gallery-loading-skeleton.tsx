export function GalleryLoadingSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-full" style={{ paddingBottom: "66.67%" /* 3:2 aspect ratio */ }}>
        <div className="absolute inset-0 bg-muted animate-pulse rounded-none"></div>
      </div>
    </div>
  )
}