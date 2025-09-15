// Email service for Art with Heart & Gifts
// Handles contact form submissions and sends emails to artwithheartandgifts@yahoo.com

const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    // Using a simple SMTP configuration optimized for Yahoo
    // In production, you would use a proper email service like SendGrid, Mailgun, or AWS SES
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mail.yahoo.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
      // Add timeout and connection settings for Yahoo SMTP
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
      pool: true,
      maxConnections: 1,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      // Yahoo SMTP specific settings
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    this.recipientEmail = "artwithheartandgifts@yahoo.com";
  }

  // Send contact form email
  async sendContactForm(formData) {
    try {
      const { name, email, phone, subject, message, inquiryType } = formData;

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: this.recipientEmail,
        subject: `Contact Form: ${subject || "New Inquiry"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530;">New Contact Form Submission</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c5530;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${
                phone
                  ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>`
                  : ""
              }
              ${
                inquiryType
                  ? `<p><strong>Inquiry Type:</strong> ${inquiryType}</p>`
                  : ""
              }
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #2c5530;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; font-size: 14px; color: #2c5530;">
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Source:</strong> Art with Heart & Gifts Website</p>
            </div>
          </div>
        `,
        text: `
Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${inquiryType ? `Inquiry Type: ${inquiryType}` : ""}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
Source: Art with Heart & Gifts Website
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Contact form email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        message: "Email sent successfully",
      };
    } catch (error) {
      console.error("Error sending contact form email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send commission inquiry email
  async sendCommissionInquiry(formData) {
    try {
      const { name, email, phone, projectType, budget, timeline, description } =
        formData;

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: this.recipientEmail,
        subject: `Commission Inquiry: ${projectType || "New Project"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530;">New Commission Inquiry</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c5530;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${
                phone
                  ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>`
                  : ""
              }
            </div>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c5530;">Project Details</h3>
              <p><strong>Project Type:</strong> ${
                projectType || "Not specified"
              }</p>
              <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
              <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #2c5530;">Project Description</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${description}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; font-size: 14px; color: #2c5530;">
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Source:</strong> Art with Heart & Gifts Website</p>
            </div>
          </div>
        `,
        text: `
Commission Inquiry

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Project Type: ${projectType || "Not specified"}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

Description:
${description}

Submitted: ${new Date().toLocaleString()}
Source: Art with Heart & Gifts Website
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Commission inquiry email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        message: "Commission inquiry sent successfully",
      };
    } catch (error) {
      console.error("Error sending commission inquiry email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send secure checkout email to admin
  async sendSecureCheckout(orderData) {
    try {
      const { orderId, customer, payment, order, totals } = orderData;
      
      const mailOptions = {
        from: process.env.SMTP_USER || process.env.EMAIL_USER,
        to: this.recipientEmail,
        subject: `🚨 SECURE CHECKOUT - Order ${orderId} - ${customer.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <h2 style="color: #e74c3c; text-align: center;">🚨 SECURE CHECKOUT ORDER</h2>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0;">⚠️ MANUAL PAYMENT PROCESSING REQUIRED</h3>
              <p style="color: #856404; margin-bottom: 0;">This order requires manual payment processing in your Swipe Simple Virtual Terminal.</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">📋 Order Information</h3>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Timestamp:</strong> ${orderData.timestamp}</p>
              <p><strong>Status:</strong> Pending Payment Processing</p>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">👤 Customer Information</h3>
              <p><strong>Name:</strong> ${customer.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${customer.phone}">${customer.phone}</a></p>
              <p><strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} ${customer.zipCode}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">💳 Payment Information (VIRTUAL TERMINAL)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #fff;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Cardholder Name:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${payment.cardholderName}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Credit Card Number:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${payment.cardNumber}</td>
                </tr>
                <tr style="background: #fff;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Expiration Date:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${payment.expirationDate}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">CVV:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${payment.cvv}</td>
                </tr>
                <tr style="background: #fff;">
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Save Card:</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">${payment.saveCard ? 'Yes' : 'No'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">🛒 Order Items</h3>
              ${order.items.map(item => `
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2c5530;">
                  <p style="margin: 0; font-weight: bold;">${item.title}</p>
                  <p style="margin: 5px 0; color: #666;">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              `).join('')}
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin-top: 0;">💰 Payment Amount (VIRTUAL TERMINAL)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Subtotal:</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${totals.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tax (6%):</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${totals.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Shipping:</td>
                  <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}</td>
                </tr>
                <tr style="background: #2c5530; color: white;">
                  <td style="padding: 15px; border: 1px solid #ddd; font-weight: bold; font-size: 18px;">TOTAL AMOUNT:</td>
                  <td style="padding: 15px; border: 1px solid #ddd; text-align: right; font-size: 18px; font-weight: bold;">$${totals.total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            
            ${order.specialInstructions ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">📝 Special Instructions</h3>
              <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px;">${order.specialInstructions}</p>
            </div>
            ` : ''}
            
            ${order.referenceNumber ? `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">🔖 Reference Number</h3>
              <p style="font-weight: bold; background: white; padding: 15px; border-radius: 5px;">${order.referenceNumber}</p>
            </div>
            ` : ''}
            
            <div style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h3 style="margin-top: 0;">🚨 ACTION REQUIRED</h3>
              <p style="margin-bottom: 0; font-size: 16px;">
                <strong>1. Log into Swipe Simple Virtual Terminal</strong><br>
                <strong>2. Process payment with the information above</strong><br>
                <strong>3. Update order status to "paid"</strong><br>
                <strong>4. Process and ship the order</strong>
              </p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; font-size: 14px; color: #2c5530;">
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Submitted:</strong> ${orderData.timestamp}</p>
              <p><strong>Source:</strong> Art with Heart & Gifts Website - Secure Checkout</p>
            </div>
          </div>
        `,
        text: `
SECURE CHECKOUT ORDER - ${orderId}

⚠️ MANUAL PAYMENT PROCESSING REQUIRED

Order Information:
- Order ID: ${orderId}
- Timestamp: ${orderData.timestamp}
- Status: Pending Payment Processing

Customer Information:
- Name: ${customer.name}
- Email: ${customer.email}
- Phone: ${customer.phone}
- Address: ${customer.address}, ${customer.city}, ${customer.state} ${customer.zipCode}

Payment Information (VIRTUAL TERMINAL):
- Cardholder Name: ${payment.cardholderName}
- Credit Card Number: ${payment.cardNumber}
- Expiration Date: ${payment.expirationDate}
- CVV: ${payment.cvv}
- Save Card: ${payment.saveCard ? 'Yes' : 'No'}

Order Items:
${order.items.map(item => `- ${item.title} (Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)})`).join('\n')}

Payment Amount (VIRTUAL TERMINAL):
- Subtotal: $${totals.subtotal.toFixed(2)}
- Tax (6%): $${totals.tax.toFixed(2)}
- Shipping: ${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}
- TOTAL AMOUNT: $${totals.total.toFixed(2)}

${order.specialInstructions ? `Special Instructions: ${order.specialInstructions}\n` : ''}
${order.referenceNumber ? `Reference Number: ${order.referenceNumber}\n` : ''}

🚨 ACTION REQUIRED:
1. Log into Swipe Simple Virtual Terminal
2. Process payment with the information above
3. Update order status to "paid"
4. Process and ship the order

Source: Art with Heart & Gifts Website - Secure Checkout
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Secure checkout email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        message: "Secure checkout email sent successfully",
      };
    } catch (error) {
      console.error("Error sending secure checkout email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send order confirmation email to customer
  async sendOrderConfirmation(customerEmail, orderData) {
    try {
      const { orderId, customer, order, totals } = orderData;
      
      const mailOptions = {
        from: process.env.SMTP_USER || process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Order Confirmation - ${orderId} - Art with Heart & Gifts`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530; text-align: center;">Order Confirmation</h2>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">✅ Order Received</h3>
              <p>Thank you for your order! We have received your payment information and will process your payment shortly.</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Order Date:</strong> ${orderData.timestamp}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">📋 Order Summary</h3>
              ${order.items.map(item => `
                <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
                  <p style="margin: 0; font-weight: bold;">${item.title}</p>
                  <p style="margin: 5px 0; color: #666;">Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              `).join('')}
              
              <div style="background: #2c5530; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Subtotal:</span>
                  <span>$${totals.subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Tax (6%):</span>
                  <span>$${totals.tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Shipping:</span>
                  <span>${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0 0 0; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); font-weight: bold; font-size: 18px;">
                  <span>Total:</span>
                  <span>$${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c5530; margin-top: 0;">📧 What Happens Next?</h3>
              <ol>
                <li>We will process your payment securely</li>
                <li>Your artwork will be prepared with care</li>
                <li>You will receive shipping confirmation with tracking information</li>
                <li>Your order will arrive within 3-5 business days</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p><strong>Questions?</strong></p>
              <p>Email: <a href="mailto:artwithheartandgifts@yahoo.com">artwithheartandgifts@yahoo.com</a></p>
              <p>Phone: <a href="tel:(239)878-9849">(239) 878-9849</a></p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 14px; color: #666; text-align: center;">
              <p><strong>Thank you for supporting Art with Heart & Gifts!</strong></p>
              <p>Order ID: ${orderId}</p>
            </div>
          </div>
        `,
        text: `
Order Confirmation - ${orderId}

✅ Order Received

Thank you for your order! We have received your payment information and will process your payment shortly.

Order Information:
- Order ID: ${orderId}
- Order Date: ${orderData.timestamp}

Order Summary:
${order.items.map(item => `- ${item.title} (Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)})`).join('\n')}

Payment Summary:
- Subtotal: $${totals.subtotal.toFixed(2)}
- Tax (6%): $${totals.tax.toFixed(2)}
- Shipping: ${totals.shipping === 0 ? 'FREE' : '$' + totals.shipping.toFixed(2)}
- Total: $${totals.total.toFixed(2)}

What Happens Next?
1. We will process your payment securely
2. Your artwork will be prepared with care
3. You will receive shipping confirmation with tracking information
4. Your order will arrive within 3-5 business days

Questions?
Email: artwithheartandgifts@yahoo.com
Phone: (239) 878-9849

Thank you for supporting Art with Heart & Gifts!
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Order confirmation email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        message: "Order confirmation email sent successfully",
      };
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Test email service
  async testEmailService() {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || process.env.EMAIL_USER,
        to: this.recipientEmail,
        subject: "Email Service Test - Art with Heart & Gifts",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c5530;">Email Service Test</h2>
            <p>This is a test email to verify that the email service is working correctly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Service:</strong> Art with Heart & Gifts Backend</p>
          </div>
        `,
        text: `Email Service Test\n\nThis is a test email to verify that the email service is working correctly.\n\nTimestamp: ${new Date().toLocaleString()}\nService: Art with Heart & Gifts Backend`,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Test email sent:", info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        message: "Test email sent successfully",
      };
    } catch (error) {
      console.error("Error sending test email:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = EmailService;
