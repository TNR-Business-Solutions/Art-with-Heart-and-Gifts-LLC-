# Railway Environment Variables for Art with Heart & Gifts

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
