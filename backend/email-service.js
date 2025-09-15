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
      greetingTimeout: 30000,   // 30 seconds
      socketTimeout: 60000,     // 60 seconds
      pool: true,
      maxConnections: 1,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      // Yahoo SMTP specific settings
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
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
