const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const PaymentProcessor = require("./payment-processor");
const SwipeSimpleLiveIntegration = require("./swipe-simple-live-integration");
const EmailService = require("./email-service");

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize payment processor, Swipe Simple integration, and email service
const paymentProcessor = new PaymentProcessor();
const swipeSimple = new SwipeSimpleLiveIntegration();
const emailService = new EmailService();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Serve static files from public directory for development
app.use(express.static(path.join(__dirname, "../public")));

// Data storage (in production, use a real database)
const dataDir = path.join(__dirname, "data");
const ordersFile = path.join(dataDir, "orders.json");
const inventoryFile = path.join(dataDir, "inventory.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error("Error creating data directory:", error);
  }
}

// Initialize data files
async function initializeData() {
  await ensureDataDir();

  // Initialize orders file if it doesn't exist
  try {
    await fs.access(ordersFile);
  } catch {
    await fs.writeFile(ordersFile, JSON.stringify([], null, 2));
  }

  // Initialize inventory file if it doesn't exist
  try {
    await fs.access(inventoryFile);
  } catch {
    // Load inventory from the main data.json file
    const mainDataFile = path.join(__dirname, "../data.json");
    const mainData = JSON.parse(await fs.readFile(mainDataFile, "utf8"));

    const inventory = mainData
      .filter((item) => item.price > 0)
      .map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        stock: item.type === "original" ? 1 : 10,
        type: item.type,
      }));

    await fs.writeFile(inventoryFile, JSON.stringify(inventory, null, 2));
  }
}

