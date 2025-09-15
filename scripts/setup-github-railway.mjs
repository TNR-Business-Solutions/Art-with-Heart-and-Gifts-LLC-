import fs from "fs/promises";
import { execSync } from "child_process";

async function setupGitHubRailway() {
  console.log("🚀 Setting up GitHub Repository for Railway Deployment");
  console.log("=".repeat(60));

  try {
    // Initialize git repository
    console.log("📁 Initializing Git repository...");
    execSync("git init", { stdio: "pipe" });
    console.log("✅ Git repository initialized");

    // Create .gitignore
    const gitignore = `# Dependencies
node_modules/
backend/node_modules/

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/

# Logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Deployment folders
backend-deploy/
railway-deploy/
quick-deploy/
`;

    await fs.writeFile(".gitignore", gitignore);
    console.log("✅ Created .gitignore file");

    // Add all files
    console.log("📋 Adding files to git...");
    execSync("git add .", { stdio: "pipe" });
    console.log("✅ Files added to git");

    // Create initial commit
    console.log("💾 Creating initial commit...");
    execSync('git commit -m "Initial commit: Art with Heart & Gifts website with backend"', { stdio: "pipe" });
    console.log("✅ Initial commit created");

    // Create README for GitHub
    const readme = `# Art with Heart & Gifts

Beautiful handmade artwork by Charmin - original paintings and prints available for purchase.

## 🌟 Features

- **135 Products:** 25 originals + 110 prints
- **Gallery:** 86 items showcasing Charmin's artwork
- **E-commerce:** Full shopping cart and checkout
- **Payment Processing:** Swipe Simple Payment Links integration
- **Responsive Design:** Works on all devices

## 🚀 Live Site

- **Frontend:** https://artwithheartandgifts.com (Netlify)
- **Backend:** https://your-railway-app.railway.app (Railway)

## 🛠 Technology Stack

- **Frontend:** Vite + Vanilla JavaScript
- **Backend:** Node.js + Express
- **Payment:** Swipe Simple Payment Links
- **Hosting:** Netlify (frontend) + Railway (backend)

## 📁 Project Structure

\`\`\`
artwithheartandgifts/
├── src/                    # Frontend source code
├── backend/               # Backend server code
├── public/               # Static assets (images)
├── dist/                 # Built frontend files
├── data.json             # Product data
├── data-gallery.json     # Gallery data
└── railway.json          # Railway deployment config
\`\`\`

## 🚀 Deployment

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Set Root Directory to \`backend\`
3. Add environment variables
4. Deploy!

### Frontend (Netlify)
1. Build with \`npm run build\`
2. Upload \`dist/\` folder to Netlify
3. Configure custom domain

## 💳 Payment Integration

- **Provider:** Swipe Simple Payment Links
- **Tax Rate:** 7% (6% FL state + 1% Pasco County)
- **Webhook:** Configured for order processing

## 📊 Statistics

- **Products:** 135 total
- **Images:** 151 optimized images
- **Revenue Potential:** $2,053 across all products
- **Pages:** 13 HTML pages

## 🔧 Development

\`\`\`bash
# Install dependencies
npm install
cd backend && npm install

# Start development servers
npm run dev:full  # Starts both frontend and backend

# Build for production
npm run build
\`\`\`

## 📞 Contact

For custom commissions or questions, visit our [contact page](https://artwithheartandgifts.com/contact.html).

---

**Art with Heart & Gifts** - Bringing beauty and joy through handmade artwork.
`;

    await fs.writeFile("README.md", readme);
    console.log("✅ Created README.md");

    // Add README to git
    execSync("git add README.md", { stdio: "pipe" });
    execSync('git commit -m "Add README and project documentation"', { stdio: "pipe" });

    console.log("\n🎉 GITHUB REPOSITORY READY!");
    console.log("\n📋 Next Steps:");
    console.log("1. Go to: https://github.com/TNR-Business-Solutions");
    console.log("2. Create new repository: 'Art-with-Heart-and-Gifts-LLC-'");
    console.log("3. Copy the repository URL");
    console.log("4. Run these commands:");
    console.log("   git remote add origin https://github.com/TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-.git");
    console.log("   git branch -M main");
    console.log("   git push -u origin main");
    console.log("5. Go to Railway.app and deploy from GitHub");

    console.log("\n🚀 RAILWAY DEPLOYMENT:");
    console.log("- Repository: TNR-Business-Solutions/Art-with-Heart-and-Gifts-LLC-");
    console.log("- Backend location: /backend folder");
    console.log("- Config file: railway.json (ready)");

    console.log("\n📁 Files ready for GitHub:");
    console.log("- All project files committed");
    console.log("- README.md created");
    console.log("- .gitignore configured");
    console.log("- railway.json for Railway deployment");

  } catch (error) {
    console.error("❌ Error setting up GitHub repository:", error);
    console.log("\n🔧 Manual setup required:");
    console.log("1. Create repository on GitHub first");
    console.log("2. Then run: git remote add origin <your-repo-url>");
    console.log("3. Push to GitHub");
  }
}

setupGitHubRailway().catch(console.error);
