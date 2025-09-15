import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        gallery: resolve(__dirname, "gallery.html"),
        shop: resolve(__dirname, "shop.html"),
        collections: resolve(__dirname, "collections.html"),
        commissions: resolve(__dirname, "commissions.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        healing: resolve(__dirname, "healing.html"),
        product: resolve(__dirname, "product.html"),
        privacy: resolve(__dirname, "privacy.html"),
        returns: resolve(__dirname, "returns.html"),
        shipping: resolve(__dirname, "shipping.html"),
        terms: resolve(__dirname, "terms.html"),
      },
    },
  },
  publicDir: "public",
});
