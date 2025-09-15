import fs from "fs/promises";

async function createSwipeSimpleNewItems() {
  console.log("🔧 CREATING SWIPE SIMPLE NEW ITEMS CSV");
  console.log("=".repeat(60));

  try {
    // Your data with the correct sequential IDs
    const itemsData = [
      {
        id: "00002",
        name: "Angels set of 3 9in x12in - Original",
        sku: "original-1",
        price: 50,
        category: "Artwork",
      },
      {
        id: "00003",
        name: "Angels set of 3 9in x12in - Print",
        sku: "print-1",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00004",
        name: "Barn 9in x 12in - Original",
        sku: "original-2",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00005",
        name: "Barn 9in x 12in - Print",
        sku: "print-2",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00006",
        name: "Mermaid Dreams 9in x 12in - Original",
        sku: "original-3",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00007",
        name: "Mermaid Dreams 9in x 12in - Print",
        sku: "print-3",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00008",
        name: "Mermaid Dreams 9in x 12in - Original",
        sku: "original-4",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00009",
        name: "Mermaid Dreams 9in x 12in - Print",
        sku: "print-4",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00010",
        name: "Lighthouse Big Red 11in x 14in - Original",
        sku: "original-5",
        price: 30,
        category: "Artwork",
      },
      {
        id: "00011",
        name: "Lighthouse Big Red 11in x 14in - Print",
        sku: "print-5",
        price: 12,
        category: "Artwork",
      },
      {
        id: "00012",
        name: "Pumpkin Man 9in x 12in - Original",
        sku: "original-6",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00013",
        name: "Pumpkin Man 9in x 12in - Print",
        sku: "print-6",
        price: 8,
        category: "Artwork",
      },
      {
        id: "00014",
        name: "Love Tree 11in x 14in - Original",
        sku: "original-7",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00015",
        name: "Love Tree 11in x 14in - Print",
        sku: "print-7",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00016",
        name: "Sunburst 11in x 14in - Original",
        sku: "original-8",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00017",
        name: "Sunburst 11in x 14in - Print",
        sku: "print-8",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00018",
        name: "Big Sky 11in x 14in - Original",
        sku: "original-9",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00019",
        name: "Big Sky 11in x 14in - Print",
        sku: "print-9",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00020",
        name: "Corey's Turtle Prints only - Original",
        sku: "original-10",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00021",
        name: "Corey's Turtle Prints only - Print",
        sku: "print-10",
        price: 5,
        category: "Artwork",
      },
      {
        id: "00022",
        name: "Swan 11in x 15in - Original",
        sku: "original-11",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00023",
        name: "Swan 11in x 15in - Print",
        sku: "print-11",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00024",
        name: "Pumpkin Patch pair 11in x 15in - Original",
        sku: "original-12",
        price: 40,
        category: "Artwork",
      },
      {
        id: "00025",
        name: "Pumpkin Patch pair 11in x 15in - Print",
        sku: "print-12",
        price: 16,
        category: "Artwork",
      },
      {
        id: "00026",
        name: "Red Sky 11in x 14in - Original",
        sku: "original-13",
        price: 25,
        category: "Artwork",
      },
      {
        id: "00027",
        name: "Red Sky 11in x 14in - Print",
        sku: "print-13",
        price: 10,
        category: "Artwork",
      },
      {
        id: "00028",
        name: "Beach Day 9in x 12in - Original",
        sku: "original-14",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00029",
        name: "Beach Day 9in x 12in - Print",
        sku: "print-14",
        price: 8,
        category: "Artwork",
      },
      {
        id: "00030",
        name: "Blessings 9in x 12in - Original",
        sku: "original-15",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00031",
        name: "Blessings 9in x 12in - Print",
        sku: "print-15",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00032",
        name: "Koi Fish 9in x 12in - Original",
        sku: "original-16",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00033",
        name: "Koi Fish 9in x 12in - Print",
        sku: "print-16",
        price: 8,
        category: "Artwork",
      },
      {
        id: "00034",
        name: "Lavender 8in x 10in - Original",
        sku: "original-17",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00035",
        name: "Lavender 8in x 10in - Print",
        sku: "print-17",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00036",
        name: "Blue Sparkel 8in x 10in - Original",
        sku: "original-18",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00037",
        name: "Blue Sparkel 8in x 10in - Print",
        sku: "print-18",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00038",
        name: "Wavy Blue 8in x 10in - Original",
        sku: "original-19",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00039",
        name: "Wavy Blue 8in x 10in - Print",
        sku: "print-19",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00040",
        name: "Full Moon 8in x 10in - Original",
        sku: "original-20",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00041",
        name: "Full Moon 8in x 10in - Print",
        sku: "print-20",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00042",
        name: "Blue Calm 8in x 10in - Original",
        sku: "original-21",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00043",
        name: "Blue Calm 8in x 10in - Print",
        sku: "print-21",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00044",
        name: "Night Sea 8in x 10in - Original",
        sku: "original-23",
        price: 15,
        category: "Artwork",
      },
      {
        id: "00045",
        name: "Night Sea 8in x 10in - Print",
        sku: "print-23",
        price: 6,
        category: "Artwork",
      },
      {
        id: "00046",
        name: "SunShine 8in x 10in - Original",
        sku: "original-24",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00047",
        name: "SunShine 8in x 10in - Print",
        sku: "print-24",
        price: 8,
        category: "Artwork",
      },
      {
        id: "00048",
        name: "Behind the Fence 8in x10in - Original",
        sku: "original-25",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00049",
        name: "Behind the Fence 8in x10in - Print",
        sku: "print-25",
        price: 8,
        category: "Artwork",
      },
      {
        id: "00050",
        name: "On the Shore 9in x 12in - Original",
        sku: "original-26",
        price: 20,
        category: "Artwork",
      },
      {
        id: "00051",
        name: "On the Shore 9in x 12in - Print",
        sku: "print-26",
        price: 8,
        category: "Artwork",
      },
    ];

    // Add all Charmin's artwork items
    for (let i = 52; i <= 136; i++) {
      const charmNum = i - 51;
      itemsData.push({
        id: i.toString().padStart(5, "0"),
        name: `Charmin's Artwork #${charmNum}`,
        sku: `charmin-${charmNum}`,
        price: 15,
        category: "Artwork",
      });
    }

    console.log(`📋 Processing ${itemsData.length} items`);

    // Create CSV content for NEW items (without IDs)
    const csvHeaders =
      "name,sku,price,category,description,image_url,track_inventory,on_hand_count,taxable,status";

    const csvRows = itemsData.map((item) => {
      const description = item.name;
      const imageUrl = `https://artwithheartandgifts.com/images/${item.sku}.jpg`;
      const trackInventory = "TRUE";
      const onHandCount = item.sku.startsWith("original") ? "1" : "999";
      const taxable = "TRUE";
      const status = "Active";

      // Escape commas and quotes in CSV
      const escapeCsv = (str) => {
        if (str.includes(",") || str.includes('"')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        escapeCsv(item.name),
        escapeCsv(item.sku),
        item.price,
        escapeCsv(item.category),
        escapeCsv(description),
        escapeCsv(imageUrl),
        trackInventory,
        onHandCount,
        taxable,
        status,
      ].join(",");
    });

    const csvContent = [csvHeaders, ...csvRows].join("\n");

    // Save the CSV file
    const csvFileName = "SwipeSimple_New_Items_No_IDs.csv";
    await fs.writeFile(csvFileName, csvContent);

    console.log(`✅ Created ${csvFileName}`);
    console.log(`📊 Items: ${itemsData.length}`);
    console.log(`📋 Headers: ${csvHeaders}`);

    // Also create an Excel version
    const xlsx = await import("xlsx");
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([
      csvHeaders.split(","),
      ...csvRows.map((row) => row.split(",")),
    ]);
    xlsx.utils.book_append_sheet(wb, ws, "Items");

    const excelFileName = "SwipeSimple_New_Items_No_IDs.xlsx";
    xlsx.writeFile(wb, excelFileName);

    console.log(`✅ Created ${excelFileName}`);

    console.log("\n🎯 SOLUTION FOR SWIPE SIMPLE:");
    console.log("❌ Problem: Swipe Simple expects IDs to already exist");
    console.log("✅ Solution: Remove IDs to create NEW items");
    console.log("📋 Swipe Simple will auto-assign new IDs");

    console.log("\n🚀 UPLOAD INSTRUCTIONS:");
    console.log(`1. Upload: ${excelFileName}`);
    console.log("2. Swipe Simple will create new items");
    console.log("3. Items will get auto-assigned IDs");
    console.log("4. No more 'ID not found' errors!");

    console.log("\n📋 FILE FORMAT:");
    console.log(
      "✅ Headers: name,sku,price,category,description,image_url,track_inventory,on_hand_count,taxable,status"
    );
    console.log("✅ No ID column (Swipe Simple auto-assigns)");
    console.log("✅ All required fields included");
    console.log("✅ Proper CSV escaping");
  } catch (error) {
    console.error("❌ Error creating Swipe Simple items:", error);
  }
}

createSwipeSimpleNewItems().catch(console.error);
