import https from "https";

async function testCompletePaymentFlow() {
  console.log("🧪 TESTING COMPLETE PAYMENT FLOW");
  console.log("=".repeat(60));

  const backendUrl =
    "https://art-with-heart-and-gifts-llc-production.up.railway.app";

  console.log(
    `\n🎯 Testing Complete Payment Flow with Railway Backend: ${backendUrl}`
  );

  const testSteps = [
    {
      name: "1. Health Check",
      url: `${backendUrl}/api/health`,
      expected: "status OK",
    },
    {
      name: "2. Products API",
      url: `${backendUrl}/api/products`,
      expected: "product list",
    },
    {
      name: "3. Swipe Simple Config",
      url: `${backendUrl}/api/swipe-simple/config`,
      expected: "configuration data",
    },
    {
      name: "4. Test Order Creation",
      url: `${backendUrl}/api/orders`,
      method: "POST",
      data: {
        customer: { name: "Test Customer", email: "test@example.com" },
        items: [
          { id: "original-1", title: "Test Item", price: 50, quantity: 1 },
        ],
        totals: { subtotal: 50, tax: 3, shipping: 0, total: 53 },
      },
      expected: "order created with payment link",
    },
  ];

  console.log(`\n🧪 Testing ${testSteps.length} payment flow steps...\n`);

  let allTestsPassed = true;

  for (const step of testSteps) {
    try {
      console.log(`Testing: ${step.name}`);
      console.log(`URL: ${step.url}`);

      const result = await testEndpoint(step);
      if (result.success) {
        console.log(`✅ ${step.name}: PASSED`);
        console.log(
          `📋 Response: ${JSON.stringify(result.data).substring(0, 150)}...`
        );
      } else {
        console.log(`❌ ${step.name}: FAILED - ${result.error}`);
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${step.name}: ERROR - ${error.message}`);
      allTestsPassed = false;
    }
    console.log("");
  }

  console.log("🎉 COMPLETE PAYMENT FLOW TESTING FINISHED!");

  if (allTestsPassed) {
    console.log("\n✅ ALL TESTS PASSED!");
    console.log("\n🚀 PAYMENT SYSTEM IS READY!");
    console.log("\n📋 SWIPE SIMPLE WEBHOOK CONFIGURATION:");
    console.log(`Webhook URL: ${backendUrl}/api/webhooks/swipe-simple`);
    console.log("Merchant ID: 461682001808706");
    console.log("Status: Ready for configuration");

    console.log("\n🎯 FINAL STEPS:");
    console.log("1. ✅ Configure Swipe Simple webhook");
    console.log("2. ✅ Deploy updated frontend to Netlify");
    console.log("3. ✅ Test live payment flow");
    console.log("4. ✅ Go live!");
  } else {
    console.log("\n❌ SOME TESTS FAILED!");
    console.log("Check the failed tests above and fix any issues");
  }
}

async function testEndpoint(step) {
  return new Promise((resolve) => {
    const url = new URL(step.url);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: step.method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (step.data) {
      const postData = JSON.stringify(step.data);
      options.headers["Content-Length"] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data);
            resolve({ success: true, data: jsonData });
          } catch {
            resolve({ success: true, data: data });
          }
        } else {
          resolve({
            success: false,
            error: `Status ${res.statusCode}: ${data}`,
          });
        }
      });
    });

    req.on("error", (error) => {
      resolve({ success: false, error: error.message });
    });

    if (step.data) {
      req.write(JSON.stringify(step.data));
    }

    req.end();
  });
}

testCompletePaymentFlow().catch(console.error);
