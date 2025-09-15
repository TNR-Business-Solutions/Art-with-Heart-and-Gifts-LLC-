import https from "https";

async function findRailwayUrlDirect() {
  console.log("🔍 DIRECTLY FINDING YOUR RAILWAY URL");
  console.log("=".repeat(60));

  const projectId = "fdbd470f-c853-43cf-94bd-7ab13d93561b";
  const deploymentId = "2817c0b0-a918-4e38-88ef-ff14e68f8109";

  // Test common Railway URL patterns
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
    `https://${projectId.slice(0, 8)}.up.railway.app`,
    `https://art-with-heart-and-gifts-llc-${projectId.slice(
      0,
      8
    )}.up.railway.app`,
  ];

  console.log(`\n🧪 Testing ${possibleUrls.length} possible Railway URLs...\n`);

  for (const url of possibleUrls) {
    try {
      const healthUrl = `${url}/api/health`;
      console.log(`Testing: ${healthUrl}`);

      const result = await testUrl(healthUrl);
      if (result.success) {
        console.log(`\n🎉 FOUND YOUR RAILWAY URL: ${url}`);
        console.log(`📋 Health check response: ${JSON.stringify(result.data)}`);

        // Test other endpoints
        console.log(`\n🧪 Testing other endpoints:`);
        await testEndpoint(`${url}/api/products`, "Products");
        await testEndpoint(
          `${url}/api/swipe-simple/config`,
          "Swipe Simple Config"
        );

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
  console.log("\n🚨 RAILWAY URL NOT FOUND - MANUAL STEPS REQUIRED:");
  console.log("1. In Railway dashboard, look for a 'Generate Domain' button");
  console.log("2. Or check if there's an 'Expose Service' option");
  console.log("3. The service might need to be manually exposed");
  console.log("4. Check the Architecture tab for service status");

  return null;
}

async function testEndpoint(url, name) {
  try {
    const result = await testUrl(url);
    if (result.success) {
      console.log(`✅ ${name}: ${url} - Working`);
    } else {
      console.log(`❌ ${name}: ${url} - ${result.error}`);
    }
  } catch (error) {
    console.log(`❌ ${name}: ${url} - Error: ${error.message}`);
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

findRailwayUrlDirect()
  .then((url) => {
    if (url) {
      console.log(`\n🚀 SUCCESS! Your Railway backend URL is: ${url}`);
      console.log(`\n🎯 NEXT STEPS:`);
      console.log(`1. Update frontend to use this URL`);
      console.log(`2. Test the complete payment flow`);
      console.log(`3. Deploy updated frontend`);
    } else {
      console.log(`\n❌ Could not find Railway URL automatically`);
      console.log(`\n🎯 MANUAL ACTION REQUIRED:`);
      console.log(
        `Look for 'Generate Domain' or 'Expose Service' button in Railway dashboard`
      );
    }
  })
  .catch(console.error);
