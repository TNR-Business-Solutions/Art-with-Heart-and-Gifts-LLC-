# 🚀 Railway GitHub Deployment - Step by Step

## 📋 **Your Repository Details:**
- **GitHub Repo:** TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-
- **Backend Location:** /backend folder
- **Target Platform:** Railway

## 🎯 **Step-by-Step Railway Deployment:**

### **Step 1: Railway GitHub Integration**
1. **Go to:** https://railway.app
2. **Click:** "Login" or "Get Started"
3. **Select:** "Continue with GitHub"
4. **Authorize Railway** to access your GitHub repositories

### **Step 2: Create New Project**
1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Search for:** "Art-with-Heart-and-Gifts-LLC-"
4. **Click:** "Deploy" on your repository

### **Step 3: Configure Backend Detection**
Railway should automatically detect your Node.js app, but if not:

1. **In Railway Dashboard:**
   - Click on your project
   - Go to "Settings" tab
   - Scroll to "Root Directory"
   - Set to: `backend`
   - Click "Save"

2. **Alternative - Manual Configuration:**
   - Go to "Deploy" tab
   - Click "Configure"
   - Set:
     - **Root Directory:** `backend`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

### **Step 4: Add Environment Variables**
1. **Go to:** "Variables" tab in Railway dashboard
2. **Add these variables:**
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://artwithheartandgifts.com
   SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
   SWIPE_SIMPLE_API_KEY=your_api_key_here
   ```

### **Step 5: Deploy**
1. **Click:** "Deploy" or "Redeploy"
2. **Wait:** 2-3 minutes for deployment
3. **Railway will show:** Your backend URL (e.g., https://backend-production-1234.up.railway.app)

## 🔧 **If Railway Still Doesn't Detect Backend:**

### **Option A: Create Railway Config File**
Add this file to your GitHub repo root: `railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100
  }
}
```

### **Option B: Move Backend Files to Root**
1. **Create new branch:** `railway-deploy`
2. **Move backend files** to repository root
3. **Deploy from that branch**

## 🌐 **After Deployment:**

### **Test Your Backend:**
1. **Health Check:** https://your-railway-url.up.railway.app/api/health
2. **Products API:** https://your-railway-url.up.railway.app/api/products
3. **Should return:** JSON data with your 135 products

### **Update Frontend:**
1. **Update `src/js/swipe-simple-checkout.js`:**
   ```javascript
   constructor() {
     this.apiUrl = "https://your-railway-url.up.railway.app/api/orders";
   }
   ```

2. **Rebuild frontend:**
   ```bash
   npm run build
   ```

3. **Upload to Netlify**

### **Configure Swipe Simple:**
1. **Log into Swipe Simple dashboard**
2. **Set webhook URL:** https://your-railway-url.up.railway.app/api/webhooks/swipe-simple

## 📋 **Deployment Checklist:**

### **Railway Setup:**
- [ ] Connected GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Added environment variables
- [ ] Deployed successfully
- [ ] Backend URL working

### **Frontend Update:**
- [ ] Updated API URL in frontend code
- [ ] Rebuilt frontend with `npm run build`
- [ ] Uploaded to Netlify

### **Payment Integration:**
- [ ] Configured Swipe Simple webhook
- [ ] Tested payment flow
- [ ] Verified orders processing

## 🚨 **Troubleshooting:**

### **If Railway Can't Find Backend:**
1. **Check Root Directory** is set to `backend`
2. **Verify `backend/package.json`** exists
3. **Try manual configuration** with build/start commands

### **If Build Fails:**
1. **Check `backend/package.json`** has correct scripts
2. **Verify all dependencies** are listed
3. **Check Railway build logs** for errors

### **If API Doesn't Work:**
1. **Test health endpoint** first
2. **Check environment variables** are set
3. **Verify CORS settings** allow your frontend domain

## 🎉 **Success Indicators:**
- ✅ Railway shows "Deployed" status
- ✅ Health endpoint returns `{"status":"OK"}`
- ✅ Products API returns 135 products
- ✅ Frontend can connect to backend
- ✅ Payment flow works end-to-end

---

## 🚀 **Ready to Deploy?**

**Go to Railway.app, connect your GitHub repo, and follow the steps above!**
**Your backend will be live in minutes!**
