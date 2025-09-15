
Write-Host "🚀 Deploying SMTP fixes to Railway..." -ForegroundColor Green

# Navigate to deployment directory
Set-Location "C:\Users\roytu\Desktop\artwithheartandgifts\temp-railway-deploy"

# Initialize git if not already a git repo
if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "SMTP fixes for Railway deployment"
}

# Login to Railway (will open browser)
Write-Host "🔐 Authenticating with Railway..." -ForegroundColor Yellow
railway login

# Link to existing project
Write-Host "🔗 Linking to Railway project..." -ForegroundColor Yellow
railway link

# Deploy the fixed code
Write-Host "🚀 Deploying fixes..." -ForegroundColor Yellow
railway up

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🧪 Test your commission forms now!" -ForegroundColor Cyan
