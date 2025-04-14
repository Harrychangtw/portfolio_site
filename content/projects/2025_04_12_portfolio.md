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
pinned: 3
featured: true
---

## Project Overview

This portfolio website was designed and developed to showcase my projects and photography in a clean, modern interface. The layout takes heavy inspiration from [Joseph Zhang’s site](https://joseph.cv/), utilizing a three-column structure for easy navigation and emphasis on visual content.

A core feature is the use of a **custom markdown-based content management system**, enabling easy content updates without relying on a traditional CMS or database. This makes managing and deploying new content as simple as editing markdown files.

---

## Key Features

### Markdown Processing

- Utilizes **gray-matter** to parse front matter.
- Converts markdown to HTML via **remark**.
- Implements a **numeric pinning system** for custom sorting and arrangement of content without the need for a database.

### Image Framing System

To ensure consistent visual presentation for photographs of various aspect ratios, a custom framing logic was implemented:

- **Vertical images**: white padding on **top and bottom**.
- **Horizontal images**: white padding on **left and right**.
- **Border thickness**: scales responsively between **1–6px**, depending on device size.

This framing ensures every image maintains its original aspect ratio while aligning cleanly with the grid layout.

### Performance Optimization

A custom script, `optimize-images.js`, was built to automate media processing:

- Converts all images to **WebP** format.
- Resizes and compresses images with variable quality settings depending on usage.
- Generates **thumbnails** for blur-up effects.

#### Progressive Loading Features

- **Blur-up loading** using tiny 20px-wide previews.
- Custom **skeleton components** for smoother transitions.
- **Shimmer animation** during loading to enhance UX.

#### Image Guidelines (Enforced in Build)

- **Gallery images**: Max **2000px** on the longest side.
- **Portraits**: **1080×1620px** (2:3 aspect ratio).
- **Landscapes**: **1620×1080px** (3:2 aspect ratio).

---

## Tools & Technologies

- **Next.js** – Framework for static site generation and routing.
- **React** – UI development and component architecture.
- **TypeScript** – Ensures type safety and maintainability.
- **TailwindCSS** – Utility-first styling for rapid development.
- **Markdown** – Content management format for flexibility and ease.
- **Framer Motion** – Smooth animations and transitions for enhanced interactivity.

