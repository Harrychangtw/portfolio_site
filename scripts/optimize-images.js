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
    },
    thumbnail: {
      width: 800,
      quality: 75
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

// Process gallery images with better optimization
async function processGalleryImages() {
  console.log('Processing gallery images...');
  
  if (!fs.existsSync(config.directories.gallerySource)) {
    console.log('Gallery directory does not exist. Skipping.');
    return;
  }

  const galleryFolders = fs.readdirSync(config.directories.gallerySource);
  
  for (const galleryFolder of galleryFolders) {
    const galleryPath = path.join(config.directories.gallerySource, galleryFolder);
    
    if (!fs.lstatSync(galleryPath).isDirectory()) continue;
    
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

      try {
        const metadata = await sharp(imagePath).metadata();
        const isPortrait = metadata.height > metadata.width;
        
        // Generate full-size optimized version
        const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
        await sharp(imagePath)
          .resize({
            width: isPortrait ? config.gallery.portrait.width : config.gallery.landscape.width,
            height: isPortrait ? config.gallery.portrait.height : config.gallery.landscape.height,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: isPortrait ? config.gallery.portrait.quality : config.gallery.landscape.quality,
            effort: 6
          })
          .toFile(outputFilename);

        // Generate thumbnail version
        const thumbFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '-thumb.webp'));
        await sharp(imagePath)
          .resize({
            width: config.gallery.thumbnail.width,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ 
            quality: config.gallery.thumbnail.quality,
            effort: 6 
          })
          .toFile(thumbFilename);
          
        console.log(`  Optimized: ${image}`);
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