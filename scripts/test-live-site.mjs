async function testLiveSite() {
  console.log("🌐 TESTING LIVE SITE - Art with Heart & Gifts");
  console.log("=".repeat(60));

  const testResults = {
    frontend: { status: "unknown", url: "https://artwithheartandgifts.com" },
    backend: { status: "unknown", url: "unknown" },
    payment: { status: "unknown" },
  };

  console.log("\n📋 LIVE SITE TEST CHECKLIST:");
  console.log("=".repeat(40));

  // Test 1: Frontend (Netlify)
  console.log("\n🎨 TEST 1: Frontend (Netlify)");
  console.log("-".repeat(30));
  console.log("URL: https://artwithheartandgifts.com");
  console.log("Status: Testing...");

  try {
    const response = await fetch("https://artwithheartandgifts.com");
    if (response.ok) {
      console.log("✅ Frontend is LIVE and accessible");
      testResults.frontend.status = "live";
    } else {
      console.log(`❌ Frontend returned status: ${response.status}`);
      testResults.frontend.status = "error";
    }
  } catch (error) {
    console.log(`❌ Frontend error: ${error.message}`);
    testResults.frontend.status = "error";
  }

  // Test 2: Backend (Railway) - Need to get URL
  console.log("\n⚙️  TEST 2: Backend (Railway)");
  console.log("-".repeat(30));
  console.log("Status: Need Railway backend URL");
  console.log("Expected endpoints:");
  console.log("- Health: https://your-railway-url.up.railway.app/api/health");
  console.log(
    "- Products: https://your-railway-url.up.railway.app/api/products"
  );
  console.log("Action: Get backend URL from Railway dashboard");

  // Test 3: Payment Integration
  console.log("\n💳 TEST 3: Payment Integration");
  console.log("-".repeat(30));
  console.log("Status: Requires backend URL");
  console.log("Components:");
  console.log("- Swipe Simple Payment Links ✓");
  console.log("- Webhook endpoint: /api/webhooks/swipe-simple");
  console.log("- Merchant ID: 461682001808706 ✓");

  // Test 4: Data Files
  console.log("\n📊 TEST 4: Data Files");
  console.log("-".repeat(30));

  try {
    const dataResponse = await fetch(
      "https://artwithheartandgifts.com/data.json"
    );
    if (dataResponse.ok) {
      const data = await dataResponse.json();
      console.log(`✅ Product data accessible: ${data.length} products`);
    } else {
      console.log("❌ Product data not accessible");
    }
  } catch (error) {
    console.log(`❌ Data error: ${error.message}`);
  }

  try {
    const galleryResponse = await fetch(
      "https://artwithheartandgifts.com/data-gallery.json"
    );
    if (galleryResponse.ok) {
      const gallery = await galleryResponse.json();
      console.log(`✅ Gallery data accessible: ${gallery.length} items`);
    } else {
      console.log("❌ Gallery data not accessible");
    }
  } catch (error) {
    console.log(`❌ Gallery error: ${error.message}`);
  }

  // Test 5: Images
  console.log("\n🖼️  TEST 5: Images");
  console.log("-".repeat(30));

  const testImages = [
    "https://artwithheartandgifts.com/images/1. Angels set of 3 9in x12in 50.00.jpg",
    "https://artwithheartandgifts.com/images/charmin-1.jpg",
  ];

  for (const imageUrl of testImages) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        console.log(`✅ Image accessible: ${imageUrl.split("/").pop()}`);
      } else {
        console.log(`❌ Image not accessible: ${imageUrl.split("/").pop()}`);
      }
    } catch (error) {
      console.log(`❌ Image error: ${imageUrl.split("/").pop()}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📋 LIVE SITE TEST SUMMARY");
  console.log("=".repeat(60));

  console.log("\n🎯 NEXT STEPS:");
  console.log("1. Get Railway backend URL from dashboard");
  console.log("2. Test backend endpoints");
  console.log("3. Update frontend with backend URL");
  console.log("4. Configure Swipe Simple webhook");
  console.log("5. Test complete payment flow");

  console.log("\n📞 RAILWAY BACKEND URL NEEDED:");
  console.log("- Go to Railway dashboard");
  console.log("- Copy your backend URL");
  console.log("- Test: https://your-url.up.railway.app/api/health");
  console.log('- Should return: {"status":"OK"}');

  console.log("\n💳 SWIPE SIMPLE SETUP:");
  console.log(
    "- Set webhook URL to: https://your-backend-url/api/webhooks/swipe-simple"
  );
  console.log("- Merchant ID: 461682001808706");
  console.log("- Test payment flow end-to-end");

  return testResults;
}

testLiveSite().catch(console.error);
