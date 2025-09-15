import fs from "fs/promises";

async function convertToGoogleSheets() {
  console.log("📊 Converting Excel to Google Sheets format (CSV)...");

  try {
    // Read product data
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);
    console.log(`📦 Processing ${products.length} products...`);

    // Create CSV data for Google Sheets
    const csvData = [];

    // Headers for Swipe Simple catalog import
    const headers = [
      "Product Name",
      "Description",
      "SKU",
      "Price",
      "Category",
      "Image URL",
      "Inventory Quantity",
      "Weight (lbs)",
      "Dimensions",
      "Active",
      "Taxable",
      "Tags",
    ];

    csvData.push(headers.join(","));

    // Process each product
    for (const product of products) {
      const row = [
        `"${product.title}"`, // Product Name (quoted for CSV)
        `"${(product.alt || product.title).replace(/"/g, '""')}"`, // Description (escape quotes)
        `"${product.id}"`, // SKU
        product.price.toFixed(2), // Price
        `"${product.category || "Art"}"`, // Category
        `"https://yourdomain.com${product.image}"`, // Image URL (update with your domain)
        product.type === "original" ? 1 : 999, // Inventory Quantity
        product.type === "original" ? "1.0" : "0.3", // Weight (lbs)
        `"${product.size || "Various"}"`, // Dimensions
        "Yes", // Active
        "Yes", // Taxable
        `"art,${product.type},${product.category?.toLowerCase() || "artwork"}"`, // Tags
      ];

      csvData.push(row.join(","));
    }

    // Save as CSV file
    const csvContent = csvData.join("\n");
    await fs.writeFile("SwipeSimple_Catalog_GoogleSheets.csv", csvContent);

    console.log(
      `✅ Google Sheets CSV created: SwipeSimple_Catalog_GoogleSheets.csv`
    );
    console.log("\n📊 SUMMARY:");
    console.log(`  - Total products: ${products.length}`);
    console.log(
      `  - Originals: ${products.filter((p) => p.type === "original").length}`
    );
    console.log(
      `  - Prints: ${products.filter((p) => p.type === "print").length}`
    );
    console.log(
      `  - Charmin's Artwork: ${
        products.filter((p) => p.title.includes("Charmin's Artwork")).length
      }`
    );

    console.log("\n📋 To open in Google Sheets:");
    console.log("  1. Go to https://sheets.google.com");
    console.log("  2. Click 'Blank' to create new sheet");
    console.log("  3. Go to File > Import > Upload");
    console.log("  4. Upload the SwipeSimple_Catalog_GoogleSheets.csv file");
    console.log("  5. Choose 'Replace spreadsheet' and click 'Import data'");
    console.log(
      "\n⚠️  IMPORTANT: Update Image URLs with your actual domain before importing to Swipe Simple!"
    );
  } catch (error) {
    console.error("❌ Error creating Google Sheets CSV:", error);
  }
}

convertToGoogleSheets();
