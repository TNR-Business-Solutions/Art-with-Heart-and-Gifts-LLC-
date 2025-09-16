// Gmail API Email Service - BYPASSES RAILWAY SMTP BLOCKING
// Uses Gmail API instead of SMTP - works with Railway hosting

const { google } = require("googleapis");

class EmailService {
  constructor() {
    this.emailUser =
      process.env.EMAIL_USER || "artwithheartandgiftsllc@gmail.com";
    this.emailPass = process.env.EMAIL_PASS || "rwkgfjnrdscxtrdw";
    this.clientId = process.env.GOOGLE_CLIENT_ID || "";
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    this.refreshToken = process.env.GOOGLE_REFRESH_TOKEN || "";

    this.gmail = null;
    this.initializeGmailAPI();
  }

  initializeGmailAPI() {
    if (!this.emailUser || !this.emailPass) {
      console.warn(
        "⚠️ Email credentials not configured. Email service disabled."
      );
      return;
    }

    try {
      // Use Gmail API with OAuth2
      const oauth2Client = new google.auth.OAuth2(
        this.clientId,
        this.clientSecret,
        "urn:ietf:wg:oauth:2.0:oob"
      );

      oauth2Client.setCredentials({
        refresh_token: this.refreshToken,
      });

      this.gmail = google.gmail({ version: "v1", auth: oauth2Client });
      console.log("✅ Gmail API email service configured successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Gmail API:", error);
      // Fallback to simple email forwarding
      console.log("📧 Using fallback email forwarding method");
    }
  }

  async sendCommissionInquiry(formData) {
    try {
      const { name, email, phone, projectType, budget, timeline, description } =
        formData;

      const emailContent = `
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
      `;

      // Try Gmail API first
      if (this.gmail) {
        await this.sendViaGmailAPI(
          emailContent,
          `New Commission Inquiry from ${name}`,
          email
        );
      } else {
        // Fallback: Use webhook to external service
        await this.sendViaWebhook("commission", formData);
      }

      console.log("✅ Commission inquiry email sent successfully");
      return {
        success: true,
        message: "Commission inquiry sent successfully!",
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
    try {
      const { name, email, subject, message } = formData;

      const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}

Message:
${message}

---
Sent from Art with Heart & Gifts website
      `;

      // Try Gmail API first
      if (this.gmail) {
        await this.sendViaGmailAPI(
          emailContent,
          `Contact Form: ${subject || "New Message"}`,
          email
        );
      } else {
        // Fallback: Use webhook to external service
        await this.sendViaWebhook("contact", formData);
      }

      console.log("✅ Contact form email sent successfully");
      return {
        success: true,
        message: "Message sent successfully!",
      };
    } catch (error) {
      console.error("❌ Contact form email error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }
  }

  async sendViaGmailAPI(content, subject, replyTo) {
    if (!this.gmail) throw new Error("Gmail API not initialized");

    const message = [
      `To: artwithheartandgifts@yahoo.com`,
      `From: ${this.emailUser}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      content,
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await this.gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  }

  async sendViaWebhook(type, data) {
    // Use a webhook service to send emails
    const webhookUrl = "https://api.emailjs.com/api/v1.0/email/send";
    const serviceId = process.env.EMAILJS_SERVICE_ID || "service_artwithheart";
    const templateId =
      type === "commission" ? "template_commission" : "template_contact";
    const userId = process.env.EMAILJS_USER_ID || "your_user_id";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        template_params: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }
  }

  async sendTestEmail() {
    try {
      const content =
        "This is a test email from the Art with Heart & Gifts website to verify email functionality.";

      if (this.gmail) {
        await this.sendViaGmailAPI(
          content,
          "Test Email from Art with Heart & Gifts",
          this.emailUser
        );
      } else {
        await this.sendViaWebhook("test", { message: content });
      }

      return {
        success: true,
        message: "Test email sent successfully!",
      };
    } catch (error) {
      return {
        success: false,
        error: `Test email failed: ${error.message}`,
      };
    }
  }

  async sendSecureCheckout(orderData) {
    try {
      const { customerInfo, orderItems, totalAmount } = orderData;

      const emailContent = `
New Order Received

Customer: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone || "Not provided"}
Total Amount: $${totalAmount}

Order Items:
${orderItems.map((item) => `- ${item.title} - $${item.price}`).join("\n")}

---
Sent from Art with Heart & Gifts website
      `;

      if (this.gmail) {
        await this.sendViaGmailAPI(
          emailContent,
          `New Order - ${customerInfo.name}`,
          customerInfo.email
        );
      } else {
        await this.sendViaWebhook("order", orderData);
      }

      return {
        success: true,
        message: "Order notification sent successfully!",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to send order notification",
      };
    }
  }
}

module.exports = EmailService;
