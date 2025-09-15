# 🚀 DEPLOYMENT CHECKLIST - Art with Heart & Gifts

## ✅ **COMPLETED STEPS:**
- [x] Local git repository initialized
- [x] All project files committed
- [x] README.md created
- [x] .gitignore configured
- [x] railway.json deployment config created
- [x] Backend files ready in /backend folder

## 🔄 **CURRENT STEP: Create GitHub Repository**

### **Step 1: Create Repository on GitHub**
1. **GitHub is open** in your browser (TNR-Business-Solutions)
2. **Click:** "New repository"
3. **Repository name:** `Art-with-Heart-and-Gifts-LLC-`
4. **Description:** "Beautiful handmade artwork by Charmin - original paintings and prints"
5. **Visibility:** Public (recommended) or Private
6. **DON'T check** "Add a README file" (we already have one)
7. **DON'T check** "Add .gitignore" (we already have one)
8. **Click:** "Create repository"

### **Step 2: Connect Local Repository to GitHub**
After creating the repository, run these commands in your terminal:

```bash
git remote add origin https://github.com/TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-.git
git branch -M main
git push -u origin main
```

## 🚀 **NEXT STEP: Railway Deployment**

### **Step 3: Deploy to Railway**
1. **Go to:** https://railway.app
2. **Sign up with GitHub** (use same GitHub account)
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Search for:** "Art-with-Heart-and-Gifts-LLC-"
6. **Click:** "Deploy" on your repository

### **Step 4: Configure Railway Settings**
1. **Railway should auto-detect** Node.js app in /backend
2. **If not detected:**
   - Go to "Settings" tab
   - Set "Root Directory" to `backend`
   - Save settings
3. **Go to "Variables" tab** and add:
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://artwithheartandgifts.com
   SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
   SWIPE_SIMPLE_API_KEY=your_api_key_here
   ```

### **Step 5: Deploy and Test**
1. **Click:** "Deploy" or "Redeploy"
2. **Wait:** 2-3 minutes for deployment
3. **Get your backend URL** (e.g., https://backend-production-1234.up.railway.app)
4. **Test endpoints:**
   - Health: https://your-url.up.railway.app/api/health
   - Products: https://your-url.up.railway.app/api/products

## 🔧 **FINAL STEPS: Update Frontend**

### **Step 6: Update Frontend Code**
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

3. **Upload to Netlify:**
   - Upload the new `dist/` folder to Netlify

### **Step 7: Configure Swipe Simple**
1. **Log into Swipe Simple dashboard**
2. **Set webhook URL:** https://your-railway-url.up.railway.app/api/webhooks/swipe-simple
3. **Test payment flow**

## 📊 **SUCCESS INDICATORS:**
- ✅ GitHub repository created and code pushed
- ✅ Railway backend deployed and running
- ✅ Health endpoint returns `{"status":"OK"}`
- ✅ Products API returns 135 products
- ✅ Frontend updated with new backend URL
- ✅ Swipe Simple webhook configured
- ✅ Complete payment flow working

## 🌐 **FINAL ARCHITECTURE:**
- **Frontend:** https://artwithheartandgifts.com (Netlify)
- **Backend:** https://your-railway-url.up.railway.app (Railway)
- **Payment:** Swipe Simple Payment Links
- **Repository:** https://github.com/TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-

## ⏱️ **ESTIMATED TIMELINE:**
- GitHub setup: 2 minutes
- Railway deployment: 5 minutes
- Frontend update: 2 minutes
- **Total:** ~10 minutes to live site

---

## 🎯 **CURRENT STATUS:**
**Ready to create GitHub repository!**
**GitHub is open in your browser - just create the repository and run the git commands.**
