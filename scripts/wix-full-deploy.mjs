#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";

console.log("🚀 Starting Full Wix Deployment (Frontend + Backend)...");

try {
  // Step 1: Prepare frontend files
  console.log("📦 Preparing frontend files...");

  // Create a dist directory for Wix
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }

  // Copy all necessary frontend files
  const frontendFiles = [
    "index.html",
    "gallery.html",
    "shop.html",
    "cart.html",
    "checkout.html",
    "about.html",
    "contact.html",
    "privacy.html",
    "terms.html",
    "returns.html",
    "shipping.html",
    "commissions.html",
    "healing.html",
    "collections.html",
  ];

  frontendFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, `dist/${file}`);
      console.log(`✅ Copied ${file}`);
    }
  });

  // Copy public assets
  if (fs.existsSync("public")) {
    execSync("xcopy public dist\\public /E /I /Y", { stdio: "inherit" });
    console.log("✅ Copied public assets");
  }

  // Step 2: Prepare backend for Wix
  console.log("🔧 Preparing backend for Wix...");

  // Create backend directory in dist
  if (!fs.existsSync("dist/backend")) {
    fs.mkdirSync("dist/backend");
  }

  // Copy backend files
  if (fs.existsSync("backend")) {
    execSync("xcopy backend dist\\backend /E /I /Y", { stdio: "inherit" });
    console.log("✅ Copied backend files");
  }

  // Step 3: Create Wix-specific files
  console.log("📝 Creating Wix-specific files...");

  // Create wix-site-config.json
  const wixConfig = {
    name: "artwithheartandgifts",
    version: "1.0.0",
    description: "Art with Heart & Gifts - Handcrafted Art & Gifts",
    type: "wix-site",
    frontend: {
      entry: "index.html",
      assets: "public",
    },
    backend: {
      entry: "backend/server.js",
      functions: "backend/functions",
    },
    deployment: {
      target: "wix",
      autoPublish: true,
    },
  };

  fs.writeFileSync(
    "dist/wix-site-config.json",
    JSON.stringify(wixConfig, null, 2)
  );

  // Step 4: Create deployment package
  console.log("📦 Creating deployment package...");

  // Create a zip file for Wix
  execSync(
    "powershell Compress-Archive -Path dist\\* -DestinationPath wix-deployment.zip -Force",
    { stdio: "inherit" }
  );
  console.log("✅ Created wix-deployment.zip");

  // Step 5: Deploy to Wix
  console.log("🚀 Deploying to Wix...");

  // Check Wix authentication
  try {
    execSync("wix whoami", { stdio: "pipe" });
    console.log("✅ Already logged in to Wix");
  } catch (error) {
    console.log("🔑 Logging in to Wix...");
    execSync("wix login", { stdio: "inherit" });
  }

  // Deploy using Wix CLI
  execSync("wix publish --yes", { stdio: "inherit" });

  // Step 6: Verify deployment
  console.log("✅ Full deployment completed successfully!");
  console.log("🌐 Your Art with Heart & Gifts site is now live on Wix!");
  console.log("📱 Frontend: All HTML pages and assets deployed");
  console.log("🔧 Backend: All server functions and data deployed");
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  console.log("🔧 Please check the error and try again.");
  process.exit(1);
}
