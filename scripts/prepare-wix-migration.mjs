import fs from "fs/promises";

async function prepareWixMigration() {
  console.log("🎨 Preparing content for Wix migration...");

  try {
    // Read all data files
    const dataContent = await fs.readFile("data.json", "utf8");
    const products = JSON.parse(dataContent);

    const galleryContent = await fs.readFile("data-gallery.json", "utf8");
    const galleryItems = JSON.parse(galleryContent);

    // Create Wix-specific product import
    const wixProducts = products.map((product) => ({
      "Product Name": product.title,
      Description: product.alt || product.title,
      Price: product.price.toFixed(2),
      SKU: product.id,
      Category: product.category || "Art",
      "Image URL": product.image,
      Weight: product.type === "original" ? "1.0" : "0.3",
      Inventory: product.type === "original" ? 1 : 999,
      Type: product.type,
      Size: product.size || "Various",
      Tags: `art,${product.type},${
        product.category?.toLowerCase() || "artwork"
      },handmade`,
    }));

    // Create Wix CSV
    const wixCsv = [
      "Product Name,Description,Price,SKU,Category,Image URL,Weight,Inventory,Type,Size,Tags",
    ];

    wixProducts.forEach((product) => {
      const row = [
        `"${product["Product Name"]}"`,
        `"${product.Description}"`,
        product.Price,
        `"${product.SKU}"`,
        `"${product.Category}"`,
        `"${product["Image URL"]}"`,
        product.Weight,
        product.Inventory,
        `"${product.Type}"`,
        `"${product.Size}"`,
        `"${product.Tags}"`,
      ].join(",");
      wixCsv.push(row);
    });

    await fs.writeFile("WIX_Product_Import.csv", wixCsv.join("\n"));

    // Create content extraction
    const content = {
      siteInfo: {
        title: "Art with Heart & Gifts",
        description:
          "Beautiful handmade artwork by Charmin - original paintings and prints",
        domain: "artwithheartandgifts.com",
      },
      pages: {
        home: {
          title: "Welcome to Art with Heart & Gifts",
          description:
            "Discover beautiful handmade artwork by Charmin. Original paintings and prints available.",
          sections: [
            "Hero",
            "Featured Products",
            "About Preview",
            "Gallery Preview",
          ],
        },
        about: {
          title: "About Charmin",
          description:
            "Learn about the artist behind these beautiful creations",
        },
        gallery: {
          title: "Gallery",
          description: "Browse our collection of original artwork",
          itemCount: galleryItems.length,
        },
        shop: {
          title: "Shop",
          description: "Purchase original artwork and prints",
          productCount: products.length,
          categories: ["Originals", "Prints", "Charmin's Artwork"],
        },
        contact: {
          title: "Contact Us",
          description: "Get in touch for custom commissions or questions",
        },
      },
      products: {
        total: products.length,
        originals: products.filter((p) => p.type === "original").length,
        prints: products.filter((p) => p.type === "print").length,
        charminArtwork: products.filter((p) =>
          p.title.includes("Charmin's Artwork")
        ).length,
      },
      images: {
        total: 273,
        location: "public/images/",
        categories: [
          "Numbered Artwork",
          "Charmin's Artwork",
          "Workspace Photos",
        ],
      },
    };

    await fs.writeFile(
      "WIX_Content_Guide.json",
      JSON.stringify(content, null, 2)
    );

    // Create image organization guide
    const imageGuide = {
      "Numbered Artwork (1-85)": products.filter((p) =>
        /^\d+\./.test(p.image.split("/").pop())
      ).length,
      "Charmin's Artwork (charmin-1 to charmin-85)": products.filter((p) =>
        p.image.includes("charmin-")
      ).length,
      "Workspace Photos": "basement, workspace, canvas photos",
      "Total Images": 273,
    };

    await fs.writeFile(
      "WIX_Image_Organization.json",
      JSON.stringify(imageGuide, null, 2)
    );

    // Create migration checklist
    const checklist = `# Wix Migration Checklist

## Pre-Migration (✅ Ready)
- [x] All 135 products exported to CSV
- [x] All 273 images organized
- [x] Site content extracted
- [x] Product categories defined

## Wix Setup Steps
1. **Create Wix Account**
   - Go to wix.com
   - Choose "Create a Website"
   - Select "Online Store" template

2. **Import Products**
   - Use WIX_Product_Import.csv
   - Upload to Wix Stores
   - Verify all 135 products imported

3. **Upload Images**
   - Upload all images from public/images/
   - Organize by category
   - Set up gallery

4. **Create Pages**
   - Home (with alternating layout)
   - About
   - Gallery (Pinterest style)
   - Shop
   - Contact

5. **Customize Design**
   - Apply sunset color scheme (teal, orange, light colors)
   - Set up responsive layout
   - Configure navigation

6. **Set Up E-commerce**
   - Configure payment processing
   - Set up shipping
   - Test checkout flow

7. **SEO & Launch**
   - Set up meta tags
   - Configure analytics
   - Test on mobile
   - Go live!

## Files Ready for Import
- WIX_Product_Import.csv (135 products)
- WIX_Content_Guide.json (site structure)
- WIX_Image_Organization.json (image guide)
- All images in public/images/ folder
`;

    await fs.writeFile("WIX_Migration_Checklist.md", checklist);

    console.log("✅ Wix migration files created:");
    console.log(
      "  - WIX_Product_Import.csv (135 products ready for Wix Stores)"
    );
    console.log("  - WIX_Content_Guide.json (site structure and content)");
    console.log("  - WIX_Image_Organization.json (image organization guide)");
    console.log("  - WIX_Migration_Checklist.md (step-by-step guide)");

    console.log("\n📊 Summary:");
    console.log(
      `  - Products: ${products.length} (${
        products.filter((p) => p.type === "original").length
      } originals, ${products.filter((p) => p.type === "print").length} prints)`
    );
    console.log(`  - Gallery items: ${galleryItems.length}`);
    console.log(`  - Images: 273 ready for upload`);
    console.log(
      `  - Revenue potential: $${products
        .reduce((sum, p) => sum + p.price, 0)
        .toFixed(2)}`
    );
  } catch (error) {
    console.error("❌ Error preparing Wix migration:", error);
  }
}

prepareWixMigration();
