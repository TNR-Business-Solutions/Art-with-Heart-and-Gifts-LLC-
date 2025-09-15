import fs from "fs/promises";
import path from "path";

async function fixRailwayDeployment() {
  console.log("🔧 Fixing Railway Deployment Issues");
  console.log("=".repeat(50));

  try {
    // Create a Railway-compatible structure
    const railwayDir = "railway-deploy";
    await fs.mkdir(railwayDir, { recursive: true });

    // Copy backend files to root level for Railway
    const backendFiles = [
      "server.js",
      "package.json",
      "payment-config.js",
      "payment-processor.js",
      "swipe-simple-live-integration.js",
    ];

    console.log("📋 Creating Railway-compatible deployment...");

    for (const file of backendFiles) {
      const sourcePath = path.join("backend", file);
      const destPath = path.join(railwayDir, file);

      try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
      } catch (error) {
        console.log(`⚠️  Could not copy ${file}: ${error.message}`);
      }
    }

    // Copy data folder
    const dataSource = path.join("backend", "data", "inventory.json");
    const dataDest = path.join(railwayDir, "data", "inventory.json");
    await fs.mkdir(path.join(railwayDir, "data"), { recursive: true });

    try {
      await fs.copyFile(dataSource, dataDest);
      console.log("✅ Copied: data/inventory.json");
    } catch (error) {
      console.log(`⚠️  Could not copy data: ${error.message}`);
    }

    // Create railway.json config
    const railwayConfig = {
      $schema: "https://railway.app/railway.schema.json",
      build: {
        builder: "NIXPACKS",
        buildCommand: "npm install",
      },
      deploy: {
        startCommand: "npm start",
        healthcheckPath: "/api/health",
        healthcheckTimeout: 100,
        restartPolicyType: "ON_FAILURE",
        restartPolicyMaxRetries: 10,
      },
    };

    await fs.writeFile(
      path.join(railwayDir, "railway.json"),
      JSON.stringify(railwayConfig, null, 2)
    );
    console.log("✅ Created railway.json config");

    // Create .env template
    const envTemplate = `NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here
`;

    await fs.writeFile(path.join(railwayDir, ".env.example"), envTemplate);
    console.log("✅ Created .env.example");

    // Create deployment instructions
    const instructions = `# Railway Deployment - Fixed Version

## 🚀 Method 1: Upload Railway-Deploy Folder

### Option A: Direct Upload
1. **Zip the railway-deploy/ folder**
2. **Go to Railway.app**
3. **"New Project" → "Deploy from folder"**
4. **Upload the zip file**
5. **Add environment variables**
6. **Deploy!**

### Option B: GitHub Integration
1. **Push railway-deploy/ contents to a new branch:**
   \`\`\`bash
   git checkout -b railway-deploy
   cp railway-deploy/* .
   git add .
   git commit -m "Railway deployment ready"
   git push origin railway-deploy
   \`\`\`

2. **In Railway:**
   - "New Project" → "Deploy from GitHub repo"
   - Select your repo and the \`railway-deploy\` branch
   - Deploy!

## 🚀 Method 2: Fix Current Railway Project

If you already have a Railway project:

1. **Go to your Railway project dashboard**
2. **Click "Settings" tab**
3. **Scroll to "Root Directory"**
4. **Set Root Directory to:** \`backend\`
5. **Save settings**
6. **Redeploy**

## 🚀 Method 3: Alternative Platforms

### Render.com (Easy Alternative)
1. **Go to:** https://render.com
2. **"New Web Service"**
3. **Connect GitHub repo**
4. **Configure:**
   - Build Command: \`cd backend && npm install\`
   - Start Command: \`cd backend && npm start\`
   - Root Directory: \`backend\`
5. **Add environment variables**
6. **Deploy!**

### Heroku
1. **Go to:** https://heroku.com
2. **Create new app**
3. **Connect GitHub repo**
4. **Set config vars:**
   - NODE_ENV=production
   - PORT=3001 (or let Heroku set it)
   - FRONTEND_URL=https://artwithheartandgifts.com
   - SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id
   - SWIPE_SIMPLE_API_KEY=your_api_key
5. **Deploy!**

## 🔧 Environment Variables Needed:
\`\`\`
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here
\`\`\`

## 📁 Files Ready for Deployment:
${backendFiles.map((f) => `- ${f}`).join("\n")}
- data/inventory.json
- railway.json (Railway config)
- .env.example (environment template)

## 🌐 After Deployment:
1. Get your backend URL
2. Test: https://your-backend-url/api/health
3. Update frontend with new backend URL
4. Configure Swipe Simple webhook
`;

    await fs.writeFile(
      path.join(railwayDir, "DEPLOYMENT_INSTRUCTIONS.md"),
      instructions
    );

    console.log(`\n✅ Railway deployment package ready in: ${railwayDir}/`);
    console.log("\n📋 Solutions for Railway repo detection:");
    console.log("1. Upload railway-deploy/ folder directly to Railway");
    console.log("2. Set Root Directory to 'backend' in Railway settings");
    console.log("3. Use alternative platform (Render.com recommended)");

    console.log("\n🚀 Recommended next steps:");
    console.log("1. Try setting Root Directory to 'backend' in Railway");
    console.log("2. If that fails, try Render.com (easier setup)");
    console.log("3. Or upload railway-deploy/ folder directly");
  } catch (error) {
    console.error("❌ Error preparing Railway deployment:", error);
  }
}

fixRailwayDeployment().catch(console.error);
