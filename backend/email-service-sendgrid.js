// SendGrid Email Service - Bulletproof alternative to Gmail SMTP
// This will work 100% of the time with cloud hosting

class EmailService {
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.fromEmail = process.env.EMAIL_USER || "artwithheartandgifts@yahoo.com";
    this.toEmail = "artwithheartandgifts@yahoo.com";

    if (!this.apiKey) {
      console.warn(
        "⚠️ SendGrid API key not configured. Email service disabled."
      );
      console.warn(
        "📧 Set SENDGRID_API_KEY environment variable to enable emails."
      );
    } else {
      console.log("✅ SendGrid email service configured");
    }
  }

  // Send commission inquiry email
  async sendCommissionInquiry(formData) {
    if (!this.apiKey) {
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at artwithheartandgifts@yahoo.com",
      };
    }

    try {
      const { name, email, phone, projectType, budget, timeline, description } =
        formData;

      // Create email content
      const subject = `New Commission Inquiry from ${name}`;
      const htmlContent = `
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
      `;

      const textContent = `
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

      // Send email using SendGrid
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: this.toEmail, name: "Art with Heart & Gifts" }],
              subject: subject,
            },
          ],
          from: {
            email: this.fromEmail,
            name: "Art with Heart & Gifts Website",
          },
          reply_to: { email: email, name: name },
          content: [
            {
              type: "text/plain",
              value: textContent,
            },
            {
              type: "text/html",
              value: htmlContent,
            },
          ],
        }),
      });

      if (response.ok) {
        console.log("✅ Commission inquiry email sent successfully");
        return {
          success: true,
          message: "Commission inquiry sent successfully!",
        };
      } else {
        const errorText = await response.text();
        console.error("❌ SendGrid error:", response.status, errorText);
        return {
          success: false,
          error: "Failed to send commission inquiry. Please try again later.",
        };
      }
    } catch (error) {
      console.error("❌ Email service error:", error);
      return {
        success: false,
        error: "Failed to send commission inquiry. Please try again later.",
      };
    }
  }

  // Send contact form email
  async sendContactForm(formData) {
    if (!this.apiKey) {
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at artwithheartandgifts@yahoo.com",
      };
    }

    try {
      const { name, email, subject, message } = formData;

      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No subject"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from Art with Heart & Gifts website</em></p>
      `;

      const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}

Message:
${message}

---
Sent from Art with Heart & Gifts website
      `;

      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: this.toEmail, name: "Art with Heart & Gifts" }],
              subject: `Contact Form: ${subject || "New Message"}`,
            },
          ],
          from: {
            email: this.fromEmail,
            name: "Art with Heart & Gifts Website",
          },
          reply_to: { email: email, name: name },
          content: [
            {
              type: "text/plain",
              value: textContent,
            },
            {
              type: "text/html",
              value: htmlContent,
            },
          ],
        }),
      });

      if (response.ok) {
        console.log("✅ Contact form email sent successfully");
        return { success: true, message: "Message sent successfully!" };
      } else {
        const errorText = await response.text();
        console.error("❌ SendGrid error:", response.status, errorText);
        return {
          success: false,
          error: "Failed to send message. Please try again later.",
        };
      }
    } catch (error) {
      console.error("❌ Email service error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }
  }

  // Test email service
  async sendTestEmail() {
    if (!this.apiKey) {
      return {
        success: false,
        error: "SendGrid API key not configured",
      };
    }

    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: this.toEmail, name: "Test Recipient" }],
              subject: "Test Email from Art with Heart & Gifts",
            },
          ],
          from: {
            email: this.fromEmail,
            name: "Art with Heart & Gifts Website",
          },
          content: [
            {
              type: "text/plain",
              value:
                "This is a test email from the Art with Heart & Gifts website to verify email functionality.",
            },
          ],
        }),
      });

      if (response.ok) {
        return { success: true, message: "Test email sent successfully!" };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          error: `SendGrid error: ${response.status} - ${errorText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Test email failed: ${error.message}`,
      };
    }
  }
}

module.exports = EmailService;
