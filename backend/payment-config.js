// Payment configuration for Art with Heart & Gifts
// This supports multiple payment gateways including Swipe Simple

const paymentConfig = {
  // Swipe Simple Configuration
  swipeSimple: {
    // Test/Sandbox credentials - replace with live credentials for production
    testMode: true,
    merchantId: process.env.SWIPE_SIMPLE_MERCHANT_ID || "test_merchant_123",
    apiKey: process.env.SWIPE_SIMPLE_API_KEY || "test_api_key_456",
    baseUrl: process.env.SWIPE_SIMPLE_BASE_URL || "https://api.swipesimple.com",
    webhookSecret:
      process.env.SWIPE_SIMPLE_WEBHOOK_SECRET || "test_webhook_secret",

    // Payment link configuration
    paymentLinkConfig: {
      currency: "USD",
      returnUrl:
        process.env.RETURN_URL || "http://localhost:5173/order-success.html",
      cancelUrl: process.env.CANCEL_URL || "http://localhost:5173/cart.html",
      webhookUrl:
        process.env.WEBHOOK_URL ||
        "http://localhost:3001/api/webhooks/swipe-simple",
    },
  },

  // Stripe Configuration (backup option)
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "pk_test_...",
    secretKey: process.env.STRIPE_SECRET_KEY || "sk_test_...",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "whsec_...",
  },

  // PayPal Configuration (backup option)
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || "",
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
    mode: process.env.PAYPAL_MODE || "sandbox", // sandbox or live
  },

  // General payment settings
  settings: {
    currency: "USD",
    taxRate: 0.06, // 6% Florida tax
    shippingRates: {
      standard: 8.99,
      express: 15.99,
      free: 0, // Free shipping over $75
    },
    freeShippingThreshold: 75.0,
  },
};

module.exports = paymentConfig;
