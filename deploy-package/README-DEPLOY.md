# Art with Heart & Gifts Backend - Emergency Fix

## 🚨 CRITICAL FIXES APPLIED:
✅ Email Service Added - Commission and contact forms now working
✅ Payment Processor Fixed - Secure checkout notifications working  
✅ All Dependencies Updated - Added nodemailer for email functionality

## 🚀 DEPLOYMENT INSTRUCTIONS:

### Method 1: Railway (Recommended)
1. Zip this entire folder
2. Go to Railway.app
3. "New Project" → "Deploy from folder"
4. Upload the zip file
5. Add environment variables (CRITICAL - see below)
6. Deploy!

### Method 2: Alternative Platforms
- Render.com: Connect GitHub → Set root directory to this folder
- Vercel: Import from GitHub → Configure as Node.js function
- Heroku: Create app → Connect GitHub → Set root directory

## 🔧 REQUIRED Environment Variables:
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://artwithheartandgifts.com

# Swipe Simple (for payments)
SWIPE_SIMPLE_MERCHANT_ID=your_merchant_id_here
SWIPE_SIMPLE_API_KEY=your_api_key_here

# Email (CRITICAL for forms to work)
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=artwithheartandgifts@yahoo.com
SMTP_PASS=your_yahoo_app_password_here
EMAIL_USER=artwithheartandgifts@yahoo.com
EMAIL_PASS=your_yahoo_app_password_here
```

## 📧 Yahoo Email Setup:
1. Go to Yahoo Account Security
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use App Password as SMTP_PASS and EMAIL_PASS

## 🧪 Test Endpoints After Deployment:
- Health: GET /api/health
- Email Test: POST /api/email/test
- Contact Form: POST /api/contact
- Commission Form: POST /api/commission

## 🌐 Frontend Configuration:
The frontend is already configured to use the Railway URL:
https://art-with-heart-and-gifts-llc-production.up.railway.app

If you deploy to a different platform, update src/js/app.js lines 651 and 707.

---
Generated: 2025-09-15T19:02:57.595Z
