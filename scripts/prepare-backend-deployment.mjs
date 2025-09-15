import fs from "fs/promises";
import path from "path";

async function prepareBackendDeployment() {
  console.log("🚀 Preparing Backend for Deployment");
  console.log("=".repeat(50));

  try {
    // Create deployment-ready backend folder
    const deployDir = "backend-deploy";
    await fs.mkdir(deployDir, { recursive: true });

    // Files to copy for deployment
    const filesToCopy = [
      "server.js",
      "package.json",
      "payment-config.js",
      "payment-processor.js",
      "swipe-simple-live-integration.js",
      "data/inventory.json",
    ];

    console.log("📋 Copying backend files for deployment...");

    for (const file of filesToCopy) {
      const sourcePath = path.join("backend", file);
      const destPath = path.join(deployDir, file);

      // Create directory structure if needed
      const destDir = path.dirname(destPath);
      await fs.mkdir(destDir, { recursive: true });

      try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
      } catch (error) {
        console.log(`⚠️  Could not copy ${file}: ${error.message}`);
      }
    }

    // Create .env template
    const envTemplate = `# Backend Environment Variables
# Copy this to your deployment platform (Railway, Render, Heroku, etc.)

NODE_ENV=production
PORT=3001

# Frontend URL (Netlify)
FRONTEND_URL=https://artwithheartandgifts.com

# Backend URL (will be provided by your hosting platform)
# BACKEND_URL=https://your-app.railway.app

# Swipe Simple Configuration
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here

# CORS Origins (comma-separated)
CORS_ORIGINS=https://artwithheartandgifts.com,http://localhost:5173
`;

    await fs.writeFile(path.join(deployDir, ".env.example"), envTemplate);
    console.log("✅ Created .env.example template");

    // Create deployment instructions
    const instructions = `# Backend Deployment Instructions

## 🚀 Quick Deploy Options:

### Option 1: Railway (Recommended - Easiest)
1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Railway will auto-detect Node.js in /backend
6. Add environment variables from .env.example
7. Deploy!

### Option 2: Render
1. Go to https://render.com
2. "New Web Service"
3. Connect GitHub repo
4. Configure:
   - Build Command: \`cd backend && npm install\`
   - Start Command: \`cd backend && npm start\`
5. Add environment variables
6. Deploy

### Option 3: Heroku
1. Go to https://heroku.com
2. Create new app
3. Connect GitHub repo
4. Add environment variables
5. Deploy

## 📋 Files Ready for Deployment:
${filesToCopy.map((f) => `- ${f}`).join("\n")}

## 🔧 Environment Variables Needed:
- NODE_ENV=production
- PORT=3001 (or platform default)
- FRONTEND_URL=https://artwithheartandgifts.com
- SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id
- SWIPE_SIMPLE_API_KEY=your_api_key

## 🌐 After Deployment:
1. Get your backend URL (e.g., https://your-app.railway.app)
2. Update frontend API calls to use new backend URL
3. Configure Swipe Simple webhook to: https://your-backend-url/api/webhooks/swipe-simple
4. Test payment flow

## 📁 Upload Instructions:
- Upload entire backend-deploy/ folder to your hosting platform
- OR push to GitHub and connect to hosting platform
- Make sure package.json is in the root of your deployment
`;

    await fs.writeFile(
      path.join(deployDir, "DEPLOYMENT_INSTRUCTIONS.md"),
      instructions
    );

    // Create Procfile for Heroku
    const procfile = "web: npm start";
    await fs.writeFile(path.join(deployDir, "Procfile"), procfile);
    console.log("✅ Created Procfile for Heroku");

    // Create .gitignore for deployment
    const gitignore = `node_modules/
.env
*.log
.DS_Store
`;
    await fs.writeFile(path.join(deployDir, ".gitignore"), gitignore);
    console.log("✅ Created .gitignore");

    console.log(`\n✅ Backend deployment package ready in: ${deployDir}/`);
    console.log("\n📋 Next steps:");
    console.log("1. Choose hosting platform (Railway recommended)");
    console.log("2. Upload backend-deploy/ folder or push to GitHub");
    console.log("3. Configure environment variables");
    console.log("4. Deploy and get backend URL");
    console.log("5. Update frontend with new backend URL");
    console.log("6. Configure Swipe Simple webhook");

    console.log("\n🚀 Recommended: Railway.app (easiest deployment)");
  } catch (error) {
    console.error("❌ Error preparing backend deployment:", error);
  }
}

prepareBackendDeployment().catch(console.error);
