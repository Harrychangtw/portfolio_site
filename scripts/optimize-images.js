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
    landscape: {
      width: 2000,
      height: 1200,
      quality: 90,
    },
    portrait: {
      width: 1200,
      height: 1800,
      quality: 90,
    },
    hero: {
      width: 2560,
      quality: 95,
    },
    thumbnail: {
      width: 20,  // Very small for blur-up effect
      quality: 60,
    }
  },
  gallery: {
    landscape: {
      width: 2560,
      height: 1440,
      quality: 90,
    },
    portrait: {
      width: 1440,
      height: 2160,
      quality: 90,
    },
    fullscreen: {
      width: 3200,
      quality: 95,
    },
    thumbnail: {
      width: 20,
      quality: 60,
    }
  },
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

// Helper to process a directory recursively
async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await processDirectory(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
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
}

// Process project images
async function processProjectImages() {
  console.log('Processing project images...');
  
  if (!fs.existsSync(config.directories.projectsSource)) {
    console.log('Projects directory does not exist. Skipping.');
    return;
  }

  const images = await processDirectory(config.directories.projectsSource);

  for (const imagePath of images) {
    // Maintain the directory structure in the output
    const relativePath = path.relative(config.directories.projectsSource, imagePath);
    const outputPath = path.join(config.directories.optimized, 'projects', path.dirname(relativePath));
    
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    const outputFilename = path.join(outputPath, path.basename(imagePath).replace(/\.[^.]+$/, '.webp'));
    const replacementMsg = checkFileReplacement(outputFilename);
    
    try {
      // Get image metadata
      const metadata = await sharp(imagePath).metadata();
      const isPortrait = metadata.height > metadata.width;
      const isHero = imagePath.toLowerCase().includes('hero') || path.basename(imagePath).startsWith('hero');
      
      // Generate optimized full-size image
      if (isHero) {
        await sharp(imagePath)
          .resize({
            width: config.projects.hero.width,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: config.projects.hero.quality })
          .toFile(outputFilename);
          
        console.log(`  Optimized hero: ${relativePath} -> ${path.basename(outputFilename)}${replacementMsg}`);
      } else if (isPortrait) {
        await sharp(imagePath)
          .resize({
            width: config.projects.portrait.width,
            height: config.projects.portrait.height,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: config.projects.portrait.quality })
          .toFile(outputFilename);
          
        console.log(`  Optimized portrait: ${relativePath} -> ${path.basename(outputFilename)}${replacementMsg}`);
      } else {
        await sharp(imagePath)
          .resize({
            width: config.projects.landscape.width,
            height: config.projects.landscape.height,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: config.projects.landscape.quality })
          .toFile(outputFilename);
          
        console.log(`  Optimized landscape: ${relativePath} -> ${path.basename(outputFilename)}${replacementMsg}`);
      }
      
      // Generate thumbnail for blur-up loading
      if (!imagePath.includes('thumb')) {
        const thumbFilename = path.join(outputPath, path.basename(imagePath).replace(/\.[^.]+$/, '-thumb.webp'));
        const thumbReplacementMsg = checkFileReplacement(thumbFilename);
        
        await sharp(imagePath)
          .resize({
            width: config.projects.thumbnail.width,
            withoutEnlargement: true,
            fit: 'inside',
          })
          .blur(2)
          .webp({ quality: config.projects.thumbnail.quality })
          .toFile(thumbFilename);
          
        console.log(`  Generated thumbnail: ${relativePath} -> ${path.basename(thumbFilename)}${thumbReplacementMsg}`);
      }
    } catch (error) {
      console.error(`  Error processing ${relativePath}:`, error);
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