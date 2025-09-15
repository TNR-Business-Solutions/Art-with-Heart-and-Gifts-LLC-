import fs from "fs/promises";

async function railwayDeploymentId() {
  console.log("🔍 RAILWAY DEPLOYMENT ID FOUND - Testing Backend");
  console.log("=".repeat(60));

  const deploymentId = "8cb7cfb9-ffb8-4145-8b42-24e5dec46124";

  console.log(`\n📋 Deployment ID: ${deploymentId}`);
  console.log("\n🎯 This means your backend is deployed! Now let's find the URL:");

  // Try common Railway URL patterns
  const possibleUrls = [
    `https://${deploymentId}.up.railway.app`,
    `https://backend-${deploymentId.slice(0, 8)}.up.railway.app`,
    `https://art-with-heart-and-gifts-llc-production.up.railway.app`,
    `https://backend-production-${deploymentId.slice(0, 8)}.up.railway.app`
  ];

  console.log("\n🧪 Testing possible Railway URLs:");
  console.log("=".repeat(40));

  for (const url of possibleUrls) {
    console.log(`\n🔍 Testing: ${url}`);
    
    try {
      // Test health endpoint
      const healthResponse = await fetch(`${url}/api/health`);
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log(`✅ FOUND WORKING BACKEND: ${url}`);
        console.log(`Health response: ${JSON.stringify(healthData)}`);
        
        // Test products endpoint
        try {
          const productsResponse = await fetch(`${url}/api/products`);
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            console.log(`✅ Products API working: ${productsData.length} products`);
            
            console.log(`\n🎉 SUCCESS! Your backend URL is: ${url}`);
            console.log("\n🔧 NEXT STEPS:");
            console.log("1. Update frontend with this URL");
            console.log("2. Configure Swipe Simple webhook");
            console.log("3. Test complete payment flow");
            
            return url;
          }
        } catch (error) {
          console.log(`⚠️  Products API error: ${error.message}`);
        }
      } else {
        console.log(`❌ Not working: ${healthResponse.status}`);
      }
    } catch (error) {
      console.log(`❌ Connection error: ${error.message}`);
    }
  }

  console.log("\n🔍 If none of those URLs work:");
  console.log("1. Go to Railway dashboard");
  console.log("2. Click on your deployment");
  console.log("3. Look for the actual URL");
  console.log("4. Or check the 'Domains' tab");

  console.log("\n📋 Expected URL format:");
  console.log("- https://your-project-name.up.railway.app");
  console.log("- https://backend-production-xxxx.up.railway.app");

  return null;
}

railwayDeploymentId().catch(console.error);
