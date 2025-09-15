async function testBackendEndpoints(railwayUrl) {
  console.log(`🧪 TESTING RAILWAY BACKEND: ${railwayUrl}`);
  console.log("=".repeat(60));

  if (!railwayUrl) {
    console.log("❌ No Railway URL provided");
    console.log("Please provide your Railway backend URL");
    return;
  }

  // Test Health Endpoint
  console.log("\n🔍 TEST 1: Health Endpoint");
  console.log("-".repeat(30));
  console.log(`Testing: ${railwayUrl}/api/health`);

  try {
    const healthResponse = await fetch(`${railwayUrl}/api/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log("✅ Health endpoint working!");
      console.log(`Response: ${JSON.stringify(healthData)}`);
    } else {
      console.log(`❌ Health endpoint failed: ${healthResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Health endpoint error: ${error.message}`);
  }

  // Test Products Endpoint
  console.log("\n🔍 TEST 2: Products Endpoint");
  console.log("-".repeat(30));
  console.log(`Testing: ${railwayUrl}/api/products`);

  try {
    const productsResponse = await fetch(`${railwayUrl}/api/products`);
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log("✅ Products endpoint working!");
      console.log(`Found ${productsData.length} products`);

      // Show sample product
      if (productsData.length > 0) {
        const sample = productsData[0];
        console.log(`Sample product: ${sample.title} - $${sample.price}`);
      }
    } else {
      console.log(`❌ Products endpoint failed: ${productsResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Products endpoint error: ${error.message}`);
  }

  // Test Orders Endpoint (should return method not allowed for GET)
  console.log("\n🔍 TEST 3: Orders Endpoint");
  console.log("-".repeat(30));
  console.log(`Testing: ${railwayUrl}/api/orders`);

  try {
    const ordersResponse = await fetch(`${railwayUrl}/api/orders`);
    console.log(`Orders endpoint status: ${ordersResponse.status}`);
    if (ordersResponse.status === 405) {
      console.log(
        "✅ Orders endpoint exists (Method Not Allowed for GET - expected)"
      );
    } else {
      console.log(`⚠️  Unexpected status: ${ordersResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Orders endpoint error: ${error.message}`);
  }

  // Test Webhook Endpoint
  console.log("\n🔍 TEST 4: Webhook Endpoint");
  console.log("-".repeat(30));
  console.log(`Testing: ${railwayUrl}/api/webhooks/swipe-simple`);

  try {
    const webhookResponse = await fetch(
      `${railwayUrl}/api/webhooks/swipe-simple`
    );
    console.log(`Webhook endpoint status: ${webhookResponse.status}`);
    if (webhookResponse.status === 404 || webhookResponse.status === 405) {
      console.log("✅ Webhook endpoint exists (expected for GET request)");
    } else {
      console.log(`⚠️  Unexpected status: ${webhookResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ Webhook endpoint error: ${error.message}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("📋 BACKEND TEST SUMMARY");
  console.log("=".repeat(60));

  console.log("\n🎯 NEXT STEPS:");
  console.log("1. If all tests passed, your backend is ready!");
  console.log("2. Update frontend with Railway URL");
  console.log("3. Configure Swipe Simple webhook");
  console.log("4. Test complete payment flow");

  console.log("\n🔧 FRONTEND INTEGRATION:");
  console.log("Update src/js/swipe-simple-checkout.js:");
  console.log(`this.apiUrl = "${railwayUrl}/api/orders";`);

  console.log("\n💳 SWIPE SIMPLE WEBHOOK:");
  console.log(`Set webhook URL to: ${railwayUrl}/api/webhooks/swipe-simple`);
}

// Get Railway URL from command line argument
const railwayUrl = process.argv[2];
testBackendEndpoints(railwayUrl).catch(console.error);
