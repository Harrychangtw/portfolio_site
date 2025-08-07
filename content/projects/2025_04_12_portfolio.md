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
pinned: 5
featured: true
---

## Project Overview

This portfolio is a statically generated site built with Next.js, designed to deliver a fast, content-focused experience. The architecture leverages a custom markdown-based content management system, which parses `.md` files at build time to generate static pages. This approach eliminates the need for a traditional database, resulting in a highly performant and easily maintainable site.

The front-end is built with React and TypeScript, ensuring a robust and type-safe codebase. The UI is styled with TailwindCSS for rapid, utility-first development, and features a responsive three-column layout inspired by Joseph Zhang's portfolio.

---

## Code Architecture

The codebase is organized into several key directories:

-   **`app/`**: Contains the Next.js routing and page components. Each page is a server component that fetches its data from the markdown content.
-   **`lib/`**: Includes the core logic for markdown processing (`lib/markdown.ts`), which handles file reading, frontmatter parsing, and HTML conversion.
-   **`content/`**: Stores all markdown files for projects and the gallery, acting as a headless CMS.
-   **`components/`**: Houses reusable React components, including UI elements, layout components, and client-side interactive components.
-   **`public/`**: Stores all static assets, including images and other media.

This structure separates the content from the presentation, allowing for easy updates and maintenance.

---

## Key Technical Features

### Markdown-Powered Content

The site's content is managed entirely through markdown files. The `lib/markdown.ts` module uses the following libraries to process the content:

-   **`gray-matter`**: Parses the YAML frontmatter from each markdown file, providing metadata for each project or gallery item.
-   **`remark` and `remark-html`**: Converts the markdown content into HTML, which is then rendered by the React components.
-   **`unist-util-visit`**: Traverses the markdown abstract syntax tree (AST) to implement custom transformations, such as the media embedding feature.

### Dynamic Media Embedding

A custom Remark plugin, `transformMedia`, was developed to handle different media types. This plugin intercepts image nodes in the markdown AST and replaces them with custom HTML for:

-   **YouTube and Google Drive Videos**: Embedding videos with a custom placeholder and lazy loading.
-   **Optimized Images**: Generating a `figure` element with a lazy-loaded `img` tag and a shimmer effect for a smooth loading experience.

### Performance-First Design

Performance was a key consideration in the development of this site. The following techniques were used to achieve a high-performance score:

-   **Static Site Generation (SSG)**: All pages are pre-rendered at build time, resulting in incredibly fast load times.
-   **Image Optimization**: A custom script automates the conversion of images to the modern WebP format, resizes them, and generates low-quality image placeholders (LQIP) for a blur-up effect.
-   **Code Splitting**: Next.js automatically splits the code into smaller chunks, so only the necessary JavaScript is loaded for each page.

### Internationalization (i18n)

The site supports both English and Traditional Chinese. The content is filtered based on the locale, with a file-based routing system. Chinese content is identified by the `_zh-tw.md` suffix, and the site gracefully falls back to the English version if a translation is not available.

---

## Tools & Technologies

-   **Next.js**: Used for its static site generation capabilities, file-based routing, and overall performance.
-   **React**: The core of the UI, enabling the creation of a component-based, interactive user experience.
-   **TypeScript**: Ensures type safety throughout the application, reducing the likelihood of runtime errors.
-   **TailwindCSS**: A utility-first CSS framework that allows for rapid and consistent styling.
-   **`gray-matter` and `remark`**: The backbone of the markdown-based content system, handling the parsing and rendering of all content.
-   **Framer Motion**: Adds fluid animations and transitions, enhancing the user experience.

