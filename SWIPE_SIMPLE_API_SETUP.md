# Swipe Simple API Key Setup Guide

## 🔑 **How to Find Your Swipe Simple API Key:**

### **Step 1: Log into Swipe Simple Dashboard**

1. Go to https://dashboard.swipesimple.com
2. Log in with your Swipe Simple account credentials

### **Step 2: Navigate to API Settings**

1. Look for **"Settings"** or **"Account Settings"** in the main menu
2. Click on **"API"** or **"Developer"** or **"Integrations"**
3. Look for **"API Keys"** or **"Webhook Settings"**

### **Step 3: Generate API Key**

1. Click **"Generate New API Key"** or **"Create API Key"**
2. Give it a name like "Art with Heart & Gifts Integration"
3. Copy the generated key (it will look like: `sk_live_...` or `sk_test_...`)

### **Step 4: Note Your Account Details**

- **Account ID** (usually found in account settings)
- **Webhook Secret** (if available)
- **Test vs Live Mode** (make sure you're in the right mode)

## 🔧 **Set Up Environment File:**

### **Create .env file in project root:**

```bash
# Swipe Simple Configuration
SWIPE_SIMPLE_API_KEY=your_actual_api_key_here
SWIPE_SIMPLE_ACCOUNT_ID=your_account_id_here
SWIPE_SIMPLE_WEBHOOK_SECRET=your_webhook_secret_here

# Environment
NODE_ENV=production

# URLs
FRONTEND_URL=https://artwithheartandgifts.com
BACKEND_URL=https://artwithheartandgifts.com/api

# Server
PORT=3001
```

## 🚀 **Alternative: Use Test Mode First**

If you can't find the API key immediately, you can start with test mode:

```bash
# Test mode configuration
SWIPE_SIMPLE_API_KEY=test-api-key
SWIPE_SIMPLE_BASE_URL=https://api.swipesimple.com/v1
NODE_ENV=development
```

## 📋 **What to Look For in Swipe Simple Dashboard:**

### **Common Locations:**

- **Settings** → **API** → **API Keys**
- **Account** → **Developer** → **API Access**
- **Integrations** → **API Settings**
- **Tools** → **API** → **Generate Key**

### **Key Format:**

- **Live:** `sk_live_xxxxxxxxxxxxxxxx`
- **Test:** `sk_test_xxxxxxxxxxxxxxxx`
- **Sandbox:** `sk_sandbox_xxxxxxxxxxxxxxxx`

## ⚠️ **Important Notes:**

1. **Keep API keys secure** - never commit them to version control
2. **Use test mode first** to verify everything works
3. **Test webhook URLs** before going live
4. **Document your keys** in a secure password manager

## 🔍 **If You Can't Find API Settings:**

1. **Contact Swipe Simple Support** - they can guide you to the right location
2. **Check your plan** - some features might require higher tiers
3. **Look for "Developer" or "Integration" sections**
4. **Check account permissions** - you might need admin access

## 📞 **Swipe Simple Support:**

- **Phone:** Check their website for current support number
- **Email:** support@swipesimple.com
- **Help Center:** https://help.swipesimple.com

**Once you have the API key, I'll help you set up the environment file and test the integration!**