// API Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(inventoryFile, "utf8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(inventoryFile, "utf8");
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error reading product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create order
app.post("/api/orders", async (req, res) => {
  try {
    const { items, customer, shippingMethod = "standard" } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items are required" });
    }

    if (!customer || !customer.name || !customer.email) {
      return res
        .status(400)
        .json({ error: "Customer information is required" });
    }

    // Check inventory
    const inventoryData = await fs.readFile(inventoryFile, "utf8");
    const inventory = JSON.parse(inventoryData);

    for (const item of items) {
      const product = inventory.find((p) => p.id === item.id);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.id} not found` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${product.title}` });
      }
    }

    // Calculate totals using payment processor
    const totals = paymentProcessor.calculateOrderTotals(items, shippingMethod);
    const orderId = uuidv4();

    // Create order
    const order = {
      id: orderId,
      items,
      customer,
      totals,
      shippingMethod,
      paymentMethod: "swipe-simple",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save order
    const ordersData = await fs.readFile(ordersFile, "utf8");
    const orders = JSON.parse(ordersData);
    orders.push(order);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

    // Create Swipe Simple payment link
    const paymentResult = await swipeSimple.createPaymentLink(order);

    // If automatic link creation fails, provide manual instructions
    if (!paymentResult.success) {
      const manualInstructions = swipeSimple.getManualLinkInstructions(order);
      return res.json({
        success: true,
        orderId: order.id,
        totals: totals,
        paymentUrl: null,
        manualInstructions: manualInstructions,
        message: "Order created. Manual payment link required.",
        testMode: true,
      });
    }

    // Update inventory
    for (const item of items) {
      const product = inventory.find((p) => p.id === item.id);
      product.stock -= item.quantity;
    }
    await fs.writeFile(inventoryFile, JSON.stringify(inventory, null, 2));

    // Return order with payment link
    res.json({
      success: true,
      orderId: order.id,
      totals: totals,
      paymentUrl: paymentResult.payment_url,
      paymentId: paymentResult.payment_id,
      testMode: paymentResult.testMode || false,
      message:
        paymentResult.instructions ||
        "Order created successfully. Please complete payment.",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const data = await fs.readFile(ordersFile, "utf8");
    const orders = JSON.parse(data);
    const order = orders.find((o) => o.id === req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error reading order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const data = await fs.readFile(ordersFile, "utf8");
    const orders = JSON.parse(data);
    res.json(orders);
  } catch (error) {
    console.error("Error reading orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Swipe Simple Integration Endpoints

// Import catalog to Swipe Simple
app.post("/api/swipe-simple/import-catalog", async (req, res) => {
  try {
    const data = await fs.readFile(inventoryFile, "utf8");
    const products = JSON.parse(data);

    const result = await swipeSimple.importCatalog(products);

    res.json({
      success: result.success,
      imported: result.imported,
      message: result.success
        ? `Successfully imported ${result.imported} items to Swipe Simple`
        : `Failed to import catalog: ${result.error}`,
    });
  } catch (error) {
    console.error("Error importing catalog:", error);
    res.status(500).json({ error: "Failed to import catalog" });
  }
});

// Swipe Simple webhook handler
app.post("/api/webhooks/swipe-simple", async (req, res) => {
  try {
    const webhookData = req.body;
    const signature = req.headers["x-swipe-signature"];

    // Verify webhook signature
    if (!swipeSimple.verifyWebhook(JSON.stringify(webhookData), signature)) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    // Process webhook
    const result = await swipeSimple.processWebhook(webhookData);

    if (result.success) {
      // Update order status in database
      const ordersData = await fs.readFile(ordersFile, "utf8");
      const orders = JSON.parse(ordersData);
      const order = orders.find((o) => o.id === webhookData.order_id);

      if (order) {
        order.status = webhookData.status === "completed" ? "paid" : "failed";
        order.paymentId = webhookData.transaction_id;
        order.updatedAt = new Date().toISOString();

        await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
        console.log(`Order ${order.id} status updated to ${order.status}`);
      }

      res.json({ success: true, processed: true });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Failed to process webhook" });
  }
});

// Get Swipe Simple configuration
app.get("/api/swipe-simple/config", (req, res) => {
  res.json({
    testMode: swipeSimple.testMode,
    baseUrl: swipeSimple.baseUrl,
    features: {
      catalogImport: true,
      paymentLinks: true,
      webhooks: true,
    },
  });
});

// Secure checkout endpoint
app.post("/api/secure-checkout", async (req, res) => {
  try {
    const { customer, payment, order } = req.body;
    
    // Validate required fields
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({
        success: false,
        error: "Customer name, email, and phone are required"
      });
    }
    
    if (!payment?.cardholderName || !payment?.cardNumber || !payment?.expirationDate || !payment?.cvv) {
      return res.status(400).json({
        success: false,
        error: "All payment fields are required"
      });
    }
    
    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Prepare order data for email
    const orderData = {
      orderId: orderId,
      timestamp: new Date().toLocaleString(),
      customer: customer,
      payment: payment,
      order: order,
      totals: order.totals
    };
    
    // Send secure checkout email to admin
    const emailResult = await emailService.sendSecureCheckout(orderData);
    
    if (emailResult.success) {
      // Save order to database
      const ordersData = await fs.readFile(ordersFile, "utf8");
      const orders = JSON.parse(ordersData);
      
      const newOrder = {
        id: orderId,
        customer: customer,
        payment: payment,
        items: order.items,
        totals: order.totals,
        status: "pending_payment",
        createdAt: new Date().toISOString(),
        specialInstructions: order.specialInstructions,
        referenceNumber: order.referenceNumber
      };
      
      orders.push(newOrder);
      await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
      
      // Send confirmation email to customer
      await emailService.sendOrderConfirmation(customer.email, orderData);
      
      res.json({
        success: true,
        orderId: orderId,
        message: "Order submitted successfully. You will receive a confirmation email shortly."
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send order notification"
      });
    }
    
  } catch (error) {
    console.error("Secure checkout error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process secure checkout"
    });
  }
});

// Email endpoints
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message, inquiryType } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, and message are required"
      });
    }
    
    const result = await emailService.sendContactForm({
      name,
      email,
      phone,
      subject,
      message,
      inquiryType
    });
    
    if (result.success) {
      res.json({
        success: true,
        message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send email. Please try again later."
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

app.post("/api/commission", async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, timeline, description } = req.body;
    
    // Validate required fields
    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, and project description are required"
      });
    }
    
    const result = await emailService.sendCommissionInquiry({
      name,
      email,
      phone,
      projectType,
      budget,
      timeline,
      description
    });
    
    if (result.success) {
      res.json({
        success: true,
        message: "Your commission inquiry has been sent successfully! We'll get back to you within 24 hours to discuss your project.",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send commission inquiry. Please try again later."
      });
    }
  } catch (error) {
    console.error("Commission inquiry error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

app.post("/api/email/test", async (req, res) => {
  try {
    const result = await emailService.testEmailService();
    
    if (result.success) {
      res.json({
        success: true,
        message: "Test email sent successfully",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error("Email test error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send test email"
    });
  }
});

// Serve static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Start server
async function startServer() {
  await initializeData();
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);
