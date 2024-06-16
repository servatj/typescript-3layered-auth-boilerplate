// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e", // Directory where your tests are located
  timeout: 30 * 1000, // Timeout per test (in milliseconds)

  use: {
    baseURL: "https://localhost:4000", // Your API's base URL
    extraHTTPHeaders: {
      Authorization: "Bearer YOUR_API_TOKEN",
    },
  },
});
