//https://onderonur.netlify.app/blog/creating-a-typescript-library-with-vite/

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [
    dts(),
    basicSsl({
      /** name of certification */
      name: "test",
      /** custom trust domains */
      domains: ["*.custom.com"],
      /** custom certification directory */
      certDir: "/Users/.../.devServer/cert",
    }),
  ],
  server: {
    https: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "clickableboxmanager",
      fileName: "clickableboxmanager",
    },
  },
});
