import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true
    }
  },
  plugins: [
    dts({
      tsconfigPath: "tsconfig.build.json",
      entryRoot: "src",
      outputDir: "dist",
      exclude: ["src/__tests__"],
      copyDtsFiles: false
    })
  ]
})
