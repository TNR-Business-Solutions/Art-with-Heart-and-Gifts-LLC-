# 🚀 FINAL RAILWAY DEPLOYMENT - Step by Step

## ✅ **COMPLETED:**
- GitHub repository created and code pushed
- Swipe Simple Merchant ID obtained: 461682001808706
- Railway opened and ready for deployment

## 🎯 **CURRENT STEP: Deploy to Railway**

### **Step 1: Railway Project Setup**
1. **In Railway (should be open):**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Search for "Art-with-Heart-and-Gifts-LLC-"
   - Click "Deploy"

### **Step 2: Configure Backend Detection**
Railway should auto-detect Node.js, but if not:
1. **Go to "Settings" tab**
2. **Set "Root Directory" to:** `backend`
3. **Save settings**

### **Step 3: Add Environment Variables**
1. **Go to "Variables" tab**
2. **Add these variables (one by one):**

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com
SWIPE_SIMPLE_MERCHANT_ID=461682001808706
SWIPE_SIMPLE_API_KEY=your_api_key_here
```

### **Step 4: Get Swipe Simple API Key**
1. **Log into Swipe Simple dashboard**
2. **Go to Settings > API Keys**
3. **Create a new API key**
4. **Copy the key**
5. **Add to Railway variables** (replace `your_api_key_here`)

### **Step 5: Deploy**
1. **Click "Deploy" or "Redeploy"**
2. **Wait 2-3 minutes**
3. **Get your backend URL** (e.g., https://backend-production-1234.up.railway.app)

## 🔧 **After Railway Deployment:**

### **Step 6: Test Your Backend**
Test these endpoints:
- **Health:** https://your-railway-url.up.railway.app/api/health
- **Products:** https://your-railway-url.up.railway.app/api/products

Should return:
- Health: `{"status":"OK"}`
- Products: 135 products

### **Step 7: Update Frontend**
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

### **Step 8: Configure Swipe Simple Webhook**
1. **Log into Swipe Simple dashboard**
2. **Go to Webhooks/Integrations**
3. **Set webhook URL:** https://your-railway-url.up.railway.app/api/webhooks/swipe-simple
4. **Test webhook**

## 📊 **SUCCESS INDICATORS:**
- ✅ Railway backend deployed and running
- ✅ Health endpoint returns `{"status":"OK"}`
- ✅ Products API returns 135 products
- ✅ Frontend updated with Railway backend URL
- ✅ Swipe Simple webhook configured
- ✅ Payment flow working end-to-end

## 🌐 **FINAL ARCHITECTURE:**
- **Frontend:** https://artwithheartandgifts.com (Netlify)
- **Backend:** https://your-railway-url.up.railway.app (Railway)
- **Payment:** Swipe Simple Payment Links
- **Repository:** https://github.com/TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-

## ⏱️ **TIMELINE:**
- Railway deployment: 5 minutes
- Frontend update: 2 minutes
- Swipe Simple setup: 3 minutes
- **Total to live site:** ~10 minutes

---

## 🎉 **READY TO DEPLOY!**

**Your Swipe Simple Merchant ID is configured: 461682001808706**
**Just follow the steps above in Railway and you'll be live!**
