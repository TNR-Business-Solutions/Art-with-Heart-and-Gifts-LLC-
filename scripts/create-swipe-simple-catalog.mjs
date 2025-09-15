import fs from "fs/promises";
import XLSX from "xlsx";

async function createSwipeSimpleCatalog() {
  console.log("📊 Creating Swipe Simple catalog import file...");
  
  try {
    // Read product data
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);
    console.log(`📦 Processing ${products.length} products...`);

    // Create Excel workbook
    const workbook = XLSX.utils.book_new();

    // Define the catalog data with proper Swipe Simple format
    const catalogData = [];
    
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
      "Tags"
    ];
    
    catalogData.push(headers);

    // Process each product
    for (const product of products) {
      const row = [
        product.title,                    // Product Name
        product.alt || product.title,    // Description
        product.id,                      // SKU
        product.price.toFixed(2),        // Price
        product.category || "Art",       // Category
        `https://yourdomain.com${product.image}`, // Image URL (update with your domain)
        product.type === 'original' ? 1 : 999, // Inventory Quantity
        product.type === "original" ? "1.0" : "0.3", // Weight (lbs)
        product.size || "Various",       // Dimensions
        "Yes",                          // Active
        "Yes",                          // Taxable
        `art,${product.type},${product.category?.toLowerCase() || 'artwork'}` // Tags
      ];
      
      catalogData.push(row);
    }

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(catalogData);
    
    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 40 }, // Product Name
      { wch: 50 }, // Description
      { wch: 20 }, // SKU
      { wch: 10 }, // Price
      { wch: 15 }, // Category
      { wch: 60 }, // Image URL
      { wch: 15 }, // Inventory Quantity
      { wch: 12 }, // Weight
      { wch: 15 }, // Dimensions
      { wch: 8 },  // Active
      { wch: 8 },  // Taxable
      { wch: 30 }  // Tags
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Catalog Import");

    // Create summary sheet
    const summaryData = [
      ["Swipe Simple Catalog Import Summary"],
      ["", ""],
      ["Total Products", products.length],
      ["Originals", products.filter(p => p.type === 'original').length],
      ["Prints", products.filter(p => p.type === 'print').length],
      ["Charmin's Artwork", products.filter(p => p.title.includes("Charmin's Artwork")).length],
      ["", ""],
      ["Price Ranges:"],
      ["$5-10", products.filter(p => p.price >= 5 && p.price <= 10).length],
      ["$11-20", products.filter(p => p.price >= 11 && p.price <= 20).length],
      ["$21-30", products.filter(p => p.price >= 21 && p.price <= 30).length],
      ["$31-50", products.filter(p => p.price >= 31 && p.price <= 50).length],
      ["$50+", products.filter(p => p.price > 50).length],
      ["", ""],
      ["Instructions:"],
      ["1. Update Image URLs with your actual domain"],
      ["2. Review all product information"],
      ["3. Import to Swipe Simple using this file"],
      ["4. Test payment flow after import"]
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Create price analysis sheet
    const priceAnalysis = [
      ["Price Analysis by Type"],
      ["Type", "Count", "Min Price", "Max Price", "Avg Price"],
      ["Originals", 
       products.filter(p => p.type === 'original').length,
       Math.min(...products.filter(p => p.type === 'original').map(p => p.price)).toFixed(2),
       Math.max(...products.filter(p => p.type === 'original').map(p => p.price)).toFixed(2),
       (products.filter(p => p.type === 'original').reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.type === 'original').length).toFixed(2)
      ],
      ["Prints",
       products.filter(p => p.type === 'print').length,
       Math.min(...products.filter(p => p.type === 'print').map(p => p.price)).toFixed(2),
       Math.max(...products.filter(p => p.type === 'print').map(p => p.price)).toFixed(2),
       (products.filter(p => p.type === 'print').reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.type === 'print').length).toFixed(2)
      ],
      ["Charmin's Artwork",
       products.filter(p => p.title.includes("Charmin's Artwork")).length,
       Math.min(...products.filter(p => p.title.includes("Charmin's Artwork")).map(p => p.price)).toFixed(2),
       Math.max(...products.filter(p => p.title.includes("Charmin's Artwork")).map(p => p.price)).toFixed(2),
       (products.filter(p => p.title.includes("Charmin's Artwork")).reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.title.includes("Charmin's Artwork")).length).toFixed(2)
      ]
    ];

    const priceSheet = XLSX.utils.aoa_to_sheet(priceAnalysis);
    XLSX.utils.book_append_sheet(workbook, priceSheet, "Price Analysis");

    // Save the file
    const filename = "SwipeSimple_Catalog_Import.xlsx";
    XLSX.writeFile(workbook, filename);

    console.log(`✅ Swipe Simple catalog created: ${filename}`);
    console.log("\n📊 SUMMARY:");
    console.log(`  - Total products: ${products.length}`);
    console.log(`  - Originals: ${products.filter(p => p.type === 'original').length}`);
    console.log(`  - Prints: ${products.filter(p => p.type === 'print').length}`);
    console.log(`  - Charmin's Artwork: ${products.filter(p => p.title.includes("Charmin's Artwork")).length}`);
    
    console.log("\n📋 File includes:");
    console.log("  - Catalog Import sheet: Ready for Swipe Simple upload");
    console.log("  - Summary sheet: Product counts and instructions");
    console.log("  - Price Analysis sheet: Revenue analysis by type");
    console.log("\n⚠️  IMPORTANT: Update Image URLs with your actual domain before importing!");

  } catch (error) {
    console.error("❌ Error creating catalog:", error);
  }
}

createSwipeSimpleCatalog();
