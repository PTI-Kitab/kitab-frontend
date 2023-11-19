import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import generouted from "@generouted/react-router/plugin";
import { resolve } from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generouted(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@context": resolve(__dirname, "./src/context"),
    },
  },
});
