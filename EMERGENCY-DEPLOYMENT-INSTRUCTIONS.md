# 🚨 EMERGENCY DEPLOYMENT INSTRUCTIONS

## ⚡ IMMEDIATE ACTION REQUIRED

**Problem:** Netlify ran out of credits, blocking frontend deployment  
**Solution:** Deploy frontend to Railway alongside backend

---

## 🚀 DEPLOY FRONTEND TO RAILWAY (5 minutes)

### **Step 1: Go to Railway Dashboard**

1. **Visit:** https://railway.app/dashboard
2. **Open your existing project:** Art-with-Heart-and-Gifts-LLC

### **Step 2: Create New Frontend Service**

1. **Click:** "New Service"
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC
4. **Name:** "frontend" or "website"

### **Step 3: Configure Frontend Service**

1. **Root Directory:** `railway-frontend-deploy`
2. **Build Command:** (leave empty - uses package.json)
3. **Start Command:** `npm start`

### **Step 4: Deploy**

1. **Click:** "Deploy"
2. **Wait:** 2-3 minutes for deployment
3. **Get URL:** Copy the Railway-provided URL

### **Step 5: Update Domain (Optional)**

1. **Settings → Networking**
2. **Add Custom Domain:** artwithheartandgifts.com
3. **Update DNS** to point to Railway URL

---

## ✅ WHAT'S INCLUDED IN THIS DEPLOYMENT

### **🔧 ALL FIXES:**

- ✅ **Checkout Form** - No more redirect to home page
- ✅ **Commission Forms** - Fixed email sending
- ✅ **Contact Forms** - Fixed email sending
- ✅ **Gmail SMTP** - Optimized timeouts
- ✅ **Payment Processing** - Proper error handling

### **📁 FILES DEPLOYED:**

- `public/` - Complete built website
- `checkout.html` - Fixed checkout page
- `src/js/checkout-fix.js` - Checkout JavaScript fixes
- `server.js` - Express static file server
- All images, styles, and data files

---

## 🧪 TEST IMMEDIATELY AFTER DEPLOYMENT

### **1. Test Commission Form:**

- **URL:** `https://your-railway-url.up.railway.app/commissions.html`
- Fill out completely and submit
- Should show success message

### **2. Test Contact Form:**

- **URL:** `https://your-railway-url.up.railway.app/contact.html`
- Fill out and submit
- Should show success message

### **3. Test Checkout:**

- **URL:** `https://your-railway-url.up.railway.app/shop.html`
- Add items to cart
- Click checkout
- Should go to checkout page (NOT home page)
- Fill out form and submit

---

## 📧 STILL NEED TO FIX GMAIL

**If forms still show email errors:**

1. **Go to:** https://myaccount.google.com/security
2. **Search:** "App passwords"
3. **Delete** existing app password
4. **Create new** app password for "Mail"
5. **Copy** 16-character password (no spaces)
6. **Update Railway backend variables:**
   - `EMAIL_PASS` → new password
   - `SMTP_PASS` → new password

---

## 🔄 IF ANYTHING GOES WRONG

**Contact info in case of issues:**

- Backend still running: ✅ Railway backend working
- Frontend deployment: Use `EMERGENCY-FRONTEND-DEPLOY.zip`
- All fixes included: ✅ Ready to go live

**This should fix everything and get the site live within 5 minutes!**

---

## 📞 BACKUP PLAN

**If Railway doesn't work:**

1. Use **Vercel** (free): https://vercel.com
2. Upload `EMERGENCY-FRONTEND-DEPLOY.zip`
3. Connect domain
4. Live in 2 minutes

**🚀 DEPLOY NOW - SITE WILL BE LIVE WITH ALL FIXES!**
