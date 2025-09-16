#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";

console.log("🚀 Starting Wix deployment process...");

// Check if we're in a Wix project
if (!fs.existsSync("wix.config.json")) {
  console.error("❌ Not in a Wix project directory");
  process.exit(1);
}

try {
  // Step 1: Build the project
  console.log("📦 Building project...");
  execSync("npm run build", { stdio: "inherit" });

  // Step 2: Login to Wix (if not already logged in)
  console.log("🔐 Checking Wix authentication...");
  try {
    execSync("wix whoami", { stdio: "pipe" });
    console.log("✅ Already logged in to Wix");
  } catch (error) {
    console.log("🔑 Logging in to Wix...");
    // This will prompt for login
    execSync("wix login", { stdio: "inherit" });
  }

  // Step 3: Deploy to Wix
  console.log("🚀 Deploying to Wix...");
  execSync("wix publish --yes", { stdio: "inherit" });

  // Step 4: Verify deployment
  console.log("✅ Deployment completed successfully!");
  console.log("🌐 Your site is now live on Wix!");
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
