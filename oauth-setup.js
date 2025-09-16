const { google } = require("googleapis");
const readline = require("readline");

// OAuth 2.0 credentials
const CLIENT_ID =
  "329899517891-6gorclrla0t1dn54394b1577n1cdgkhm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob"; // For out-of-band flow

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Scopes required for Gmail API
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.compose",
];

async function getRefreshToken() {
  try {
    // Generate the authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent", // Force consent screen to get refresh token
    });

    console.log("🔗 Authorization URL:");
    console.log(authUrl);
    console.log("\n📋 Instructions:");
    console.log("1. Copy the URL above and paste it in your browser");
    console.log(
      "2. Sign in with your Gmail account (artwithheartandgiftsllc@gmail.com)"
    );
    console.log("3. Grant the requested permissions");
    console.log("4. Copy the authorization code from the browser");
    console.log("5. Paste it here when prompted\n");

    // Create readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question("Enter the authorization code: ", async (code) => {
        try {
          // Exchange code for tokens
          const { tokens } = await oauth2Client.getToken(code);

          console.log("\n✅ Success! Here are your tokens:");
          console.log("Refresh Token:", tokens.refresh_token);
          console.log("Access Token:", tokens.access_token);

          // Test the token by making a simple Gmail API call
          oauth2Client.setCredentials(tokens);
          const gmail = google.gmail({ version: "v1", auth: oauth2Client });

          console.log("\n🧪 Testing Gmail API access...");
          const profile = await gmail.users.getProfile({ userId: "me" });
          console.log("✅ Gmail API test successful!");
          console.log("Email address:", profile.data.emailAddress);

          console.log("\n🚀 Add these to your Railway environment variables:");
          console.log("GOOGLE_CLIENT_ID=" + CLIENT_ID);
          console.log("GOOGLE_CLIENT_SECRET=" + CLIENT_SECRET);
          console.log("GOOGLE_REFRESH_TOKEN=" + tokens.refresh_token);

          rl.close();
          resolve(tokens);
        } catch (error) {
          console.error("❌ Error exchanging code for tokens:", error.message);
          rl.close();
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("❌ Error generating auth URL:", error.message);
    throw error;
  }
}

// Run the setup
getRefreshToken()
  .then(() => {
    console.log("\n🎉 OAuth setup complete! Your Gmail API is ready to use.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 OAuth setup failed:", error.message);
    process.exit(1);
  });
