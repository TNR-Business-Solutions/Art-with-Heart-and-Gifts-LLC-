// Create clean, working data files
import fs from "fs/promises";

async function createCleanData() {
  console.log("🔧 Creating clean, working data files...");

  // Get all available images
  const images = await fs.readdir("public/images/");
  const jpgImages = images.filter((img) => img.endsWith(".jpg"));

  console.log(`📸 Found ${jpgImages.length} JPG images`);

  // Create shop products (numbered paintings + charmins as prints)
  const shopProducts = [];

  // Add numbered paintings as both prints and originals
  const numberedImages = jpgImages.filter((img) => /^\d+\./.test(img));

  for (const image of numberedImages) {
    const match = image.match(/^(\d+)\. (.+?) (\d+in x \d+in) \$(\d+\.\d+)/);
    if (match) {
      const [, num, title, size, price] = match;

      // Add print version
      shopProducts.push({
        id: `print-${num}`,
        title: `${title} - Print`,
        image: `/images/${image}`,
        alt: `${title} - Print`,
        price: parseFloat(price) * 0.4, // Print is 40% of original
        size: "8x10",
        type: "print",
        category: "Artwork",
      });

      // Add original version
      shopProducts.push({
        id: `original-${num}`,
        title: `${title} - Original`,
        image: `/images/${image}`,
        alt: `${title} - Original`,
        price: parseFloat(price),
        size: size,
        type: "original",
        category: "Artwork",
      });
    }
  }

  // Add Charmin prints
  const charminImages = jpgImages.filter((img) => img.startsWith("charmin-"));

  for (const image of charminImages) {
    const num = image.match(/charmin-(\d+)\.jpg/)?.[1];
    if (num) {
      shopProducts.push({
        id: `charmin-print-${num}`,
        title: `Charmin's Artwork ${num} - Print`,
        image: `/images/${image}`,
        alt: `Charmin's Artwork ${num} - Print`,
        price: 12.99,
        size: "8x10",
        type: "print",
        category: "Gallery",
      });
    }
  }

  // Create gallery items (Charmin images only, price 0)
  const galleryItems = charminImages.map((image) => {
    const num = image.match(/charmin-(\d+)\.jpg/)?.[1] || "unknown";
    return {
      id: `charmin-photo-${num}`,
      title: `Charmin's Artwork ${num}`,
      image: `/images/${image}`,
      alt: `Charmin's Artwork ${num} - Original painting`,
      price: 0,
      size: "Various",
      type: "gallery",
      category: "Gallery",
    };
  });

  // Write shop data
  await fs.writeFile("data.json", JSON.stringify(shopProducts, null, 2));
  console.log(`✅ Created data.json with ${shopProducts.length} products`);

  // Write gallery data
  await fs.writeFile(
    "data-gallery.json",
    JSON.stringify(galleryItems, null, 2)
  );
  console.log(
    `✅ Created data-gallery.json with ${galleryItems.length} gallery items`
  );

  // Summary
  console.log("\n📊 SUMMARY:");
  console.log(`Shop Products: ${shopProducts.length}`);
  console.log(
    `- Prints: ${shopProducts.filter((p) => p.type === "print").length}`
  );
  console.log(
    `- Originals: ${shopProducts.filter((p) => p.type === "original").length}`
  );
  console.log(`Gallery Items: ${galleryItems.length}`);
  console.log(
    `Total Images Used: ${numberedImages.length + charminImages.length}`
  );

  return { shopProducts, galleryItems };
}

createCleanData().catch(console.error);
