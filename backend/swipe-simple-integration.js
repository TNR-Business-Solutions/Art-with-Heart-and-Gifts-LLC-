// Swipe Simple Integration Module
const axios = require("axios");

class SwipeSimpleIntegration {
  constructor() {
    this.apiKey = process.env.SWIPE_SIMPLE_API_KEY || "test-api-key";
    this.baseUrl =
      process.env.SWIPE_SIMPLE_BASE_URL || "https://api.swipesimple.com/v1";
    this.testMode = process.env.NODE_ENV !== "production";
  }

  // Import catalog items to Swipe Simple
  async importCatalog(items) {
    try {
      console.log(`Importing ${items.length} items to Swipe Simple catalog...`);

      const catalogItems = items.map((item) => ({
        name: item.title,
        description: item.alt || item.title,
        price: Math.round(item.price * 100), // Convert to cents
        sku: item.id,
        category: item.category || "Art",
        image_url: item.image,
        inventory_tracking: true,
        inventory_quantity: item.type === "original" ? 1 : 10,
        active: true,
      }));

      // In test mode, just log the items
      if (this.testMode) {
        console.log(
          "Test mode - Catalog items would be imported:",
          catalogItems.slice(0, 3)
        );
        return { success: true, imported: catalogItems.length };
      }

      // Production API call would go here
      const response = await axios.post(
        `${this.baseUrl}/catalog/items`,
        {
          items: catalogItems,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { success: true, imported: response.data.length };
    } catch (error) {
      console.error("Error importing catalog:", error.message);
      return { success: false, error: error.message };
    }
  }

  // Create payment link for an order
  async createPaymentLink(orderData) {
    try {
      const paymentData = {
        amount: Math.round(orderData.total * 100), // Convert to cents
        currency: "USD",
        description: `Order #${orderData.id}`,
        customer: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
        },
        items: orderData.items.map((item) => ({
          name: item.title,
          price: Math.round(item.price * 100),
          quantity: item.quantity,
          sku: item.id,
        })),
        return_url: `${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }/order-success.html`,
        cancel_url: `${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }/shop.html`,
        webhook_url: `${
          process.env.BACKEND_URL || "http://localhost:3001"
        }/api/webhooks/swipe-simple`,
      };

      // In test mode, return a test payment URL
      if (this.testMode) {
        const testUrl = `https://test.swipesimple.com/pay/${orderData.id}?amount=${paymentData.amount}`;
        console.log("Test mode - Payment link created:", testUrl);
        return { success: true, payment_url: testUrl };
      }

      // Production API call
      const response = await axios.post(
        `${this.baseUrl}/payment-links`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { success: true, payment_url: response.data.payment_url };
    } catch (error) {
      console.error("Error creating payment link:", error.message);
      return { success: false, error: error.message };
    }
  }

  // Verify webhook signature
  verifyWebhook(payload, signature) {
    // In production, verify the webhook signature
    // For now, just return true in test mode
    return this.testMode || this.verifySignature(payload, signature);
  }

  verifySignature(payload, signature) {
    // Implement actual signature verification
    // This would use HMAC-SHA256 with your webhook secret
    return true; // Placeholder
  }

  // Process webhook notification
  async processWebhook(webhookData) {
    try {
      const { order_id, status, transaction_id, amount } = webhookData;

      console.log("Processing Swipe Simple webhook:", {
        order_id,
        status,
        transaction_id,
        amount: amount / 100, // Convert from cents
      });

      // Update order status in your database
      // This would typically update your orders table

      return { success: true, processed: true };
    } catch (error) {
      console.error("Error processing webhook:", error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SwipeSimpleIntegration;


