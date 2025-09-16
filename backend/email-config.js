// Email Configuration for Art with Heart & Gifts
// This file contains the email service configuration

module.exports = {
  // Gmail SMTP Configuration
  emailUser: process.env.EMAIL_USER || "artwithheartandgiftsllc@gmail.com",
  emailPass: process.env.EMAIL_PASS || process.env.SMTP_PASS || "",

  // Recipient email (where contact forms are sent)
  recipientEmail: "artwithheartandgifts@yahoo.com",

  // Email service settings
  service: "gmail",

  // Test mode (set to true for testing)
  testMode: process.env.NODE_ENV === "development",
};
