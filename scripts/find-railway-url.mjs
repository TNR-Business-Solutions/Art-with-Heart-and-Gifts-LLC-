import fs from "fs/promises";

async function findRailwayUrl() {
  console.log("🚀 FINDING RAILWAY BACKEND URL - Integration Guide");
  console.log("=".repeat(60));

  const guide = `# 🚀 Railway Backend URL Integration Guide

## 🎯 **STEP 1: Find Your Railway Backend URL**

### **In Railway Dashboard:**
1. **Go to:** https://railway.app
2. **Click on your project** (Art-with-Heart-and-Gifts-LLC-)
3. **Look for one of these:**

**Option A: Deployment Tab**
- Go to "Deployments" tab
- Click on the latest deployment
- Copy the URL (e.g., https://backend-production-1234.up.railway.app)

**Option B: Settings Tab**
- Go to "Settings" tab
- Look for "Domains" section
- Copy the generated domain

**Option C: Main Dashboard**
- The URL should be visible on the main project page
- Usually shows as: https://your-project-name.up.railway.app

## 🧪 **STEP 2: Test Your Backend**

Once you have the URL, test these endpoints:

### **Health Check:**
\`\`\`bash
curl https://your-railway-url.up.railway.app/api/health
\`\`\`
**Expected response:** \`{"status":"OK"}\`

### **Products API:**
\`\`\`bash
curl https://your-railway-url.up.railway.app/api/products
\`\`\`
**Expected response:** JSON with 135 products

## 🔧 **STEP 3: Update Frontend Code**

### **Update Swipe Simple Checkout:**
Edit \`src/js/swipe-simple-checkout.js\`:

\`\`\`javascript
class SwipeSimpleCheckout {
  constructor() {
    // Replace this line with your Railway URL:
    this.apiUrl = "https://your-railway-url.up.railway.app/api/orders";
    this.isProcessing = false;
  }
  // ... rest of code stays the same
}
\`\`\`

### **Update Backend CORS (if needed):**
Edit \`backend/server.js\`:

\`\`\`javascript
app.use(cors({
  origin: [
    'https://artwithheartandgifts.com',
    'http://localhost:5173'
  ],
  credentials: true
}));
\`\`\`

## 🚀 **STEP 4: Deploy Updated Frontend**

1. **Rebuild frontend:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Upload to Netlify:**
   - Upload the new \`dist/\` folder to Netlify

## 💳 **STEP 5: Configure Swipe Simple Webhook**

1. **Log into Swipe Simple dashboard**
2. **Go to Webhooks/Integrations**
3. **Set webhook URL:** https://your-railway-url.up.railway.app/api/webhooks/swipe-simple
4. **Test webhook**

## 🧪 **STEP 6: Test Complete Payment Flow**

1. **Go to your live site:** https://artwithheartandgifts.com
2. **Add item to cart**
3. **Go to checkout**
4. **Test payment flow**
5. **Verify order processing**

## 📊 **Expected Results:**

### **Backend Health:**
\`\`\`json
{
  "status": "OK",
  "timestamp": "2025-09-15T..."
}
\`\`\`

### **Products API:**
\`\`\`json
[
  {
    "id": "original-1",
    "title": "Angels set of 3",
    "price": 50.00,
    "image": "https://artwithheartandgifts.com/images/1. Angels set of 3 9in x12in 50.00.jpg"
  },
  // ... 134 more products
]
\`\`\`

## 🚨 **Troubleshooting:**

### **If Backend URL Not Working:**
1. **Check Railway deployment status**
2. **Verify environment variables are set**
3. **Check Railway logs for errors**
4. **Ensure PORT=3001 is set**

### **If Frontend Can't Connect:**
1. **Check CORS settings in backend**
2. **Verify Railway URL is correct**
3. **Test backend endpoints directly**
4. **Check browser console for errors**

---

## 🎯 **CURRENT TASK:**
**Find your Railway backend URL and share it with me!**
**I'll help you integrate it and test the complete system.**
`;

  await fs.writeFile("RAILWAY_URL_INTEGRATION.md", guide);
  console.log("✅ Created RAILWAY_URL_INTEGRATION.md");

  console.log("\n🚀 RAILWAY BACKEND URL INTEGRATION GUIDE");
  console.log("\n🎯 STEP 1: Find Your Railway URL");
  console.log("1. Go to: https://railway.app");
  console.log("2. Click on your project");
  console.log("3. Look for URL in one of these places:");
  console.log("   - Deployments tab");
  console.log("   - Settings > Domains");
  console.log("   - Main dashboard");
  console.log("4. Copy the URL (e.g., https://your-app.up.railway.app)");

  console.log("\n🧪 STEP 2: Test Your Backend");
  console.log("Test these endpoints:");
  console.log("- Health: https://your-url.up.railway.app/api/health");
  console.log("- Products: https://your-url.up.railway.app/api/products");

  console.log("\n🔧 STEP 3: Update Frontend");
  console.log("I'll help you update the frontend code with your Railway URL");

  console.log("\n💳 STEP 4: Configure Swipe Simple");
  console.log(
    "Set webhook to: https://your-url.up.railway.app/api/webhooks/swipe-simple"
  );

  console.log("\n🎯 NEXT ACTION:");
  console.log("Share your Railway backend URL and I'll help you integrate it!");
}

findRailwayUrl().catch(console.error);
