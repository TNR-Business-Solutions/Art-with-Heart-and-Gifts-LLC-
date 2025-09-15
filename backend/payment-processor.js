// Payment processor for Art with Heart & Gifts
// Handles multiple payment gateways with Swipe Simple as primary

const axios = require("axios");
const paymentConfig = require("./payment-config");

class PaymentProcessor {
  constructor() {
    this.config = paymentConfig;
    this.isTestMode = this.config.swipeSimple.testMode;
  }

  // Calculate order totals including tax and shipping
  calculateOrderTotals(items, shippingMethod = "standard") {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = this.getShippingCost(subtotal, shippingMethod);
    const tax = (subtotal + shipping) * this.config.settings.taxRate;
    const total = subtotal + shipping + tax;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      currency: this.config.settings.currency,
    };
  }

  getShippingCost(subtotal, shippingMethod) {
    // Free shipping over threshold
    if (subtotal >= this.config.settings.freeShippingThreshold) {
      return this.config.settings.shippingRates.free;
    }
    return (
      this.config.settings.shippingRates[shippingMethod] ||
      this.config.settings.shippingRates.standard
    );
  }

  // Create Swipe Simple payment link
  async createSwipeSimplePaymentLink(orderData) {
    try {
      const totals = this.calculateOrderTotals(
        orderData.items,
        orderData.shippingMethod
      );

      const paymentRequest = {
        merchant_id: this.config.swipeSimple.merchantId,
        amount: Math.round(totals.total * 100), // Amount in cents
        currency: totals.currency,
        description: `Art with Heart & Gifts - Order #${orderData.orderId}`,
        order_id: orderData.orderId,
        customer: {
          email: orderData.customer.email,
          name: orderData.customer.name,
          phone: orderData.customer.phone || "",
        },
        items: orderData.items.map((item) => ({
          name: item.title,
          quantity: item.quantity,
          price: Math.round(item.price * 100), // Price in cents
          total: Math.round(item.price * item.quantity * 100),
        })),
        return_url: this.config.swipeSimple.paymentLinkConfig.returnUrl,
        cancel_url: this.config.swipeSimple.paymentLinkConfig.cancelUrl,
        webhook_url: this.config.swipeSimple.paymentLinkConfig.webhookUrl,
        metadata: {
          order_id: orderData.orderId,
          customer_id: orderData.customer.email,
          items_count: orderData.items.length,
        },
      };

      console.log("Creating Swipe Simple payment link:", {
        orderId: orderData.orderId,
        amount: totals.total,
        testMode: this.isTestMode,
      });

      // For testing, we'll create a mock payment link
      if (this.isTestMode) {
        return this.createTestPaymentLink(orderData, totals);
      }

      // Real Swipe Simple API call
      const response = await axios.post(
        `${this.config.swipeSimple.baseUrl}/v1/payment-links`,
        paymentRequest,
        {
          headers: {
            Authorization: `Bearer ${this.config.swipeSimple.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        paymentUrl: response.data.payment_url,
        paymentId: response.data.id,
        expiresAt: response.data.expires_at,
      };
    } catch (error) {
      console.error("Swipe Simple payment link creation failed:", error);
      throw new Error("Failed to create payment link");
    }
  }

  // Create test payment link for development
  createTestPaymentLink(orderData, totals) {
    const testPaymentUrl = `http://localhost:5173/test-payment.html?order_id=${orderData.orderId}&amount=${totals.total}`;

    return {
      success: true,
      paymentUrl: testPaymentUrl,
      paymentId: `test_${Date.now()}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      testMode: true,
    };
  }

  // Verify Swipe Simple webhook
  async verifySwipeSimpleWebhook(payload, signature) {
    try {
      // In production, verify the webhook signature
      if (!this.isTestMode) {
        // Add webhook verification logic here
        // const crypto = require('crypto');
        // const expectedSignature = crypto
        //   .createHmac('sha256', this.config.swipeSimple.webhookSecret)
        //   .update(payload)
        //   .digest('hex');
        //
        // if (signature !== expectedSignature) {
        //   throw new Error('Invalid webhook signature');
        // }
      }

      return true;
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return false;
    }
  }

  // Process payment completion
  async processPaymentCompletion(paymentData) {
    try {
      const orderId = paymentData.metadata?.order_id;
      if (!orderId) {
        throw new Error("Order ID not found in payment data");
      }

      // Update order status based on payment result
      const orderUpdate = {
        paymentId: paymentData.id,
        paymentStatus: paymentData.status,
        paymentMethod: "swipe-simple",
        paidAt:
          paymentData.status === "completed" ? new Date().toISOString() : null,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        orderId: orderId,
        orderUpdate: orderUpdate,
        redirectUrl:
          paymentData.status === "completed"
            ? `${this.config.swipeSimple.paymentLinkConfig.returnUrl}?order_id=${orderId}&status=success`
            : `${this.config.swipeSimple.paymentLinkConfig.returnUrl}?order_id=${orderId}&status=failed`,
      };
    } catch (error) {
      console.error("Payment completion processing failed:", error);
      throw new Error("Failed to process payment completion");
    }
  }
}

module.exports = PaymentProcessor;
