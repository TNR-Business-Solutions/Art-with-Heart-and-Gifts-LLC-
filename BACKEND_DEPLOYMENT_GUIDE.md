# 🚀 Backend Deployment Guide - Art with Heart & Gifts

## ⚠️ **IMPORTANT: Netlify Limitation**

**Netlify is a static hosting platform** - it can only serve static files (HTML, CSS, JS, images). It **CANNOT** run Node.js backend servers.

## 🏗️ **Your Current Setup:**

- **Frontend:** Netlify (static files) ✅
- **Backend:** Needs separate server ❌

## 🎯 **Backend Deployment Options:**

### **Option 1: Railway (Recommended - Easiest)**

**Cost:** Free tier available, then ~$5/month
**Setup Time:** 5 minutes

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Create new project** → "Deploy from GitHub repo"
4. **Select your repo** → Choose `backend/` folder
5. **Deploy** - Railway auto-detects Node.js
6. **Get your backend URL** (e.g., `https://your-app.railway.app`)

### **Option 2: Render**

**Cost:** Free tier available, then ~$7/month
**Setup Time:** 10 minutes

1. **Go to:** https://render.com
2. **Sign up** → "New Web Service"
3. **Connect GitHub** → Select your repo
4. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment: `Node`
5. **Deploy**

### **Option 3: Heroku**

**Cost:** $7/month (no free tier)
**Setup Time:** 15 minutes

1. **Go to:** https://heroku.com
2. **Create new app**
3. **Connect GitHub repo**
4. **Configure buildpacks** for Node.js
5. **Deploy**

### **Option 4: Vercel (Serverless Functions)**

**Cost:** Free tier available
**Setup Time:** 20 minutes (requires code changes)

1. **Go to:** https://vercel.com
2. **Import project**
3. **Convert Express routes** to Vercel serverless functions
4. **Deploy**

## 🎯 **RECOMMENDED: Railway (Easiest)**

### **Step-by-Step Railway Deployment:**

1. **Prepare backend for deployment:**

   ```bash
   cd backend
   ```

2. **Create `.env` file in backend folder:**

   ```env
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://artwithheartandgifts.com
   BACKEND_URL=https://your-railway-app.railway.app
   SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id
   SWIPE_SIMPLE_API_KEY=your_api_key
   ```

3. **Go to Railway.app:**

   - Sign up with GitHub
   - "New Project" → "Deploy from GitHub repo"
   - Select your `artwithheartandgifts` repo
   - Railway will auto-detect the Node.js app in `/backend`

4. **Configure Environment Variables:**

   - In Railway dashboard → "Variables" tab
   - Add all the environment variables from your `.env` file

5. **Deploy:**
   - Railway automatically builds and deploys
   - Get your backend URL (e.g., `https://backend-production-1234.up.railway.app`)

## 🔧 **Update Frontend for New Backend URL:**

Once you have your backend URL, update the frontend:

1. **Update `src/js/swipe-simple-checkout.js`:**

   ```javascript
   constructor() {
     this.apiUrl = "https://your-railway-app.railway.app/api/orders";
     // ... rest of code
   }
   ```

2. **Update `backend/server.js` CORS settings:**

   ```javascript
   app.use(
     cors({
       origin: ["https://artwithheartandgifts.com", "http://localhost:5173"],
       credentials: true,
     })
   );
   ```

3. **Redeploy frontend to Netlify:**
   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

## 📋 **Complete Deployment Checklist:**

### **Frontend (Netlify):**

- [ ] Upload `dist/` folder to Netlify
- [ ] Update backend URL in frontend code
- [ ] Test frontend loads correctly

### **Backend (Railway/Other):**

- [ ] Deploy backend to Railway/Render/Heroku
- [ ] Set environment variables
- [ ] Test API endpoints work
- [ ] Configure Swipe Simple webhook URL

### **Payment Integration:**

- [ ] Set Swipe Simple webhook to: `https://your-backend-url.com/api/webhooks/swipe-simple`
- [ ] Test payment flow end-to-end
- [ ] Verify orders are processed

## 🌐 **Final URLs:**

- **Frontend:** https://artwithheartandgifts.com (Netlify)
- **Backend:** https://your-railway-app.railway.app (Railway)
- **API:** https://your-railway-app.railway.app/api

## 💡 **Quick Start with Railway:**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **"New Project"** → **"Deploy from GitHub repo"**
4. **Select your repo**
5. **Railway auto-detects Node.js** in `/backend` folder
6. **Add environment variables** in Railway dashboard
7. **Deploy!**

**That's it!** Railway will give you a URL like `https://backend-production-1234.up.railway.app`

## 🔄 **Update Process:**

After initial deployment:

1. **Backend changes:** Push to GitHub → Railway auto-deploys
2. **Frontend changes:** `npm run build` → Upload to Netlify

---

## 🎉 **Ready to Deploy?**

**Railway is the easiest option** - it's specifically designed for Node.js apps and has a generous free tier. Would you like me to help you set up Railway deployment?
