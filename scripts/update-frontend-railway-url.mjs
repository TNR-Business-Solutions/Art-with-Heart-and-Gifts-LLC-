import fs from "fs/promises";
import path from "path";

async function updateFrontendRailwayUrl() {
  console.log("🔧 UPDATING FRONTEND WITH RAILWAY URL");
  console.log("=".repeat(60));

  const railwayUrl = "https://v9n63a37.up.railway.app";
  
  console.log(`\n🎯 Updating frontend to use Railway URL: ${railwayUrl}`);

  // Files that need to be updated
  const filesToUpdate = [
    "src/js/app.js",
    "src/js/cart.js",
    "src/js/payment.js",
    "backend/server.js"
  ];

  const updates = [];

  for (const filePath of filesToUpdate) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const content = await fs.readFile(fullPath, 'utf8');
      
      // Replace localhost:3001 with Railway URL
      let updatedContent = content.replace(
        /localhost:3001/g, 
        railwayUrl.replace('https://', '')
      );
      
      // Replace http://localhost:3001 with Railway URL
      updatedContent = updatedContent.replace(
        /http:\/\/localhost:3001/g, 
        railwayUrl
      );

      // Update API base URL
      updatedContent = updatedContent.replace(
        /const\s+API_BASE_URL\s*=\s*['"][^'"]*['"]/g,
        `const API_BASE_URL = '${railwayUrl}/api'`
      );

      if (content !== updatedContent) {
        await fs.writeFile(fullPath, updatedContent);
        updates.push(`✅ Updated: ${filePath}`);
        console.log(`✅ Updated: ${filePath}`);
      } else {
        updates.push(`⏭️ No changes needed: ${filePath}`);
        console.log(`⏭️ No changes needed: ${filePath}`);
      }
    } catch (error) {
      updates.push(`❌ Error updating ${filePath}: ${error.message}`);
      console.log(`❌ Error updating ${filePath}: ${error.message}`);
    }
  }

  // Create a summary file
  const summary = `# 🔧 FRONTEND UPDATED WITH RAILWAY URL

## 📋 **Railway Backend URL:**
${railwayUrl}

## 🔄 **Files Updated:**
${updates.join('\n')}

## 🧪 **Test Endpoints:**
- Health: ${railwayUrl}/api/health
- Products: ${railwayUrl}/api/products
- Orders: ${railwayUrl}/api/orders
- Swipe Simple Config: ${railwayUrl}/api/swipe-simple/config

## 🎯 **Next Steps:**
1. Test the updated frontend
2. Verify backend endpoints are working
3. Configure Swipe Simple webhook
4. Deploy updated frontend to Netlify

## 🚨 **Backend Status:**
- Railway URL found: ${railwayUrl}
- Service status: Needs verification (404 errors detected)
- Action: Check Railway service configuration
`;

  await fs.writeFile("FRONTEND_RAILWAY_UPDATE_SUMMARY.md", summary);
  console.log("✅ Created FRONTEND_RAILWAY_UPDATE_SUMMARY.md");

  console.log("\n🎉 FRONTEND UPDATED WITH RAILWAY URL!");
  console.log(`\n🚀 Railway Backend URL: ${railwayUrl}`);
  console.log("\n📋 Files Updated:");
  updates.forEach(update => console.log(update));
  
  console.log("\n🧪 Test Endpoints:");
  console.log(`- Health: ${railwayUrl}/api/health`);
  console.log(`- Products: ${railwayUrl}/api/products`);
  console.log(`- Orders: ${railwayUrl}/api/orders`);
  
  console.log("\n🎯 NEXT STEPS:");
  console.log("1. Test the updated frontend");
  console.log("2. Verify backend endpoints are working");
  console.log("3. Configure Swipe Simple webhook");
  console.log("4. Deploy updated frontend to Netlify");
  
  console.log("\n🚨 BACKEND STATUS:");
  console.log("- Railway URL found: " + railwayUrl);
  console.log("- Service status: Needs verification (404 errors detected)");
  console.log("- Action: Check Railway service configuration");
}

updateFrontendRailwayUrl().catch(console.error);
