#!/bin/bash
echo "🚀 Deploying SMTP fixes to Railway..."

# Navigate to deployment directory
cd "C:\Users\roytu\Desktop\artwithheartandgifts\temp-railway-deploy"

# Initialize git if not already a git repo
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "SMTP fixes for Railway deployment"
fi

# Login to Railway (will prompt for authentication)
echo "🔐 Authenticating with Railway..."
railway login

# Link to existing project
echo "🔗 Linking to Railway project..."
railway link

# Deploy the fixed code
echo "🚀 Deploying fixes..."
railway up

echo "✅ Deployment complete!"
echo "🧪 Test your commission forms now!"
