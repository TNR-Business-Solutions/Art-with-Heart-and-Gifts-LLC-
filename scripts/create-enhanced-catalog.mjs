import fs from "fs/promises";
import XLSX from "xlsx";

async function createEnhancedCatalog() {
  console.log("📊 Creating enhanced Swipe Simple catalog with all required fields...");
  
  try {
    // Read product data
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);
    console.log(`📦 Processing ${products.length} products...`);

    // Create Excel workbook
    const workbook = XLSX.utils.book_new();

    // Enhanced headers for comprehensive e-commerce catalog
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
      "Length (in)",
      "Width (in)", 
      "Height (in)",
      "Active",
      "Taxable",
      "Requires Shipping",
      "Tags",
      "SEO Title",
      "SEO Description",
      "Handle",
      "Published"
    ];
    
    const catalogData = [headers];

    // Process each product
    for (const product of products) {
      const handle = product.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      const row = [
        product.title,                    // Product Name
        product.alt || product.title,    // Product Description
        product.title.substring(0, 100), // Short Description
        product.id,                      // SKU
        product.price.toFixed(2),        // Price
        product.type === 'original' ? (product.price * 1.2).toFixed(2) : "", // Compare at Price
        product.type === 'original' ? (product.price * 0.6).toFixed(2) : (product.price * 0.4).toFixed(2), // Cost per Item
        product.category || "Art",       // Category
        product.type === 'original' ? "Original Artwork" : "Prints", // Subcategory
        "Art with Heart & Gifts",        // Brand
        product.type === 'original' ? "Original" : "Print", // Product Type
        "Charmin",                       // Vendor
        `https://yourdomain.com${product.image}`, // Image URL
        product.alt || product.title,    // Image Alt Text
        product.type === 'original' ? 1 : 999, // Inventory Quantity
        product.type === 'original' ? "deny" : "continue", // Inventory Policy
        product.type === "original" ? "1.0" : "0.3", // Weight (lbs)
        "8",                            // Length (in)
        "10",                           // Width (in)
        "0.1",                          // Height (in)
        "TRUE",                         // Active
        "TRUE",                         // Taxable
        "TRUE",                         // Requires Shipping
        `art,${product.type},${product.category?.toLowerCase() || 'artwork'},handmade`, // Tags
        `${product.title} - Art with Heart & Gifts`, // SEO Title
        `Beautiful ${product.type} artwork by Charmin. ${product.alt || product.title}`, // SEO Description
        handle,                         // Handle
        "TRUE"                          // Published
      ];
      
      catalogData.push(row);
    }

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(catalogData);
    
    // Set column widths
    worksheet["!cols"] = [
      { wch: 35 }, // Product Name
      { wch: 50 }, // Product Description
      { wch: 40 }, // Short Description
      { wch: 20 }, // SKU
      { wch: 10 }, // Price
      { wch: 12 }, // Compare at Price
      { wch: 12 }, // Cost per Item
      { wch: 15 }, // Category
      { wch: 20 }, // Subcategory
      { wch: 20 }, // Brand
      { wch: 12 }, // Product Type
      { wch: 15 }, // Vendor
      { wch: 60 }, // Image URL
      { wch: 40 }, // Image Alt Text
      { wch: 15 }, // Inventory Quantity
      { wch: 15 }, // Inventory Policy
      { wch: 12 }, // Weight
      { wch: 12 }, // Length
      { wch: 12 }, // Width
      { wch: 12 }, // Height
      { wch: 8 },  // Active
      { wch: 8 },  // Taxable
      { wch: 15 }, // Requires Shipping
      { wch: 40 }, // Tags
      { wch: 50 }, // SEO Title
      { wch: 60 }, // SEO Description
      { wch: 30 }, // Handle
      { wch: 10 }  // Published
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Catalog Import");

    // Create instructions sheet
    const instructions = [
      ["Swipe Simple Catalog Import Instructions"],
      ["", ""],
      ["BEFORE IMPORTING:"],
      ["1. Update all Image URLs with your actual domain"],
      ["2. Review product names and descriptions"],
      ["3. Adjust pricing if needed"],
      ["4. Verify inventory quantities"],
      ["", ""],
      ["IMPORT STEPS:"],
      ["1. Log into Swipe Simple dashboard"],
      ["2. Go to Products > Import"],
      ["3. Upload this Excel file"],
      ["4. Map columns to Swipe Simple fields"],
      ["5. Review and confirm import"],
      ["", ""],
      ["POST-IMPORT:"],
      ["1. Test product display"],
      ["2. Verify pricing"],
      ["3. Test checkout flow"],
      ["4. Check inventory tracking"],
      ["", ""],
      ["SUPPORT:"],
      ["If you need help with import, contact Swipe Simple support"],
      ["or refer to their documentation"]
    ];

    const instructionsSheet = XLSX.utils.aoa_to_sheet(instructions);
    XLSX.utils.book_append_sheet(workbook, instructionsSheet, "Instructions");

    // Save the file
    const filename = "SwipeSimple_Enhanced_Catalog.xlsx";
    XLSX.writeFile(workbook, filename);

    console.log(`✅ Enhanced catalog created: ${filename}`);
    console.log("\n📊 SUMMARY:");
    console.log(`  - Total products: ${products.length}`);
    console.log(`  - Originals: ${products.filter(p => p.type === 'original').length}`);
    console.log(`  - Prints: ${products.filter(p => p.type === 'print').length}`);
    console.log(`  - Charmin's Artwork: ${products.filter(p => p.title.includes("Charmin's Artwork")).length}`);
    
    console.log("\n📋 File includes:");
    console.log("  - Catalog Import sheet: Complete product data with all fields");
    console.log("  - Instructions sheet: Step-by-step import guide");
    console.log("\n⚠️  IMPORTANT: Update Image URLs with your actual domain before importing!");

  } catch (error) {
    console.error("❌ Error creating enhanced catalog:", error);
  }
}

createEnhancedCatalog();
