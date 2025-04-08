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
    content: {
      width: 2000,  // Increased for high-DPI displays
      quality: 85,
    }
  },
  gallery: {
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

// Helper function to check if file exists and log replacement
function checkFileReplacement(outputFilename) {
  if (fs.existsSync(outputFilename)) {
    return ' (replacing existing file)';
  }
  return '';
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
      
      const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
      const replacementMsg = checkFileReplacement(outputFilename);
      
      try {
        // Standard processing for all project images
        await sharp(imagePath)
          .resize({
            width: config.projects.content.width,
            withoutEnlargement: true
          })
          .webp({ quality: config.projects.content.quality })
          .toFile(outputFilename);
          
        console.log(`  Optimized: ${image} -> ${path.basename(outputFilename)}${replacementMsg}`);
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
      
      const isFullscreen = image.includes('fullscreen') || image.includes('hero');
      const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
      const replacementMsg = checkFileReplacement(outputFilename);
      
      try {
        // Determine image dimensions
        const metadata = await sharp(imagePath).metadata();
        const isPortrait = metadata.height > metadata.width;
        
        if (isFullscreen) {
          // Fullscreen images need to be high resolution
          await sharp(imagePath)
            .resize({
              width: config.gallery.fullscreen.width,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: config.gallery.fullscreen.quality })
            .toFile(outputFilename);
            
          console.log(`  Optimized fullscreen: ${image} -> ${path.basename(outputFilename)}${replacementMsg}`);
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
            
          console.log(`  Optimized portrait: ${image} -> ${path.basename(outputFilename)}${replacementMsg}`);
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
            
          console.log(`  Optimized landscape: ${image} -> ${path.basename(outputFilename)}${replacementMsg}`);
        }
        
        // Generate a smaller version for thumbnails/previews when needed
        if (!image.includes('thumb') && (metadata.width > 1200 || metadata.height > 1200)) {
          const thumbFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '-thumb.webp'));
          const thumbReplacementMsg = checkFileReplacement(thumbFilename);
          
          await sharp(imagePath)
            .resize({
              width: 1200,
              height: 1200,
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 75 })
            .toFile(thumbFilename);
            
          console.log(`  Generated thumbnail: ${image} -> ${path.basename(thumbFilename)}${thumbReplacementMsg}`);
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
  console.log('Note: Existing optimized files will be replaced if they exist.');
  ensureDirectoriesExist();
  
  await processProjectImages();
  await processGalleryImages();
  
  console.log('Image optimization complete!');
}

main().catch(error => {
  console.error('Error during image optimization:', error);
  process.exit(1);
});