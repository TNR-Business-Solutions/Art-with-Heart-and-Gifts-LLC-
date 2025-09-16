// Emergency Frontend Deployment to Railway
// Moves frontend from Netlify to Railway due to credit limits

import fs from "fs";

console.log("🚨 EMERGENCY: Moving frontend from Netlify to Railway...");

// Copy all built files to a Railway-ready structure
const railwayDir = "railway-frontend-deploy";

// Clean and create directory
if (fs.existsSync(railwayDir)) {
  fs.rmSync(railwayDir, { recursive: true });
}
fs.mkdirSync(railwayDir);

// Copy dist folder contents
console.log("📁 Copying built frontend files...");
fs.cpSync("dist", `${railwayDir}/public`, { recursive: true });

// Create a simple Express server to serve static files
const serverContent = `// Static file server for Railway
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(\`🚀 Frontend server running on port \${port}\`);
  console.log(\`📱 Public URL: https://your-app.up.railway.app\`);
});
`;

fs.writeFileSync(`${railwayDir}/server.js`, serverContent);

// Create package.json for Railway
const packageJson = {
  name: "artwithheartandgifts-frontend",
  version: "1.0.0",
  description: "Art with Heart & Gifts Frontend - Emergency Railway Deploy",
  main: "server.js",
  scripts: {
    start: "node server.js",
  },
  dependencies: {
    express: "^4.18.2",
  },
  engines: {
    node: ">=18.0.0",
  },
};

fs.writeFileSync(
  `${railwayDir}/package.json`,
  JSON.stringify(packageJson, null, 2)
);

// Create Railway config
const railwayConfig = {
  $schema: "https://railway.com/railway.schema.json",
  build: {
    builder: "RAILPACK",
  },
  deploy: {
    runtime: "V2",
    numReplicas: 1,
    sleepApplication: false,
    restartPolicyType: "ON_FAILURE",
    restartPolicyMaxRetries: 10,
  },
};

fs.writeFileSync(
  `${railwayDir}/railway.json`,
  JSON.stringify(railwayConfig, null, 2)
);

// Create deployment README
const readmeContent = `# EMERGENCY FRONTEND DEPLOYMENT

## What Happened:
- Netlify ran out of credits
- Frontend couldn't deploy with checkout fixes
- Emergency deployment to Railway needed

## What This Contains:
- Complete built frontend (from dist/)
- Express server to serve static files
- All checkout fixes included
- All commission form fixes included

## To Deploy on Railway:
1. Create New Service in Railway project
2. Connect this folder as source
3. Deploy immediately
4. Update domain to new Railway URL

## Files Included:
- public/ - All built frontend files
- server.js - Express static file server
- package.json - Node.js dependencies
- railway.json - Railway configuration

## FIXES INCLUDED:
- Checkout form JavaScript
- Commission form API endpoints
- Contact form API endpoints
- All latest updates

This should be live within 2-3 minutes on Railway!
`;

fs.writeFileSync(`${railwayDir}/README.md`, readmeContent);

console.log("✅ Frontend package ready for Railway deployment!");
console.log(`📦 Deploy the '${railwayDir}' folder to Railway now.`);
console.log("🚀 This includes ALL your checkout and form fixes!");
