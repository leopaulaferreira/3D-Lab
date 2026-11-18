import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: "http://127.0.0.1:3108" },
  webServer: {
    command: "npm run start -- --port 3108",
    url: "http://127.0.0.1:3108",
    reuseExistingServer: false,
  },
});
