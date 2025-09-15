# 🚀 Railway Deployment - Step by Step Guide

## 🎯 **What You'll Get:**
- **Backend URL:** https://your-app.railway.app
- **API Endpoints:** https://your-app.railway.app/api/products
- **Payment Webhook:** https://your-app.railway.app/api/webhooks/swipe-simple

## 📋 **Step-by-Step Railway Setup:**

### **Step 1: Go to Railway**
1. **Open:** https://railway.app
2. **Click:** "Login" or "Get Started"
3. **Sign up with GitHub** (recommended - easiest integration)

### **Step 2: Create New Project**
1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** Your `artwithheartandgifts` repository
4. **Railway will scan your repo** and detect the Node.js app

### **Step 3: Configure Deployment**
1. **Railway should auto-detect:** `/backend` folder as Node.js app
2. **If not auto-detected:**
   - Click "Configure"
   - Set Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

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
1. **Click:** "Deploy"
2. **Wait:** 2-3 minutes for deployment
3. **Get your URL:** Railway will show your backend URL

### **Step 6: Test Your Backend**
1. **Test Health:** https://your-app.railway.app/api/health
2. **Test Products:** https://your-app.railway.app/api/products
3. **Should return:** JSON data with your products

## 🔧 **Update Frontend After Deployment:**

Once you have your Railway backend URL, update these files:

### **1. Update `src/js/swipe-simple-checkout.js`:**
```javascript
constructor() {
  this.apiUrl = "https://your-railway-app.railway.app/api/orders";
  // ... rest stays the same
}
```

### **2. Rebuild Frontend:**
```bash
npm run build
```

### **3. Upload to Netlify:**
- Upload the new `dist/` folder to Netlify

## 🌐 **Final Architecture:**
- **Frontend:** Netlify (https://artwithheartandgifts.com)
- **Backend:** Railway (https://your-railway-app.railway.app)
- **Payment:** Swipe Simple Payment Links

## 💳 **Configure Swipe Simple:**
1. **Log into Swipe Simple dashboard**
2. **Go to Webhooks/Integrations**
3. **Set Webhook URL:** https://your-railway-app.railway.app/api/webhooks/swipe-simple
4. **Test webhook** to ensure it's working

## 🔄 **Future Updates:**
- **Backend changes:** Push to GitHub → Railway auto-deploys
- **Frontend changes:** `npm run build` → Upload to Netlify

## 📞 **Need Help?**
- **Railway Docs:** https://docs.railway.app
- **Support:** Available in Railway dashboard

---

## 🎉 **You're Ready to Deploy!**

**Go to https://railway.app and follow the steps above.**
**Your backend will be live in under 5 minutes!**
