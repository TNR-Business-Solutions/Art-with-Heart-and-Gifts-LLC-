// Gmail SMTP Email Service - EXACT Railway Configuration
// This will work with your specific Gmail credentials

const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.emailUser =
      process.env.EMAIL_USER || "artwithheartandgiftsllc@gmail.com";
    this.emailPass = process.env.EMAIL_PASS || "rwkgfjnrdscxtrdw"; // Removed spaces
    this.smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    this.smtpPort = parseInt(process.env.SMTP_PORT) || 587;
    this.smtpSecure = process.env.SMTP_SECURE === "true" ? true : false;
    this.smtpUser =
      process.env.SMTP_USER || "artwithheartandgiftsllc@gmail.com";
    this.smtpPass = process.env.SMTP_PASS || "rwkgfjnrdscxtrdw"; // Removed spaces

    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    if (!this.emailUser || !this.emailPass) {
      console.warn(
        "⚠️ Email credentials not configured. Email service disabled."
      );
      return;
    }

    try {
      // EXACT Gmail configuration for Railway
      this.transporter = nodemailer.createTransport({
        host: this.smtpHost,
        port: this.smtpPort,
        secure: this.smtpSecure, // false for port 587, true for 465
        auth: {
          user: this.emailUser,
          pass: this.emailPass,
        },
        // Railway-specific optimizations
        connectionTimeout: 30000, // 30 seconds
        greetingTimeout: 30000, // 30 seconds
        socketTimeout: 30000, // 30 seconds
        pool: false, // Disable pooling for Railway
        tls: {
          rejectUnauthorized: false,
          ciphers: "ALL",
          minVersion: "TLSv1.2",
        },
        // Gmail-specific settings
        requireTLS: true,
        debug: false,
        logger: false,
      });

      console.log("✅ Gmail email service configured successfully");
    } catch (error) {
      console.error("❌ Failed to initialize email transporter:", error);
    }
  }

  async sendCommissionInquiry(formData) {
    if (!this.transporter) {
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at artwithheartandgifts@yahoo.com",
      };
    }

    try {
      const { name, email, phone, projectType, budget, timeline, description } =
        formData;

      const mailOptions = {
        from: `"Art with Heart & Gifts Website" <${this.emailUser}>`,
        to: "artwithheartandgifts@yahoo.com",
        replyTo: email,
        subject: `New Commission Inquiry from ${name}`,
        html: `
          <h2>New Commission Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
          <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
          <p><strong>Description:</strong></p>
          <p>${description}</p>
          <hr>
          <p><em>Sent from Art with Heart & Gifts website</em></p>
        `,
        text: `
New Commission Inquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

Description:
${description}

---
Sent from Art with Heart & Gifts website
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Commission inquiry email sent:", info.messageId);

      return {
        success: true,
        message: "Commission inquiry sent successfully!",
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("❌ Commission inquiry email error:", error);
      return {
        success: false,
        error: "Failed to send commission inquiry. Please try again later.",
      };
    }
  }

  async sendContactForm(formData) {
    if (!this.transporter) {
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at artwithheartandgifts@yahoo.com",
      };
    }

    try {
      const { name, email, subject, message } = formData;

      const mailOptions = {
        from: `"Art with Heart & Gifts Website" <${this.emailUser}>`,
        to: "artwithheartandgifts@yahoo.com",
        replyTo: email,
        subject: `Contact Form: ${subject || "New Message"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "No subject"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><em>Sent from Art with Heart & Gifts website</em></p>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}

Message:
${message}

---
Sent from Art with Heart & Gifts website
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Contact form email sent:", info.messageId);

      return {
        success: true,
        message: "Message sent successfully!",
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("❌ Contact form email error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }
  }

  async sendTestEmail() {
    if (!this.transporter) {
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    try {
      const mailOptions = {
        from: `"Art with Heart & Gifts Website" <${this.emailUser}>`,
        to: "artwithheartandgifts@yahoo.com",
        subject: "Test Email from Art with Heart & Gifts",
        text: "This is a test email from the Art with Heart & Gifts website to verify email functionality.",
        html: "<p>This is a test email from the Art with Heart & Gifts website to verify email functionality.</p>",
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Test email sent:", info.messageId);

      return {
        success: true,
        message: "Test email sent successfully!",
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("❌ Test email error:", error);
      return {
        success: false,
        error: `Test email failed: ${error.message}`,
      };
    }
  }

  async sendSecureCheckout(orderData) {
    if (!this.transporter) {
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    try {
      const { customerInfo, orderItems, totalAmount } = orderData;

      const mailOptions = {
        from: `"Art with Heart & Gifts Website" <${this.emailUser}>`,
        to: "artwithheartandgifts@yahoo.com",
        subject: `New Order - ${customerInfo.name}`,
        html: `
          <h2>New Order Received</h2>
          <p><strong>Customer:</strong> ${customerInfo.name}</p>
          <p><strong>Email:</strong> ${customerInfo.email}</p>
          <p><strong>Phone:</strong> ${customerInfo.phone || "Not provided"}</p>
          <p><strong>Total Amount:</strong> $${totalAmount}</p>
          <h3>Order Items:</h3>
          <ul>
            ${orderItems
              .map((item) => `<li>${item.title} - $${item.price}</li>`)
              .join("")}
          </ul>
          <hr>
          <p><em>Sent from Art with Heart & Gifts website</em></p>
        `,
        text: `
New Order Received

Customer: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone || "Not provided"}
Total Amount: $${totalAmount}

Order Items:
${orderItems.map((item) => `- ${item.title} - $${item.price}`).join("\n")}

---
Sent from Art with Heart & Gifts website
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Order notification email sent:", info.messageId);

      return {
        success: true,
        message: "Order notification sent successfully!",
        messageId: info.messageId,
      };
    } catch (error) {
      console.error("❌ Order notification email error:", error);
      return {
        success: false,
        error: "Failed to send order notification",
      };
    }
  }
}

module.exports = EmailService;
