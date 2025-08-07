# Performance Optimizations for Project Pages

## Overview
This document outlines the performance optimizations implemented to address the Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) issues identified in the performance audit.

## Issues Addressed

### 1. Layout Shift Issues (CLS Score: 0.274)
**Root Causes:**
- Images without explicit dimensions causing layout shifts
- Footer layout instability due to dynamic content changes
- Markdown-rendered images using basic `<img>` tags without size reservations

**Solutions Implemented:**

#### A. Markdown Image Optimization (`lib/markdown.ts`)
- Modified `transformMedia()` function to wrap images with explicit aspect ratio containers
- Added `padding-bottom: 66.67%` (3:2 aspect ratio) to prevent layout shifts
- Implemented `object-fit: contain` and `object-position: center` for proper image scaling
- Added `loading="lazy"` and `decoding="async"` for better performance

#### B. Footer Layout Stability (`components/footer.tsx`)
- Changed `showManifesto` initial state from `false` to `true` to prevent initial layout shift
- Added `isClient` state to handle server/client hydration differences
- Used `visibility: hidden` instead of removing DOM elements to reserve space
- Added `tabIndex={-1}` for hidden manifesto link for better accessibility

#### C. Enhanced CSS Optimizations (`styles/lcp-optimize.css`)
- Added `contain: paint` and `content-visibility: auto` for better layout stability
- Added GPU acceleration with `transform: translateZ(0)` for images
- Implemented footer containment with `contain: layout paint`

### 2. LCP Performance Issues (1,980ms with 55% load delay)
**Root Causes:**
- Hero image not being preloaded with high priority
- No resource hints for critical images
- Missing aspect ratio specifications causing render delays

**Solutions Implemented:**

#### A. Image Preloading System
- Created `hooks/use-image-preloader.ts` for programmatic image preloading
- Added `fetchpriority="high"` for hero images
- Implemented automatic preload link injection in document head

#### B. Project Page Optimizations (`components/project-page-client.tsx`)
- Added `useImagePreloader` hook for hero image with high priority
- Increased image quality to 95% for hero images
- Added explicit `aspectRatio={1.5}` prop to prevent layout shift

#### C. Metadata Enhancements (`app/projects/[slug]/page.tsx`)
- Added OpenGraph images for better social sharing and preloading
- Enhanced metadata with proper image references

## Files Modified

### Core Components
- `lib/markdown.ts` - Enhanced markdown image processing
- `components/footer.tsx` - Footer layout stability improvements
- `components/project-page-client.tsx` - Added image preloading
- `app/projects/[slug]/page.tsx` - Enhanced metadata

### New Files
- `hooks/use-image-preloader.ts` - Image preloading utilities

### Style Enhancements
- `styles/lcp-optimize.css` - Additional performance CSS

## Testing Instructions

### 1. Core Web Vitals Testing

#### Using Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to the **Performance** tab
3. Check "Web Vitals" in the capture settings
4. Record a page load of a project page (e.g., `/projects/2025_01_03_powerplay`)
5. Look for:
   - **CLS score** should be < 0.1 (previously 0.274)
   - **LCP time** should be < 2.5s (previously 1.98s)
   - Layout shift events should be minimal

#### Using Lighthouse
1. Open Chrome DevTools
2. Go to the **Lighthouse** tab
3. Select "Performance" category
4. Run audit on project pages
5. Check improvements in:
   - Performance score
   - CLS metric
   - LCP metric
   - "Largest layout shifts" section

### 2. Visual Testing
- Navigate to project pages and observe:
  - No visible layout jumps during image loading
  - Footer remains stable during page load
  - Images load smoothly without shifting content
  - Markdown images within content maintain stable layout

### 3. Network Testing
- Use Chrome DevTools **Network** tab
- Look for preload requests with high priority for hero images
- Verify images are loading with appropriate priorities

## Expected Improvements

### CLS (Cumulative Layout Shift)
- **Before:** 0.274 (Poor)
- **Target:** < 0.1 (Good)
- **Improvements:**
  - Footer layout shifts eliminated
  - Image loading no longer causes content jumps
  - Markdown images have reserved space

### LCP (Largest Contentful Paint)
- **Before:** 1,980ms (with 55% load delay)
- **Target:** < 2,500ms (Good)
- **Improvements:**
  - Hero image preloading reduces load delay
  - Better resource prioritization
  - Reduced render blocking

### Additional Benefits
- Better user experience with stable layouts
- Improved SEO scores
- Enhanced accessibility
- Reduced perceived loading time

## Monitoring

After deployment, monitor these metrics using:
- Google PageSpeed Insights
- Chrome User Experience Report (CrUX)
- Web Vitals extension
- Core Web Vitals in Google Search Console

## Notes for Future Development

1. **Image Optimization:** Consider implementing WebP/AVIF format detection and serving
2. **Critical Resource Hints:** Add `<link rel="preload">` in the document head for above-the-fold images
3. **Progressive Loading:** Implement skeleton screens for better perceived performance
4. **Bundle Analysis:** Regular monitoring of JavaScript bundle sizes
5. **CDN Optimization:** Consider using a CDN for faster image delivery

---

These optimizations maintain the existing layout while significantly improving Core Web Vitals metrics and overall user experience.
