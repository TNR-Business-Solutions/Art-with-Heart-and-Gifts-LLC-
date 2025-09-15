import fs from "fs/promises";

async function updateImageUrls(domain) {
  console.log(`🔧 Updating image URLs to use domain: ${domain}`);

  try {
    // Update data.json
    console.log("📝 Updating data.json...");
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);

    const updatedProducts = products.map((product) => {
      if (product.image && product.image.startsWith("/images/")) {
        product.image = `${domain}${product.image}`;
      }
      return product;
    });

    await fs.writeFile("data.json", JSON.stringify(updatedProducts, null, 2));
    console.log(`✅ Updated ${updatedProducts.length} products in data.json`);

    // Update data-gallery.json
    console.log("📝 Updating data-gallery.json...");
    const galleryContent = await fs.readFile("data-gallery.json", "utf8");
    const galleryItems = JSON.parse(galleryContent);

    const updatedGallery = galleryItems.map((item) => {
      if (item.image && item.image.startsWith("/images/")) {
        item.image = `${domain}${item.image}`;
      }
      return item;
    });

    await fs.writeFile(
      "data-gallery.json",
      JSON.stringify(updatedGallery, null, 2)
    );
    console.log(
      `✅ Updated ${updatedGallery.length} gallery items in data-gallery.json`
    );

    // Update backend inventory.json
    console.log("📝 Updating backend/data/inventory.json...");
    const inventoryContent = await fs.readFile(
      "backend/data/inventory.json",
      "utf8"
    );
    const inventory = JSON.parse(inventoryContent);

    const updatedInventory = inventory.map((item) => {
      if (item.image && item.image.startsWith("/images/")) {
        item.image = `${domain}${item.image}`;
      }
      return item;
    });

    await fs.writeFile(
      "backend/data/inventory.json",
      JSON.stringify(updatedInventory, null, 2)
    );
    console.log(`✅ Updated ${updatedInventory.length} inventory items`);

    // Create updated CSV files for Google Sheets
    console.log("📝 Creating updated CSV files...");

    // Basic CSV
    const csvData = [];
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

    for (const product of updatedProducts) {
      const row = [
        `"${product.title}"`,
        `"${(product.alt || product.title).replace(/"/g, '""')}"`,
        `"${product.id}"`,
        product.price.toFixed(2),
        `"${product.category || "Art"}"`,
        `"${product.image}"`, // Now uses the full domain URL
        product.type === "original" ? 1 : 999,
        product.type === "original" ? "1.0" : "0.3",
        `"${product.size || "Various"}"`,
        "Yes",
        "Yes",
        `"art,${product.type},${product.category?.toLowerCase() || "artwork"}"`,
      ];
      csvData.push(row.join(","));
    }

    const csvContent = csvData.join("\n");
    await fs.writeFile("SwipeSimple_Catalog_Updated_URLs.csv", csvContent);

    console.log("\n📊 SUMMARY:");
    console.log(`✅ Updated image URLs in all data files`);
    console.log(`✅ Created updated CSV: SwipeSimple_Catalog_Updated_URLs.csv`);
    console.log(`\n📋 Files to upload to live server:`);
    console.log(`  - data.json`);
    console.log(`  - data-gallery.json`);
    console.log(`  - backend/data/inventory.json`);
    console.log(
      `  - SwipeSimple_Catalog_Updated_URLs.csv (for Swipe Simple import)`
    );

    console.log(`\n🌐 All image URLs now point to: ${domain}`);
  } catch (error) {
    console.error("❌ Error updating image URLs:", error);
  }
}

// Get domain from command line argument or prompt
const domain = process.argv[2];
if (!domain) {
  console.log("❌ Please provide your domain as an argument:");
  console.log("   node scripts/update-image-urls.mjs https://yourdomain.com");
  process.exit(1);
}

// Ensure domain ends with no slash
const cleanDomain = domain.endsWith("/") ? domain.slice(0, -1) : domain;

updateImageUrls(cleanDomain);
