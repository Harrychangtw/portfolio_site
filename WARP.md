# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website featuring:
- TypeScript-based Next.js app directory structure
- Markdown-based content management system for projects and gallery
- Internationalization (i18n) support for English and Traditional Chinese
- Automated image optimization pipeline
- Radix UI components with Tailwind CSS styling

## Common Development Commands

### Local Development
```bash
npm run dev          # Start development server on localhost:3000
```

### Building & Production
```bash
npm run build        # Build production-ready application
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint (currently ignored during builds)
```

### Content Management
```bash
npm run optimize-images     # Optimize images in /public/images/ directories
npm run prepare-content     # Alias for optimize-images
```

## Architecture & Key Patterns

### Content Management System
The site uses a filesystem-based CMS with markdown files:
- **Projects**: `/content/projects/*.md` - Project showcases with metadata
- **Gallery**: `/content/gallery/*.md` - Photography and visual work
- **Papers**: `/content/papers/*.md` - Academic paper summaries
- **Templates**: `/content/templates/` - Starter templates for new content

Content files support internationalization via filename suffixes (e.g., `project_zh-tw.md`).

### API Routes
API endpoints in `/app/api/` serve content dynamically:
- `/api/projects` - Returns all projects with locale support
- `/api/projects/[slug]` - Individual project data
- `/api/gallery` - Gallery items listing
- `/api/gallery/[slug]` - Individual gallery item
- `/api/papers` - Academic papers listing

### Image Optimization Pipeline
The `/scripts/optimize-images.js` script automatically:
- Converts images to WebP format
- Creates multiple resolution variants (landscape, portrait, hero, thumbnail)
- Generates blur-up thumbnails for progressive loading
- Outputs to `/public/images/optimized/`

Image configurations:
- **Projects**: 2000x1200 (landscape), 1200x1800 (portrait), 2560px (hero)
- **Gallery**: 2560x1440 (landscape), 1440x2160 (portrait), 3200px (fullscreen)
- **Thumbnails**: 20px width with blur for placeholder effect

### Component Architecture
The app uses a hybrid of server and client components:
- Server Components: Page routes, data fetching, static content
- Client Components: Interactive elements, animations, dynamic UI (marked with `'use client'`)
- UI Library: `/components/ui/` contains reusable Radix UI-based components
- Custom Components: Business logic components in `/components/`

### Data Flow
1. Markdown files are parsed by `/lib/markdown.ts` using gray-matter
2. API routes serve processed content with metadata
3. Client components fetch data via API or receive props from server components
4. Images are automatically optimized and served from `/images/optimized/`

### Internationalization
- Supported locales: `en` (English), `zh-TW` (Traditional Chinese)
- Translation files: `/public/locales/[locale]/*.json`
- Content localization: Markdown files with `_zh-tw` suffix
- Language switching handled by `language-switcher.tsx` component

## Content File Structure

### Project Metadata Fields
Required:
- `title`, `category`, `description`, `imageUrl`, `year`, `date`

Optional:
- `subcategory`, `role`, `technologies[]`, `client`, `website`, `featured`, `pinned`, `locked`, `tooltip`

### Gallery Metadata Fields
Required:
- `title`, `description`, `imageUrl`, `quote`, `date`

Optional:
- `gallery[]`, `camera`, `lens`, `location`, `tags[]`, `featured`, `pinned`, `locked`, `aspectType`, `aspectRatio`

## Build Configuration Notes

### Next.js Settings
- TypeScript build errors are ignored (`ignoreBuildErrors: true`)
- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- Image optimization configured with multiple device sizes and WebP/AVIF support
- Experimental webpack optimizations enabled for faster builds

### Tailwind Configuration
- Custom color scheme using CSS variables for theming
- Typography plugin configured with custom link styling (dashed underline with hover effects)
- Font families: IBM Plex Sans (body), Space Grotesk (headings)
- Dark mode support via class-based switching

## Performance Optimizations
- Lazy loading for sections via `lazy-section-loader.tsx`
- Image preloading hooks in `/hooks/use-image-preloader.ts`
- Intersection observer for visibility detection
- Progressive image loading with blur-up thumbnails
- Parallel server builds and webpack workers enabled
