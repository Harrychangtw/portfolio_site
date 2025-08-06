'use client'

import React, { useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { Play, AlertCircle, Loader2 } from 'lucide-react'

interface VideoEmbedProps {
  src: string
  title?: string
  type: 'youtube' | 'googledrive'
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, title, type }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoaded(true)
  }, [])

  const handlePlayClick = useCallback(() => {
    setShouldLoad(true)
  }, [])

  // Auto-load when in view, or load when play button is clicked
  const shouldShowIframe = inView && (shouldLoad || type === 'googledrive')

  const getVideoThumbnail = () => {
    if (type === 'youtube') {
      // Extract video ID from YouTube embed URL
      const videoIdMatch = src.match(/embed\/([a-zA-Z0-9_-]{11})/)
      if (videoIdMatch) {
        return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`
      }
    }
    return null
  }

  const thumbnail = getVideoThumbnail()

  return (
    <figure className="my-6">
      <div 
        ref={ref}
        className="relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
        style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
      >
        {!shouldShowIframe ? (
          // Placeholder/thumbnail view
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            {thumbnail && type === 'youtube' ? (
              <div className="relative w-full h-full">
                <img
                  src={thumbnail}
                  alt={title || 'Video thumbnail'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <button
                    onClick={handlePlayClick}
                    className="flex items-center justify-center w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200 group"
                    aria-label="Play video"
                  >
                    <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform duration-200" fill="currentColor" />
                  </button>
                </div>
              </div>
            ) : (
              // Fallback placeholder for Google Drive or when thumbnail isn't available
              <div className="flex flex-col items-center justify-center text-muted-foreground p-8">
                <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg mb-4 flex items-center justify-center">
                  <Play className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <p className="text-sm text-center mb-4">
                  {type === 'youtube' ? 'YouTube Video' : 'Google Drive Video'}
                </p>
                {type === 'youtube' && (
                  <button
                    onClick={handlePlayClick}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 text-sm"
                  >
                    Load Video
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          // iframe container with loading state
          <div className="absolute inset-0">
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-muted overflow-hidden z-10">
                {/* Shimmer effect */}
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-muted via-muted/50 to-muted" />
                
                {/* Loading indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-xs text-white">Loading video...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
                  <p className="text-sm mb-2">Failed to load video</p>
                  <button
                    onClick={() => {
                      setHasError(false)
                      setIsLoaded(false)
                    }}
                    className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src={src}
                className={`w-full h-full border-0 transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                allow={
                  type === 'youtube'
                    ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    : 'autoplay; encrypted-media'
                }
                allowFullScreen
                title={title || 'Embedded video'}
                onLoad={handleLoad}
                onError={handleError}
              />
            )}
          </div>
        )}
      </div>
      {title && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-left">
          {title}
        </figcaption>
      )}
    </figure>
  )
}

export default VideoEmbed
