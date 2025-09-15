import fs from "fs/promises";

async function setupRailwayEnvironment() {
  console.log("🔧 Setting up Railway Environment Variables");
  console.log("=".repeat(50));

  const merchantId = "461682001808706";

  const environmentVariables = `# Railway Environment Variables for Art with Heart & Gifts

## 🎯 **Copy these to Railway Variables tab:**

NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com
SWIPE_SIMPLE_MERCHANT_ID=461682001808706
SWIPE_SIMPLE_API_KEY=your_api_key_here

## 📋 **Instructions:**

1. **In Railway Dashboard:**
   - Go to your project
   - Click "Variables" tab
   - Add each variable above (one by one)

2. **Variable Details:**
   - NODE_ENV: production
   - PORT: 3001
   - FRONTEND_URL: https://artwithheartandgifts.com
   - SWIPE_SIMPLE_MERCHANT_ID: 461682001808706
   - SWIPE_SIMPLE_API_KEY: (you'll get this from Swipe Simple)

## 🔑 **Swipe Simple API Key:**

To get your Swipe Simple API Key:
1. Log into Swipe Simple dashboard
2. Go to Settings > API Keys
3. Create a new API key
4. Copy the key and add it to Railway variables

## 🌐 **After Railway Deployment:**

Your backend URL will be something like:
https://backend-production-1234.up.railway.app

## 💳 **Swipe Simple Webhook Setup:**

Set webhook URL in Swipe Simple to:
https://your-railway-url.up.railway.app/api/webhooks/swipe-simple

## 📊 **Testing Your Backend:**

After deployment, test these endpoints:
- Health: https://your-railway-url.up.railway.app/api/health
- Products: https://your-railway-url.up.railway.app/api/products
- Should return 135 products

---

## 🚀 **Ready for Railway Deployment!**
`;

  await fs.writeFile("RAILWAY_ENVIRONMENT_VARIABLES.md", environmentVariables);
  console.log("✅ Created RAILWAY_ENVIRONMENT_VARIABLES.md");

  console.log("\n🔧 RAILWAY ENVIRONMENT VARIABLES READY!");
  console.log("\n📋 Copy these to Railway Variables tab:");
  console.log(`NODE_ENV=production`);
  console.log(`PORT=3001`);
  console.log(`FRONTEND_URL=https://artwithheartandgifts.com`);
  console.log(`SWIPE_SIMPLE_MERCHANT_ID=461682001808706`);
  console.log(`SWIPE_SIMPLE_API_KEY=your_api_key_here`);

  console.log("\n🔑 To get Swipe Simple API Key:");
  console.log("1. Log into Swipe Simple dashboard");
  console.log("2. Go to Settings > API Keys");
  console.log("3. Create new API key");
  console.log("4. Copy key to Railway variables");

  console.log("\n🌐 After Railway deployment:");
  console.log("Your backend URL will be: https://your-app.railway.app");
  console.log(
    "Set Swipe Simple webhook to: https://your-app.railway.app/api/webhooks/swipe-simple"
  );
}

setupRailwayEnvironment().catch(console.error);
