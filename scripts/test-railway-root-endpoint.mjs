import https from "https";

async function testRailwayRoot() {
  console.log("🔍 TESTING RAILWAY ROOT ENDPOINT");
  console.log("=".repeat(60));

  const backendUrl = "https://v9n63a37.up.railway.app";
  
  console.log(`\n🎯 Testing Railway Root: ${backendUrl}`);
  
  const endpoints = [
    { path: "/", name: "Root Endpoint" },
    { path: "/api", name: "API Root" },
    { path: "/api/health", name: "Health Check" },
    { path: "/health", name: "Health (no /api)" },
    { path: "/status", name: "Status" }
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

  console.log("🎉 RAILWAY ROOT TESTING COMPLETE!");
  console.log(`\n🚀 Your Railway Backend URL: ${backendUrl}`);
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

testRailwayRoot().catch(console.error);
