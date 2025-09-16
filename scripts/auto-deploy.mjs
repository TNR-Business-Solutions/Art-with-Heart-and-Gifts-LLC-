#!/usr/bin/env node

import { execSync } from "child_process";

console.log("🚀 Starting automated deployment process...");

try {
  // Step 1: Add all changes to git
  console.log("📝 Adding changes to git...");
  execSync("git add .", { stdio: "inherit" });

  // Step 2: Commit changes
  console.log("💾 Committing changes...");
  const commitMessage = `Auto-deploy: ${new Date().toISOString()}`;
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

  // Step 3: Push to GitHub
  console.log("📤 Pushing to GitHub...");
  execSync("git push origin main", { stdio: "inherit" });

  // Step 4: Wait for GitHub Actions to complete
  console.log("⏳ Waiting for GitHub Actions to complete...");
  console.log(
    "🔗 Check deployment status at: https://github.com/TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-/actions"
  );

  // Step 5: Deploy to Wix (local fallback)
  console.log("🚀 Deploying to Wix...");
  execSync("npm run deploy", { stdio: "inherit" });

  console.log("✅ Automated deployment completed successfully!");
  console.log("🌐 Your site should now be live on Wix!");
} catch (error) {
  console.error("❌ Automated deployment failed:", error.message);
  console.log("🔧 Please check the error and try again.");
  process.exit(1);
}
