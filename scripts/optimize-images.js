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
    fullscreen: {
      width: 3200,  // High resolution for full viewport
      quality: 95,
    },
    thumbnail: {
      width: 20,  // Very small for blur-up effect
      quality: 60,
    }
  },
  // Directories
  directories: {
    projectsSource: path.join(process.cwd(), 'public', 'images', 'projects'),
    gallerySource: path.join(process.cwd(), 'public', 'images', 'gallery'),
    optimized: path.join(process.cwd(), 'public', 'images', 'optimized'),
  }
};

// Ensure output directories exist
if (!fs.existsSync(config.directories.optimized)) {
  fs.mkdirSync(config.directories.optimized, { recursive: true });
}

// Helper to check if file exists and return replacement message
function checkFileReplacement(filePath) {
  return fs.existsSync(filePath) ? ' (replaced)' : ' (new)';
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
        // Get image metadata
        const metadata = await sharp(imagePath).metadata();
        const isPortrait = metadata.height > metadata.width;
        
        // Generate optimized full-size image
        if (isFullscreen) {
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
        
        // Generate thumbnail for blur-up loading
        if (!image.includes('thumb')) {
          const thumbFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '-thumb.webp'));
          const thumbReplacementMsg = checkFileReplacement(thumbFilename);
          
          // Create a very small, blurry version for the blur-up effect
          await sharp(imagePath)
            .resize({
              width: config.gallery.thumbnail.width,
              withoutEnlargement: true,
              fit: 'inside',
            })
            .blur(2) // Add slight blur for smoother appearance when scaled
            .webp({ quality: config.gallery.thumbnail.quality })
            .toFile(thumbFilename);
            
          console.log(`  Generated thumbnail: ${image} -> ${path.basename(thumbFilename)}${thumbReplacementMsg}`);
        }
      } catch (error) {
        console.error(`  Error processing ${image}:`, error);
      }
    }
  }
}

// Process project images
async function processProjectImages() {
  console.log('Processing project images...');
  
  if (!fs.existsSync(config.directories.projectsSource)) {
    console.log('Projects directory does not exist. Skipping.');
    return;
  }

  const images = fs.readdirSync(config.directories.projectsSource)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  for (const image of images) {
    const imagePath = path.join(config.directories.projectsSource, image);
    const outputPath = path.join(config.directories.optimized, 'projects');
    
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    const outputFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '.webp'));
    const replacementMsg = checkFileReplacement(outputFilename);
    
    try {
      await sharp(imagePath)
        .resize({
          width: config.projects.content.width,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: config.projects.content.quality })
        .toFile(outputFilename);
        
      console.log(`  Optimized: ${image} -> ${path.basename(outputFilename)}${replacementMsg}`);
      
      // Generate thumbnail for blur-up loading
      if (!image.includes('thumb')) {
        const thumbFilename = path.join(outputPath, image.replace(/\.[^.]+$/, '-thumb.webp'));
        const thumbReplacementMsg = checkFileReplacement(thumbFilename);
        
        await sharp(imagePath)
          .resize({
            width: config.gallery.thumbnail.width,
            withoutEnlargement: true,
            fit: 'inside',
          })
          .blur(2)
          .webp({ quality: config.gallery.thumbnail.quality })
          .toFile(thumbFilename);
          
        console.log(`  Generated thumbnail: ${image} -> ${path.basename(thumbFilename)}${thumbReplacementMsg}`);
      }
    } catch (error) {
      console.error(`  Error processing ${image}:`, error);
    }
  }
}

// Run the optimization
async function main() {
  console.log('Starting image optimization...');
  await processGalleryImages();
  await processProjectImages();
  console.log('Image optimization complete!');
}

main().catch(console.error);