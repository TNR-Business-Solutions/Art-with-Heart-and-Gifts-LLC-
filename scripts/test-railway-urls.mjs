import https from "https";

async function testRailwayUrls() {
  console.log("🔍 TESTING COMMON RAILWAY URL PATTERNS");
  console.log("=".repeat(60));

  const deploymentId = "8cb7cfb9-ffb8-4145-8b42-24e5dec46124";

  // Common Railway URL patterns
  const possibleUrls = [
    `https://art-with-heart-and-gifts-llc-production.up.railway.app`,
    `https://art-with-heart-and-gifts-llc-backend.up.railway.app`,
    `https://backend-production-${deploymentId.slice(-8)}.up.railway.app`,
    `https://artwithheartandgifts-backend.up.railway.app`,
    `https://art-with-heart-and-gifts-llc-${deploymentId.slice(
      0,
      8
    )}.up.railway.app`,
    `https://production-${deploymentId.slice(-8)}.up.railway.app`,
    `https://art-with-heart-and-gifts-llc.up.railway.app`,
    `https://backend-${deploymentId.slice(-8)}.up.railway.app`,
  ];

  console.log(`\n🧪 Testing ${possibleUrls.length} possible Railway URLs...\n`);

  for (const url of possibleUrls) {
    try {
      const healthUrl = `${url}/api/health`;
      console.log(`Testing: ${healthUrl}`);

      const result = await testUrl(healthUrl);
      if (result.success) {
        console.log(`✅ FOUND WORKING URL: ${url}`);
        console.log(`📋 Health check response: ${result.data}`);
        return url;
      } else {
        console.log(`❌ ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    console.log("");
  }

  console.log("❌ None of the common patterns worked.");
  console.log("\n🎯 MANUAL STEPS REQUIRED:");
  console.log("1. Go to https://railway.app");
  console.log("2. Click on your project");
  console.log("3. Look for the URL in one of these places:");
  console.log("   - Deployments tab → Click deployment ID");
  console.log("   - Main dashboard (prominent URL)");
  console.log("   - Domains tab");
  console.log("4. Copy the URL and share it with me");

  return null;
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

testRailwayUrls().catch(console.error);
