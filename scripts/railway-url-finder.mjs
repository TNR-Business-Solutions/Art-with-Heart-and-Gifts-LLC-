import fs from "fs/promises";

async function railwayUrlFinder() {
  console.log("🔍 RAILWAY URL FINDER - Step by Step");
  console.log("=".repeat(50));

  const guide = `# 🔍 Finding Your Railway Backend URL

## 📍 **You're Currently In: Project Settings**

I can see you're in the **Project Settings** page. To find your backend URL:

## 🎯 **STEP 1: Go to Deployments Tab**

1. **Look at the left sidebar** in Railway
2. **Click on "Deployments"** (not Settings)
3. **Click on the latest deployment** (should show "Deployed" status)
4. **Look for the URL** in the deployment details

## 🎯 **ALTERNATIVE: Go to Main Dashboard**

1. **Click on your project name** at the top: "Art with heart and gifts llc"
2. **This should take you to the main project dashboard**
3. **Look for a URL** displayed prominently on the page
4. **Should be something like:** https://your-app.up.railway.app

## 🎯 **ALTERNATIVE: Check Domains Tab**

1. **In the left sidebar, click "Domains"**
2. **Look for generated domains**
3. **Copy the Railway-generated URL**

## 📋 **What to Look For:**

Your Railway URL will look like one of these:
- \`https://backend-production-1234.up.railway.app\`
- \`https://art-with-heart-and-gifts-llc-production.up.railway.app\`
- \`https://your-project-name.up.railway.app\`

## 🧪 **Once You Have the URL:**

Test it by visiting:
- \`https://your-url.up.railway.app/api/health\`
- Should return: \`{"status":"OK"}\`

## 🚨 **If You Can't Find the URL:**

1. **Check the Railway logs** for any deployment errors
2. **Verify the deployment completed successfully**
3. **Make sure environment variables are set**

---

## 🎯 **CURRENT ACTION:**
**Navigate to Deployments tab or main dashboard to find your backend URL!**
`;

  await fs.writeFile("RAILWAY_URL_FINDER.md", guide);
  console.log("✅ Created RAILWAY_URL_FINDER.md");

  console.log("\n🔍 RAILWAY URL FINDER");
  console.log("\n📍 You're currently in: Project Settings");
  console.log("\n🎯 TO FIND YOUR URL:");
  console.log("1. Click 'Deployments' in the left sidebar");
  console.log("2. OR click your project name at the top");
  console.log("3. OR click 'Domains' in the left sidebar");
  console.log("\n📋 Look for URL like:");
  console.log("https://your-app.up.railway.app");
  console.log("\n🧪 Test the URL by visiting:");
  console.log("https://your-url.up.railway.app/api/health");
}

railwayUrlFinder().catch(console.error);
