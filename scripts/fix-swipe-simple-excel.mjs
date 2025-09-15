import fs from "fs/promises";
import xlsx from "xlsx";

async function fixSwipeSimpleExcel() {
  console.log("🔧 FIXING SWIPE SIMPLE EXCEL FORMAT");
  console.log("=".repeat(60));

  try {
    // Read the current CSV file
    const csvContent = await fs.readFile(
      "SwipeSimple_Catalog_Updated_URLs.csv",
      "utf8"
    );
    const lines = csvContent.split("\n");

    // Parse the CSV data
    const headers = lines[0].split(",");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",");
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]
            ? values[index].replace(/"/g, "").trim()
            : "";
        });
        data.push(row);
      }
    }

    console.log(`📋 Found ${data.length} products in CSV`);
    console.log(`📋 Current headers: ${headers.join(", ")}`);

    // Create corrected data with proper Swipe Simple headers
    const correctedData = data.map((row, index) => {
      // Map the fields to the correct Swipe Simple format
      return {
        // Required fields for Swipe Simple
        id: row["SKU"] || `item-${index + 1}`,
        name: row["Product Name"] || row["Description"] || "",
        sku: row["SKU"] || `sku-${index + 1}`,
        price: parseFloat(row["Price"]) || 0,
        tax: row["Taxable"] === "Yes" ? "1" : "0",
        status: row["Active"] === "Yes" ? "1" : "0",
        track_inventory: row["Inventory Quantity"] ? "1" : "0",
        on_hand_count: parseInt(row["Inventory Quantity"]) || 0,
        category: row["Category"] || "Artwork",

        // Optional fields
        description: row["Description"] || row["Product Name"] || "",
        image_url: row["Image URL"] || "",
        weight: parseFloat(row["Weight (lbs)"]) || 0,
        dimensions: row["Dimensions"] || "",
        tags: row["Tags"] || "",
      };
    });

    // Create a new workbook
    const wb = xlsx.utils.book_new();

    // Create the items sheet
    const itemsSheet = xlsx.utils.json_to_sheet(correctedData);
    xlsx.utils.book_append_sheet(wb, itemsSheet, "Items");

    // Create the taxes sheet with proper tax IDs
    const taxesData = [
      {
        id: "10001",
        name: "Florida State Tax",
        rate: "0.06",
        type: "sales_tax",
      },
      {
        id: "10002",
        name: "Pasco County Surtax",
        rate: "0.01",
        type: "county_surtax",
      },
    ];

    const taxesSheet = xlsx.utils.json_to_sheet(taxesData);
    xlsx.utils.book_append_sheet(wb, taxesSheet, "Taxes");

    // Write the corrected Excel file
    const correctedFileName = "SwipeSimple_Catalog_CORRECTED.xlsx";
    xlsx.writeFile(wb, correctedFileName);

    console.log(`✅ Created corrected Excel file: ${correctedFileName}`);
    console.log(`📊 Items sheet: ${correctedData.length} products`);
    console.log(`📊 Taxes sheet: ${taxesData.length} tax rates`);

    // Also create a CSV version for easier viewing
    const csvHeaders = Object.keys(correctedData[0]);
    const csvOutput = [
      csvHeaders.join(","),
      ...correctedData.map((row) =>
        csvHeaders
          .map((header) => {
            const value = row[header] || "";
            // Escape commas and quotes in CSV
            return typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",")
      ),
    ].join("\n");

    await fs.writeFile("SwipeSimple_Catalog_CORRECTED.csv", csvOutput);
    console.log(
      `✅ Created corrected CSV file: SwipeSimple_Catalog_CORRECTED.csv`
    );

    console.log("\n🎯 CORRECTED HEADERS:");
    console.log("Items sheet headers:", csvHeaders.join(", "));
    console.log("Taxes sheet headers: id, name, rate, type");

    console.log("\n📋 KEY CHANGES MADE:");
    console.log("✅ Fixed column headers to match Swipe Simple format");
    console.log("✅ Mapped 'Product Name' → 'name'");
    console.log("✅ Mapped 'Description' → 'description'");
    console.log("✅ Mapped 'SKU' → 'sku'");
    console.log("✅ Mapped 'Price' → 'price'");
    console.log("✅ Mapped 'Category' → 'category'");
    console.log("✅ Mapped 'Image URL' → 'image_url'");
    console.log("✅ Mapped 'Inventory Quantity' → 'on_hand_count'");
    console.log("✅ Mapped 'Weight (lbs)' → 'weight'");
    console.log("✅ Mapped 'Dimensions' → 'dimensions'");
    console.log(
      "✅ Added required 'id', 'tax', 'status', 'track_inventory' fields"
    );
    console.log("✅ Fixed tax IDs to use valid values (10001, 10002)");

    console.log("\n🚀 READY FOR UPLOAD:");
    console.log(`Upload this file to Swipe Simple: ${correctedFileName}`);
  } catch (error) {
    console.error("❌ Error fixing Excel file:", error);
  }
}

fixSwipeSimpleExcel().catch(console.error);
