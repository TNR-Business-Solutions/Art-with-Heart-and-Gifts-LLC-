import fs from "fs/promises";

async function findRailwayUrlByDeployment() {
  console.log("🔍 FINDING RAILWAY URL BY DEPLOYMENT ID");
  console.log("=".repeat(60));

  const deploymentId = "8cb7cfb9-ffb8-4145-8b42-24e5dec46124";

  console.log(`\n📋 Deployment ID: ${deploymentId}`);
  console.log("✅ This confirms your backend is deployed!");

  const guide = `# 🔍 Find Railway URL by Deployment ID

## 📋 **Your Deployment ID:**
\`8cb7cfb9-ffb8-4145-8b42-24e5dec46124\`

## 🎯 **How to Find the URL in Railway:**

### **Method 1: Deployments Tab (Recommended)**
1. **In Railway dashboard, click "Deployments"** in left sidebar
2. **Look for deployment ID:** \`8cb7cfb9-ffb8-4145-8b42-24e5dec46124\`
3. **Click on that deployment**
4. **Look for the URL** (usually displayed at the top or in details)
5. **Should look like:** \`https://your-app.up.railway.app\`

### **Method 2: Main Dashboard**
1. **Click your project name** at the top
2. **Look for a prominent URL** on the main page
3. **Copy the Railway-generated URL**

### **Method 3: Domains Tab**
1. **Click "Domains"** in left sidebar
2. **Look for Railway-generated domains**
3. **Copy the URL**

## 🧪 **Once You Find the URL:**

Test it immediately:
\`\`\`bash
curl https://your-url.up.railway.app/api/health
\`\`\`

Should return: \`{"status":"OK"}\`

## 🔧 **Common Railway URL Patterns:**

- \`https://your-project-name.up.railway.app\`
- \`https://backend-production-xxxx.up.railway.app\`
- \`https://art-with-heart-and-gifts-llc-production.up.railway.app\`

## 🚨 **If You Still Can't Find It:**

1. **Check if deployment is still building**
2. **Look for any error messages in Railway**
3. **Verify environment variables are set**
4. **Check Railway logs for errors**

---

## 🎯 **CURRENT ACTION:**
**Go to Railway → Deployments → Click on deployment \`8cb7cfb9-ffb8-4145-8b42-24e5dec46124\`**
**Look for the URL and share it with me!**
`;

  await fs.writeFile("FIND_RAILWAY_URL_BY_DEPLOYMENT.md", guide);
  console.log("✅ Created FIND_RAILWAY_URL_BY_DEPLOYMENT.md");

  console.log("\n🔍 FINDING RAILWAY URL BY DEPLOYMENT ID");
  console.log(
    "\n✅ Deployment ID confirmed: 8cb7cfb9-ffb8-4145-8b42-24e5dec46124"
  );
  console.log("\n🎯 TO FIND THE URL:");
  console.log("1. Go to Railway → Deployments tab");
  console.log("2. Click on deployment: 8cb7cfb9-ffb8-4145-8b42-24e5dec46124");
  console.log("3. Look for the URL in the deployment details");
  console.log("4. OR check the main dashboard for a prominent URL");
  console.log("5. OR check Domains tab");

  console.log("\n📋 Expected URL format:");
  console.log("- https://your-project-name.up.railway.app");
  console.log("- https://backend-production-xxxx.up.railway.app");

  console.log("\n🧪 Test the URL:");
  console.log("https://your-url.up.railway.app/api/health");
  console.log('Should return: {"status":"OK"}');

  console.log("\n🚀 Once you have the URL, I'll:");
  console.log("1. Test all backend endpoints");
  console.log("2. Update frontend with Railway URL");
  console.log("3. Configure Swipe Simple webhook");
  console.log("4. Test complete payment flow");
}

findRailwayUrlByDeployment().catch(console.error);
