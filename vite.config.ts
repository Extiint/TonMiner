import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    // Specify extensions to automatically resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  base: "/TonMiner/",
});

