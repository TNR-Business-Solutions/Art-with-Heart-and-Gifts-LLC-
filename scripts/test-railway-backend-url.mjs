import https from "https";

async function testRailwayBackend() {
  console.log("🧪 TESTING RAILWAY BACKEND URL");
  console.log("=".repeat(60));

  const backendUrl = "https://v9n63a37.up.railway.app";
  
  console.log(`\n🎯 Testing Railway Backend: ${backendUrl}`);
  
  const endpoints = [
    { path: "/api/health", name: "Health Check" },
    { path: "/api/products", name: "Products API" },
    { path: "/api/swipe-simple/config", name: "Swipe Simple Config" }
  ];

  console.log(`\n🧪 Testing ${endpoints.length} endpoints...\n`);

  for (const endpoint of endpoints) {
    try {
      const url = `${backendUrl}${endpoint.path}`;
      console.log(`Testing: ${url}`);
      
      const result = await testUrl(url);
      if (result.success) {
        console.log(`✅ ${endpoint.name}: Working`);
        console.log(`📋 Response: ${JSON.stringify(result.data).substring(0, 100)}...`);
      } else {
        console.log(`❌ ${endpoint.name}: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
    console.log("");
  }

  console.log("🎉 RAILWAY BACKEND TESTING COMPLETE!");
  console.log(`\n🚀 Your Railway Backend URL: ${backendUrl}`);
  console.log("\n🎯 NEXT STEPS:");
  console.log("1. Update frontend to use this Railway URL");
  console.log("2. Configure Swipe Simple webhook");
  console.log("3. Test complete payment flow");
  console.log("4. Deploy updated frontend");
}

function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            resolve({ success: true, data: jsonData });
          } catch {
            resolve({ success: true, data: data });
          }
        } else {
          resolve({ success: false, error: `Status ${res.statusCode}` });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({ success: false, error: error.message });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ success: false, error: "Timeout" });
    });
  });
}

testRailwayBackend().catch(console.error);
