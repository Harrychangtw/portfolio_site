import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const GalleryImage = ({ src, caption, priority = false }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;
    
    const img = new window.Image();
    
    img.onload = () => {
      console.log(`GalleryImage loaded: ${src} with dimensions ${img.width}x${img.height}`);
      setDimensions({ width: img.width, height: img.height });
      setLoading(false);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load gallery image: ${src}, using fallback dimensions`);
      // Set fallback dimensions (3:2 aspect ratio)
      setDimensions({ width: 3, height: 2 });
      setLoading(false);
    };
    
    img.src = src;
  }, [src]);

  // Calculate aspect ratio from actual image dimensions
  // Default to 3:2 (landscape photography standard) if dimensions aren't available
  const aspectRatio = dimensions.width && dimensions.height 
    ? dimensions.width / dimensions.height 
    : 1.5;  // 3:2 ratio = 1.5
  
  return (
    <figure className="gallery-image-container">
      <div className="image-frame">
        {!loading && (
          <div 
            className="relative"
            style={{ 
              paddingBottom: `${(1 / aspectRatio) * 100}%`,
            }}
          >
            <Image
              ref={imgRef}
              src={src}
              alt={caption || "Gallery image"}
              fill
              style={{ objectFit: 'cover' }}
              priority={priority}
              className="gallery-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default GalleryImage;
