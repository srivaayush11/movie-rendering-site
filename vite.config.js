import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      pngquant: {
        quality: [0.6, 0.8], // Sets the compression level for PNG images
      },
      mozjpeg: {
        quality: 75, // Set quality for JPEG images
      },
      gifsicle: {
        optimizationLevel: 3, // Set optimization level for GIF images
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
      webp: {
        quality: 75, // Convert images to WebP format
      },
    }),
  ],
});
