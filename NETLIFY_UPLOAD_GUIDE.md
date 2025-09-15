# Netlify Upload Guide - Quick Image URL Update

## Files to Upload to Live Site:

### **Essential Files Only:**

1. `data.json` → Upload to root directory
2. `data-gallery.json` → Upload to root directory
3. `backend/data/inventory.json` → Upload to backend/data/ directory

### **For Swipe Simple Import:**

4. `SwipeSimple_Catalog_Updated_URLs.csv` → Keep locally for Swipe Simple import

## Step-by-Step Netlify Upload:

### **Method 1: Netlify Dashboard (Recommended)**

1. Go to https://app.netlify.com/sites/zippy-cupcake-af86f1
2. Click **"Deploys"** tab
3. Click **"Trigger deploy"** → **"Deploy site"**
4. This will redeploy your entire site (includes the updated files)

### **Method 2: Drag & Drop (If you have file access)**

1. Go to **"Files"** tab in Netlify dashboard
2. Navigate to root directory
3. Drag `data.json` and `data-gallery.json` to replace existing files
4. Navigate to `backend/data/` directory
5. Drag `inventory.json` to replace existing file

### **Method 3: Git Push (If using Git)**

1. Commit the updated files to your repository
2. Push to trigger automatic Netlify deploy

## What This Updates:

- ✅ All product images now use `https://artwithheartandgifts.com/images/...`
- ✅ All gallery images now use live URLs
- ✅ Backend inventory updated with live URLs
- ✅ No broken image links

## After Upload:

1. Test your site: https://artwithheartandgifts.com
2. Check shop page images load correctly
3. Check gallery page images load correctly
4. Import CSV to Swipe Simple when ready

## Swipe Simple Import:

- Use `SwipeSimple_Catalog_Updated_URLs.csv`
- All image URLs are now properly formatted with your live domain
