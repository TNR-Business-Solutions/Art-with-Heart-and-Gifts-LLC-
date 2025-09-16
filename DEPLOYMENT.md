# Art with Heart & Gifts - Deployment Guide

## 🚀 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

### Method 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository OR drag & drop the `dist` folder
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Method 3: Drag & Drop

1. Zip the `dist` folder
2. Go to Vercel dashboard
3. Drag and drop the zip file
4. Vercel will automatically deploy it

## 🔧 Environment Variables

### Frontend (Vercel)

- `VITE_API_URL`: Your Railway backend URL
- `VITE_SITE_URL`: Your Vercel domain

### Backend (Railway) - Already Configured ✅

- `EMAIL_USER`: artwithheartandgiftsllc@gmail.com
- `EMAIL_PASS`: rbzkiuokoimeyeco
- `SMTP_USER`: artwithheartandgiftsllc@gmail.com
- `SMTP_PASS`: rbzkiuokoimeyeco

## 📱 After Deployment

1. **Test the live site**:

   - Visit your Vercel URL
   - Test contact forms
   - Test commission inquiries
   - Test shopping cart

2. **Update frontend API URLs**:

   - The frontend is currently pointing to Railway backend
   - This should work as-is, but verify in browser dev tools

3. **Monitor Railway logs**:
   - Check that emails are being sent
   - Monitor for any errors

## 🎯 Current Status

- ✅ **Frontend**: Built and ready (`dist` folder)
- ✅ **Backend**: Deployed on Railway and working
- ✅ **Email System**: Fully functional
- ✅ **E-commerce**: Shopping cart and payment ready
- ✅ **Responsive Design**: Mobile-first layouts

## 📞 Support

- **Email**: artwithheartandgifts@yahoo.com
- **Phone**: (239) 878-9849
- **Technical Issues**: Check Railway logs and Vercel functions

---

**Your Art with Heart & Gifts website is ready for production deployment!** 🎨✨
