import fs from "fs/promises";
import path from "path";

async function createQuickDeployPackage() {
  console.log("📦 Creating quick deploy package for image URL updates...");

  try {
    // Create deploy directory
    const deployDir = "quick-deploy";
    await fs.mkdir(deployDir, { recursive: true });
    await fs.mkdir(path.join(deployDir, "backend", "data"), {
      recursive: true,
    });

    // Files to copy for quick deploy
    const filesToCopy = [
      "data.json",
      "data-gallery.json",
      "backend/data/inventory.json",
    ];

    console.log("📋 Copying updated files...");
    for (const file of filesToCopy) {
      const sourcePath = file;
      const destPath = path.join(deployDir, file);

      try {
        await fs.copyFile(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
      } catch (error) {
        console.log(`⚠️  Could not copy ${file}: ${error.message}`);
      }
    }

    // Copy CSV files
    const csvFiles = [
      "SwipeSimple_Catalog_Updated_URLs.csv",
      "SwipeSimple_Catalog_GoogleSheets.csv",
      "SwipeSimple_Detailed_Catalog_GoogleSheets.csv",
    ];

    for (const csvFile of csvFiles) {
      try {
        await fs.copyFile(csvFile, path.join(deployDir, csvFile));
        console.log(`✅ Copied: ${csvFile}`);
      } catch (error) {
        console.log(`⚠️  Could not copy ${csvFile}: ${error.message}`);
      }
    }

    // Create deployment instructions
    const instructions = `# Quick Deploy - Image URL Updates

## Files to Upload to Live Server:

### Data Files (Replace existing):
- data.json
- data-gallery.json  
- backend/data/inventory.json

### New CSV Files (For Swipe Simple):
- SwipeSimple_Catalog_Updated_URLs.csv
- SwipeSimple_Catalog_GoogleSheets.csv
- SwipeSimple_Detailed_Catalog_GoogleSheets.csv

## Upload Instructions:

1. **Upload data files** to your live server:
   - Upload data.json to root directory
   - Upload data-gallery.json to root directory
   - Upload inventory.json to backend/data/ directory

2. **Restart backend** (if needed):
   - Restart your backend server to pick up new inventory.json

3. **Test the site**:
   - Check that images load correctly
   - Verify shop and gallery pages work
   - Test checkout flow

4. **Import to Swipe Simple**:
   - Use SwipeSimple_Catalog_Updated_URLs.csv
   - All image URLs are now properly formatted

## What This Updates:
- All product image URLs now use your live domain
- Gallery image URLs updated
- Backend inventory URLs updated
- CSV files ready for Swipe Simple import

No need to redeploy the entire site - just these files!
`;

    await fs.writeFile(
      path.join(deployDir, "DEPLOYMENT_INSTRUCTIONS.md"),
      instructions
    );

    console.log(`\n✅ Quick deploy package created in: ${deployDir}/`);
    console.log("\n📋 Next steps:");
    console.log(
      "1. Upload the files from the quick-deploy folder to your live server"
    );
    console.log("2. Restart your backend server");
    console.log("3. Test the site");
    console.log("4. Import CSV to Swipe Simple");
  } catch (error) {
    console.error("❌ Error creating quick deploy package:", error);
  }
}

createQuickDeployPackage();
