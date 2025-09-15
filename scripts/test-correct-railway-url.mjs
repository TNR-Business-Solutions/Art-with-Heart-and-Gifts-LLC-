import https from "https";

async function testCorrectRailwayUrl() {
  console.log("🎉 TESTING CORRECT RAILWAY URL");
  console.log("=".repeat(60));

  const correctUrl =
    "https://art-with-heart-and-gifts-llc-production.up.railway.app";

  console.log(`\n🎯 Testing Correct Railway URL: ${correctUrl}`);

  const endpoints = [
    { path: "/", name: "Root Endpoint" },
    { path: "/api", name: "API Root" },
    { path: "/api/health", name: "Health Check" },
    { path: "/api/products", name: "Products API" },
    { path: "/api/swipe-simple/config", name: "Swipe Simple Config" },
  ];

  console.log(`\n🧪 Testing ${endpoints.length} endpoints...\n`);

  let workingEndpoints = [];

  for (const endpoint of endpoints) {
    try {
      const url = `${correctUrl}${endpoint.path}`;
      console.log(`Testing: ${url}`);

      const result = await testUrl(url);
      if (result.success) {
        console.log(`✅ ${endpoint.name}: Working`);
        console.log(
          `📋 Response: ${JSON.stringify(result.data).substring(0, 100)}...`
        );
        workingEndpoints.push(endpoint);
      } else {
        console.log(`❌ ${endpoint.name}: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
    console.log("");
  }

  console.log("🎉 RAILWAY BACKEND TESTING COMPLETE!");
  console.log(`\n🚀 Correct Railway Backend URL: ${correctUrl}`);

  if (workingEndpoints.length > 0) {
    console.log(`\n✅ Working Endpoints: ${workingEndpoints.length}`);
    workingEndpoints.forEach((ep) => console.log(`  - ${ep.name}`));

    console.log("\n🎯 NEXT STEPS:");
    console.log("1. Update frontend to use the correct Railway URL");
    console.log("2. Configure Swipe Simple webhook");
    console.log("3. Test complete payment flow");
    console.log("4. Deploy updated frontend");
  } else {
    console.log("\n❌ No working endpoints found");
    console.log("Check Railway service configuration");
  }
}

function testUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
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

    req.on("error", (error) => {
      resolve({ success: false, error: error.message });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ success: false, error: "Timeout" });
    });
  });
}

testCorrectRailwayUrl().catch(console.error);
