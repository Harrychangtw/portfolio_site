---
title: "Portfolio Website"
category: "Web Development"
subcategory: "Personal Project"
description: "A modern portfolio website built with Next.js and a markdown-based content management system for easy updates."
imageUrl: "images/optimized/projects/2025_04_12_portfolio_design/titlecard.webp"
year: "2025"
date: "2025-04-12"
role: "Designer & Developer"
technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"]
featured: true
---


## Project Overview

This portfolio website was designed and developed to showcase my projects and photography in a clean, modern interface. with it's 3 column layout heavily inspired by [Joseph Zhang](https://joseph.cv/)’s site. The site uses a custom markdown-based content management system that allows for easy updates without the need for a traditional CMS or database.

---
## Website Feature

**Markdown Processing**:
Uses gray-matter for front matter and remark for HTML conversion with an additional numeric pinning system to simplify content management and arangement.


**Image Framing**:

Considering that photography peices are often in varying aspect ratios, to maintain the original aspect ratio and clean arrangement, I implemented a framing feature with the following behavior:

Images receive a white border frame with:
- Vertical images: White padding on top and bottom
- Horizontal images: White padding on left and right
- Border thickness: 1-6px (responsive based on device)

**Performance Optimization**
Uses a custom optimize-images.js script that:
- Automatically converts images to WebP format
- Resizes images to optimal dimensions
- Compresses images with different quality settings based on usage
- Creates thumbnails for blur-up loading effect

Progressive Loading Features:
- Blur-up loading with small thumbnails (20px width)
- Loading skeleton component for better UX
- Shimmer effect during loading states

Specific image guidelines for different use cases:
- Gallery images: Maximum 2000px on longest side
- Portrait photos: 1080×1620px (2:3 ratio)
- Landscape photos: 1620×1080px (3:2 ratio)


## Tools Used

- Next.js for the framework
- React for the UI components
- TypeScript for type safety
- TailwindCSS for styling
- Markdown for content
- Framer Motion for animations

