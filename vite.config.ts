import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import generouted from "@generouted/react-router/plugin";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
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
