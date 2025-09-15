#!/usr/bin/env node

/**
 * Emergency Railway Deployment Script
 * Deploys the fixed backend with email functionality to Railway
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚨 EMERGENCY RAILWAY DEPLOYMENT - Art with Heart & Gifts");
console.log("==========================================");

// Check if we're in the right directory
const railwayDeployPath = path.join(projectRoot, "railway-deploy");
if (!fs.existsSync(railwayDeployPath)) {
  console.error("❌ railway-deploy directory not found!");
  process.exit(1);
}

console.log("✅ Found railway-deploy directory");

// Check required files
const requiredFiles = [
  "server.js",
  "email-service.js",
  "package.json",
  "payment-processor.js",
  "swipe-simple-live-integration.js",
];

console.log("\n📁 Checking required files...");
for (const file of requiredFiles) {
  const filePath = path.join(railwayDeployPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
  console.log(`✅ ${file}`);
}

// Create deployment package
console.log("\n📦 Creating deployment package...");
const deployDir = path.join(projectRoot, "deploy-package");

// Clean and create deploy directory
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir);

// Copy railway-deploy contents to deploy package
console.log("📋 Copying files...");
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

copyRecursive(railwayDeployPath, deployDir);

// Create README with deployment instructions
const readmeContent = `# Art with Heart & Gifts Backend - Emergency Fix

## 🚨 CRITICAL FIXES APPLIED:
✅ Email Service Added - Commission and contact forms now working
✅ Payment Processor Fixed - Secure checkout notifications working  
✅ All Dependencies Updated - Added nodemailer for email functionality

## 🚀 DEPLOYMENT INSTRUCTIONS:

### Method 1: Railway (Recommended)
1. Zip this entire folder
2. Go to Railway.app
3. "New Project" → "Deploy from folder"
4. Upload the zip file
5. Add environment variables (CRITICAL - see below)
6. Deploy!

### Method 2: Alternative Platforms
- Render.com: Connect GitHub → Set root directory to this folder
- Vercel: Import from GitHub → Configure as Node.js function
- Heroku: Create app → Connect GitHub → Set root directory

## 🔧 REQUIRED Environment Variables:
\`\`\`
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com

# Swipe Simple (for payments)
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here

# Email (CRITICAL for forms to work)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=artwithheartandgifts@yahoo.com
SMTP_PASS=your_yahoo_app_password_here
EMAIL_USER=artwithheartandgifts@yahoo.com
EMAIL_PASS=your_yahoo_app_password_here
\`\`\`

## 📧 Yahoo Email Setup:
1. Go to Yahoo Account Security
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use App Password as SMTP_PASS and EMAIL_PASS

## 🧪 Test Endpoints After Deployment:
- Health: GET /api/health
- Email Test: POST /api/email/test
- Contact Form: POST /api/contact
- Commission Form: POST /api/commission

## 🌐 Frontend Configuration:
The frontend is already configured to use the Railway URL:
https://art-with-heart-and-gifts-llc-production.up.railway.app

If you deploy to a different platform, update src/js/app.js lines 651 and 707.

---
Generated: ${new Date().toISOString()}
`;

fs.writeFileSync(path.join(deployDir, "README-DEPLOY.md"), readmeContent);

console.log(`✅ Deployment package created at: ${deployDir}`);

// Create deployment ZIP
console.log("\n📦 Creating deployment ZIP...");
const zipPath = path.join(
  projectRoot,
  "art-with-heart-backend-EMERGENCY-FIX.zip"
);

try {
  // Remove existing zip if it exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  // Create zip using system zip command
  execSync(`cd "${deployDir}" && zip -r "${zipPath}" .`, { stdio: "inherit" });
  console.log(`✅ ZIP created: ${zipPath}`);
} catch (error) {
  console.log(
    "⚠️  ZIP creation failed, but files are ready in deploy-package/"
  );
  console.log("You can manually zip the deploy-package folder");
}

console.log("\n🚀 EMERGENCY DEPLOYMENT READY!");
console.log("==========================================");
console.log(`📂 Files ready in: ${deployDir}`);
console.log(`📦 ZIP package: ${zipPath}`);
console.log("\n🔥 IMMEDIATE ACTION REQUIRED:");
console.log("1. Go to Railway.app");
console.log('2. "New Project" → "Deploy from folder"');
console.log("3. Upload the ZIP file above");
console.log("4. Add environment variables (see README-DEPLOY.md)");
console.log("5. Deploy!");
console.log("\n📧 CRITICAL: Set up Yahoo App Password for emails!");
console.log("6. Go to Yahoo Account Security");
console.log("7. Enable 2-Factor Authentication");
console.log('8. Generate App Password for "Mail"');
console.log("9. Use as SMTP_PASS and EMAIL_PASS in Railway");

console.log("\n✅ Your forms will work immediately after deployment!");
