import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "/vue-components/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue": "vue/dist/vue.esm-bundler.js",
      "devextreme/ui": 'devextreme/esm/ui'
    }
  },
  build: {
    rollupOptions: {
      treeshake:  false
    }
  }
});
