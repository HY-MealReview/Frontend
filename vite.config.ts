import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: "@apis", replacement: resolve(__dirname, "src/apis") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@constant", replacement: resolve(__dirname, "src/constant") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@store", replacement: resolve(__dirname, "src/store") },
      { find: "@type", replacement: resolve(__dirname, "src/type") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
    ],
  },
});
