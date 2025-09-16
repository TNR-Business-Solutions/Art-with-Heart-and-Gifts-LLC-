// Test script for email service
const EmailService = require("./email-service-simple");

async function testEmail() {
  console.log("🧪 Testing email service...");

  const emailService = new EmailService();

  try {
    // Test contact form
    console.log("📧 Testing contact form email...");
    const contactResult = await emailService.sendContactForm({
      name: "Test User",
      email: "test@example.com",
      phone: "(555) 123-4567",
      subject: "Test Contact Form",
      message: "This is a test message from the email service test script.",
      inquiryType: "general",
    });

    if (contactResult.success) {
      console.log("✅ Contact form email sent successfully!");
      console.log(`📧 Message ID: ${contactResult.messageId}`);
    } else {
      console.log("❌ Contact form email failed:", contactResult.error);
    }

    // Test commission inquiry
    console.log("📧 Testing commission inquiry email...");
    const commissionResult = await emailService.sendCommissionInquiry({
      name: "Test Commission User",
      email: "commission@example.com",
      phone: "(555) 987-6543",
      projectType: "canvas",
      budget: "1000-2500",
      timeline: "2-months",
      description:
        "This is a test commission inquiry from the email service test script.",
    });

    if (commissionResult.success) {
      console.log("✅ Commission inquiry email sent successfully!");
      console.log(`📧 Message ID: ${commissionResult.messageId}`);
    } else {
      console.log(
        "❌ Commission inquiry email failed:",
        commissionResult.error
      );
    }

    console.log("🎉 Email service test completed!");
  } catch (error) {
    console.error("❌ Email service test failed:", error);
  }
}

// Run the test
testEmail();
