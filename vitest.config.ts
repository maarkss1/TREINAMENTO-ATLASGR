import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["apps/portal/**/*.test.ts", "packages/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/e2e/**", "**/*.spec.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./apps/portal"),
    },
  },
});
