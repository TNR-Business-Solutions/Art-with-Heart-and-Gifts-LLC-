#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Copy data files to dist folder
const dataFiles = [
  "data.json",
  "data-gallery.json",
  "data-collections.json",
  "data-story.json",
];

const distDir = path.join(process.cwd(), "dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy each data file with validation
dataFiles.forEach((file) => {
  const sourcePath = path.join(process.cwd(), file);
  const destPath = path.join(distDir, file);

  if (fs.existsSync(sourcePath)) {
    try {
      // Read and validate JSON before copying
      const content = fs.readFileSync(sourcePath, "utf8");
      JSON.parse(content); // Validate JSON

      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file} to dist/`);
    } catch (error) {
      console.error(`❌ Error copying ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️  ${file} not found`);
  }
});

// Verify all files were copied
console.log("\n📋 Verifying copied files:");
dataFiles.forEach((file) => {
  const destPath = path.join(distDir, file);
  if (fs.existsSync(destPath)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

// Copy _redirects file for Netlify
const redirectsSource = path.join(process.cwd(), "public", "_redirects");
const redirectsDest = path.join(distDir, "_redirects");

if (fs.existsSync(redirectsSource)) {
  fs.copyFileSync(redirectsSource, redirectsDest);
  console.log("✅ Copied _redirects to dist/");
}

console.log("📁 Data files copied to dist folder");
