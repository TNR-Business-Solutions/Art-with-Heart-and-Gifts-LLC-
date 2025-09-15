import fs from "fs/promises";

async function createDetailedGoogleSheets() {
  console.log("📊 Creating detailed Google Sheets catalog...");

  try {
    // Read product data
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);
    console.log(`📦 Processing ${products.length} products...`);

    // Create detailed CSV data for Google Sheets
    const csvData = [];

    // Enhanced headers for comprehensive catalog
    const headers = [
      "Product Name",
      "Product Description",
      "Short Description",
      "SKU",
      "Price",
      "Compare at Price",
      "Cost per Item",
      "Category",
      "Subcategory",
      "Brand",
      "Product Type",
      "Vendor",
      "Image URL",
      "Image Alt Text",
      "Inventory Quantity",
      "Inventory Policy",
      "Weight (lbs)",
      "Dimensions",
      "Active",
      "Taxable",
      "Requires Shipping",
      "Tags",
      "SEO Title",
      "SEO Description",
      "Handle",
    ];

    csvData.push(headers.join(","));

    // Process each product
    for (const product of products) {
      const handle = product.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);

      const row = [
        `"${product.title}"`, // Product Name
        `"${(product.alt || product.title).replace(/"/g, '""')}"`, // Product Description
        `"${product.title.substring(0, 100).replace(/"/g, '""')}"`, // Short Description
        `"${product.id}"`, // SKU
        product.price.toFixed(2), // Price
        product.type === "original" ? (product.price * 1.2).toFixed(2) : "", // Compare at Price
        product.type === "original"
          ? (product.price * 0.6).toFixed(2)
          : (product.price * 0.4).toFixed(2), // Cost per Item
        `"${product.category || "Art"}"`, // Category
        `"${product.type === "original" ? "Original Artwork" : "Prints"}"`, // Subcategory
        `"Art with Heart & Gifts"`, // Brand
        `"${product.type === "original" ? "Original" : "Print"}"`, // Product Type
        `"Charmin"`, // Vendor
        `"https://yourdomain.com${product.image}"`, // Image URL
        `"${(product.alt || product.title).replace(/"/g, '""')}"`, // Image Alt Text
        product.type === "original" ? 1 : 999, // Inventory Quantity
        product.type === "original" ? "deny" : "continue", // Inventory Policy
        product.type === "original" ? "1.0" : "0.3", // Weight (lbs)
        `"${product.size || "Various"}"`, // Dimensions
        "Yes", // Active
        "Yes", // Taxable
        "Yes", // Requires Shipping
        `"art,${product.type},${
          product.category?.toLowerCase() || "artwork"
        },handmade"`, // Tags
        `"${product.title} - Art with Heart & Gifts"`, // SEO Title
        `"Beautiful ${product.type} artwork by Charmin. ${(
          product.alt || product.title
        ).replace(/"/g, '""')}"`, // SEO Description
        `"${handle}"`, // Handle
      ];

      csvData.push(row.join(","));
    }

    // Save as CSV file
    const csvContent = csvData.join("\n");
    await fs.writeFile(
      "SwipeSimple_Detailed_Catalog_GoogleSheets.csv",
      csvContent
    );

    console.log(
      `✅ Detailed Google Sheets CSV created: SwipeSimple_Detailed_Catalog_GoogleSheets.csv`
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

    console.log("\n📋 Files created for Google Sheets review:");
    console.log("  - SwipeSimple_Catalog_GoogleSheets.csv (basic format)");
    console.log(
      "  - SwipeSimple_Detailed_Catalog_GoogleSheets.csv (enhanced format)"
    );

    console.log("\n📋 To open in Google Sheets:");
    console.log("  1. Go to https://sheets.google.com");
    console.log("  2. Click 'Blank' to create new sheet");
    console.log("  3. Go to File > Import > Upload");
    console.log("  4. Upload either CSV file");
    console.log("  5. Choose 'Replace spreadsheet' and click 'Import data'");
    console.log(
      "\n⚠️  IMPORTANT: Update Image URLs with your actual domain before importing to Swipe Simple!"
    );
  } catch (error) {
    console.error("❌ Error creating detailed Google Sheets CSV:", error);
  }
}

createDetailedGoogleSheets();
