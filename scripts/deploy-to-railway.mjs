#!/usr/bin/env node

/**
 * Deploy SMTP Fix to Railway
 * Updates existing Railway deployment with optimized SMTP settings
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 DEPLOYING SMTP FIX TO RAILWAY");
console.log("=======================================");

// Check if Railway CLI is installed
try {
  execSync("railway --version", { stdio: "pipe" });
  console.log("✅ Railway CLI detected");
} catch (error) {
  console.log("📦 Installing Railway CLI...");
  try {
    execSync("npm install -g @railway/cli", { stdio: "inherit" });
    console.log("✅ Railway CLI installed");
  } catch (installError) {
    console.log("❌ Failed to install Railway CLI automatically");
    console.log("Please install manually: npm install -g @railway/cli");
    console.log("Then run this script again");
    process.exit(1);
  }
}

// Check if we're in a Railway project
const deployPackagePath = path.join(projectRoot, "deploy-package");
if (!fs.existsSync(deployPackagePath)) {
  console.error("❌ deploy-package directory not found!");
  process.exit(1);
}

console.log("✅ Deploy package found");

// Copy deploy-package contents to a temporary deployment directory
const tempDeployDir = path.join(projectRoot, "temp-railway-deploy");

if (fs.existsSync(tempDeployDir)) {
  fs.rmSync(tempDeployDir, { recursive: true });
}
fs.mkdirSync(tempDeployDir);

console.log("📋 Preparing deployment files...");

// Copy all files from deploy-package to temp deploy directory
const copyRecursive = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

copyRecursive(deployPackagePath, tempDeployDir);

// Create a simple deployment script
const deployScript = `#!/bin/bash
echo "🚀 Deploying SMTP fixes to Railway..."

# Navigate to deployment directory
cd "${tempDeployDir}"

# Initialize git if not already a git repo
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "SMTP fixes for Railway deployment"
fi

# Login to Railway (will prompt for authentication)
echo "🔐 Authenticating with Railway..."
railway login

# Link to existing project
echo "🔗 Linking to Railway project..."
railway link

# Deploy the fixed code
echo "🚀 Deploying fixes..."
railway up

echo "✅ Deployment complete!"
echo "🧪 Test your commission forms now!"
`;

fs.writeFileSync(path.join(tempDeployDir, "deploy.sh"), deployScript);

console.log("✅ Deployment files ready");

// For Windows, create a PowerShell deployment script
const powershellScript = `
Write-Host "🚀 Deploying SMTP fixes to Railway..." -ForegroundColor Green

# Navigate to deployment directory
Set-Location "${tempDeployDir}"

# Initialize git if not already a git repo
if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "SMTP fixes for Railway deployment"
}

# Login to Railway (will open browser)
Write-Host "🔐 Authenticating with Railway..." -ForegroundColor Yellow
railway login

# Link to existing project
Write-Host "🔗 Linking to Railway project..." -ForegroundColor Yellow
railway link

# Deploy the fixed code
Write-Host "🚀 Deploying fixes..." -ForegroundColor Yellow
railway up

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🧪 Test your commission forms now!" -ForegroundColor Cyan
`;

fs.writeFileSync(path.join(tempDeployDir, "deploy.ps1"), powershellScript);

console.log("\n🎯 DEPLOYMENT OPTIONS:");
console.log("=====================================");

console.log("\n📁 Deployment files created in:");
console.log(`   ${tempDeployDir}`);

console.log("\n🚀 Option 1: Automatic Railway CLI Deployment");
console.log("   Run from current directory:");
console.log(`   cd "${tempDeployDir}"`);
console.log("   railway login");
console.log("   railway link");
console.log("   railway up");

console.log("\n🌐 Option 2: Manual Upload to Railway");
console.log("   1. Go to Railway.app → Your project");
console.log("   2. Click 'Deploy' → 'Deploy from folder'");
console.log(`   3. Upload: art-with-heart-backend-SMTP-FIX-FINAL.zip`);

console.log("\n🔧 Option 3: GitHub Integration");
console.log("   1. Copy deploy-package contents to a new GitHub repo");
console.log("   2. Connect the repo to Railway");
console.log("   3. Automatic deployment will trigger");

console.log("\n📧 SMTP Settings (keep existing Yahoo settings):");
console.log("   SMTP_HOST=smtp.mail.yahoo.com");
console.log("   SMTP_PORT=587");
console.log("   SMTP_USER=artwithheartandgifts@yahoo.com");
console.log("   SMTP_PASS=your_yahoo_app_password");

console.log("\n⚡ The optimized settings should fix the timeout issues!");
console.log("✅ Your commission forms will work after this deployment.");
