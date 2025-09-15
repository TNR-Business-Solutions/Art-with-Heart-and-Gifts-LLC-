# 🚨 CRITICAL FIXES DEPLOYED - Railway Deployment Guide

## ✅ ISSUES FIXED:
1. **Email Service Added** - Commission and contact forms now working
2. **Payment Processor Fixed** - Secure checkout notifications working
3. **All Dependencies Updated** - Added nodemailer for email functionality

## 🚀 IMMEDIATE DEPLOYMENT NEEDED:

### Option A: Direct Upload to Railway
1. **Zip the railway-deploy/ folder**
2. **Go to Railway.app**
3. **"New Project" → "Deploy from folder"**
4. **Upload the zip file**
5. **Add environment variables (CRITICAL)**
6. **Deploy!**

### Option B: GitHub Integration
1. **Push railway-deploy/ contents to a new branch:**
   ```bash
   git checkout -b railway-deploy
   cp railway-deploy/* .
   git add .
   git commit -m "Railway deployment ready"
   git push origin railway-deploy
   ```

2. **In Railway:**
   - "New Project" → "Deploy from GitHub repo"
   - Select your repo and the `railway-deploy` branch
   - Deploy!

## 🚀 Method 2: Fix Current Railway Project

If you already have a Railway project:

1. **Go to your Railway project dashboard**
2. **Click "Settings" tab**
3. **Scroll to "Root Directory"**
4. **Set Root Directory to:** `backend`
5. **Save settings**
6. **Redeploy**

## 🚀 Method 3: Alternative Platforms

### Render.com (Easy Alternative)
1. **Go to:** https://render.com
2. **"New Web Service"**
3. **Connect GitHub repo**
4. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Root Directory: `backend`
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

## 🔧 CRITICAL Environment Variables Required:
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here

# EMAIL CONFIGURATION (REQUIRED FOR FORMS)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=artwithheartandgifts@yahoo.com
SMTP_PASS=your_yahoo_app_password_here
EMAIL_USER=artwithheartandgifts@yahoo.com
EMAIL_PASS=your_yahoo_app_password_here
```

## 📧 Yahoo Email Setup (CRITICAL):
1. **Go to Yahoo Account Security**
2. **Enable 2-Factor Authentication**
3. **Generate App Password** for "Mail"
4. **Use App Password as SMTP_PASS and EMAIL_PASS**

## 📁 Files Ready for Deployment:
- server.js ✅ (Updated with email endpoints)
- email-service.js ✅ (NEW - Email functionality)
- package.json ✅ (Updated with nodemailer)
- payment-config.js ✅
- payment-processor.js ✅
- swipe-simple-live-integration.js ✅
- data/inventory.json ✅
- railway.json (Railway config) ✅
- .env.example (environment template) ✅

## 🌐 After Deployment:
1. **Get your backend URL**
2. **Test health**: https://your-backend-url/api/health
3. **Test email**: https://your-backend-url/api/email/test
4. **Test contact form**: POST to /api/contact
5. **Test commission form**: POST to /api/commission
6. **Frontend already configured** to use Railway URL
7. **Configure Swipe Simple webhook**

## 🚨 URGENT ALTERNATIVE - If Railway Still Not Working:

### Deploy to Render.com (5 minutes setup):
1. **Go to:** https://render.com
2. **"New Web Service"**
3. **Connect GitHub repo**
4. **Set Root Directory:** `railway-deploy`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Add all environment variables above**
8. **Deploy!**

### Deploy to Vercel (Alternative):
1. **Go to:** https://vercel.com
2. **Import from GitHub**
3. **Set Root Directory:** `railway-deploy`
4. **Add environment variables**
5. **Deploy as Node.js function**
