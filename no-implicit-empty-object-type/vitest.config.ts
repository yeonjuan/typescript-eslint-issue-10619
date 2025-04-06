import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: 'lib',
      formats: ['es', 'cjs'], 
    },
  },
  test: {
    exclude: ["lib", "node_modules/**"],
  },
});
