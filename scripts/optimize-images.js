#!/usr/bin/env node
/**
 * Image Optimization Script
 * 
 * This script optimizes images for the portfolio website according to the guidelines.
 * It processes images in the public/images/projects and public/images/gallery folders.
 * 
 * Usage:
 *   node scripts/optimize-images.js
 * 
 * Requirements:
 *   - sharp: npm install sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  projects: {
    cover: {
      width: 1200,
      height: 800,
      quality: 80,
    },
    content: {
      width: 2000,  // Increased for high-DPI displays
      quality: 85,
    }
  },
  gallery: {
    cover: {
      width: 1200,
      height: 1200,
      quality: 85,
    },
    landscape: {
      width: 2560,  // Increased for high-DPI displays
      height: 1440,
      quality: 90,
    },
    portrait: {
      width: 1440,
      height: 2160,  // Increased for high-DPI displays
      quality: 90,
    },
    // New config for fullscreen images
    fullscreen: {
      width: 3200,  // High resolution for full viewport
      quality: 90,
    }
  },
  // Directories
  directories: {
    projectsSource: path.join(__dirname, '../public/images/projects'),
    gallerySource: path.join(__dirname, '../public/images/gallery'),
    optimized: path.join(__dirname, '../public/images/optimized')
  }
};

// Ensure output directories exist
function ensureDirectoriesExist() {
  [config.directories.optimized].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Process project images
async function processProjectImages() {
  console.log('Processing project images...');
  
  if (!fs.existsSync(config.directories.projectsSource)) {
    console.log('Projects directory does not exist. Skipping.');
    return;
  }

  const projectFolders = fs.readdirSync(config.directories.projectsSource);
  
  for (const projectFolder of projectFolders) {
    const projectPath = path.join(config.directories.projectsSource, projectFolder);
    
    if (!fs.lstatSync(projectPath).isDirectory()) {
      continue;
    }
    
    console.log(`Processing project: ${projectFolder}`);
    
    const images = fs.readdirSync(projectPath).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    for (const image of images) {
      const imagePath = path.join(projectPath, image);
      const outputPath = path.join(config.directories.optimized, 'projects', projectFolder);
      
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      // Determine if this is a cover image
      const isCover = image.includes('cover') || image === images[0];
      const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
      
      try {
        if (isCover) {
          await sharp(imagePath)
            .resize({
              width: config.projects.cover.width,
              height: config.projects.cover.height,
              fit: 'cover'
            })
            .webp({ quality: config.projects.cover.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized cover: ${image} -> ${path.basename(outputFilename)}`);
        } else {
          await sharp(imagePath)
            .resize({
              width: config.projects.content.width,
              withoutEnlargement: true
            })
            .webp({ quality: config.projects.content.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized content: ${image} -> ${path.basename(outputFilename)}`);
        }
      } catch (error) {
        console.error(`  Error processing ${image}:`, error);
      }
    }
  }
}

// Process gallery images
async function processGalleryImages() {
  console.log('Processing gallery images...');
  
  if (!fs.existsSync(config.directories.gallerySource)) {
    console.log('Gallery directory does not exist. Skipping.');
    return;
  }

  const galleryFolders = fs.readdirSync(config.directories.gallerySource);
  
  for (const galleryFolder of galleryFolders) {
    const galleryPath = path.join(config.directories.gallerySource, galleryFolder);
    
    if (!fs.lstatSync(galleryPath).isDirectory()) {
      continue;
    }
    
    console.log(`Processing gallery: ${galleryFolder}`);
    
    const images = fs.readdirSync(galleryPath).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    for (const image of images) {
      const imagePath = path.join(galleryPath, image);
      const outputPath = path.join(config.directories.optimized, 'gallery', galleryFolder);
      
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      const isCover = image.includes('cover') || image === images[0];
      const isFullscreen = image.includes('fullscreen') || image.includes('hero');
      const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
      
      try {
        // Determine image dimensions
        const metadata = await sharp(imagePath).metadata();
        const isPortrait = metadata.height > metadata.width;
        
        if (isCover) {
          // Cover images are always square
          await sharp(imagePath)
            .resize({
              width: config.gallery.cover.width,
              height: config.gallery.cover.height,
              fit: 'cover'
            })
            .webp({ quality: config.gallery.cover.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized cover: ${image} -> ${path.basename(outputFilename)}`);
        } else if (isFullscreen) {
          // Fullscreen images need to be high resolution
          await sharp(imagePath)
            .resize({
              width: config.gallery.fullscreen.width,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: config.gallery.fullscreen.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized fullscreen: ${image} -> ${path.basename(outputFilename)}`);
        } else if (isPortrait) {
          // Portrait orientation
          await sharp(imagePath)
            .resize({
              width: config.gallery.portrait.width,
              height: config.gallery.portrait.height,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: config.gallery.portrait.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized portrait: ${image} -> ${path.basename(outputFilename)}`);
        } else {
          // Landscape orientation
          await sharp(imagePath)
            .resize({
              width: config.gallery.landscape.width,
              height: config.gallery.landscape.height,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: config.gallery.landscape.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized landscape: ${image} -> ${path.basename(outputFilename)}`);
        }
        
        // Generate a smaller version for thumbnails/previews when needed
        if (!isCover && !image.includes('thumb') && (metadata.width > 1200 || metadata.height > 1200)) {
          const thumbFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '-thumb.webp'));
          
          await sharp(imagePath)
            .resize({
              width: 1200,
              height: 1200,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 75 })
            .toFile(thumbFilename);
            
          console.log(`  Generated thumbnail: ${image} -> ${path.basename(thumbFilename)}`);
        }
      } catch (error) {
        console.error(`  Error processing ${image}:`, error);
      }
    }
  }
}

// Main function
async function main() {
  console.log('Image optimization starting...');
  ensureDirectoriesExist();
  
  await processProjectImages();
  await processGalleryImages();
  
  console.log('Image optimization complete!');
}

main().catch(error => {
  console.error('Error during image optimization:', error);
  process.exit(1);
});