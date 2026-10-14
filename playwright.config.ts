import { defineConfig, devices } from "@playwright/test";

const port = 3111;

/*
 * End-to-end tests run against a production build on :3111, in the installed
 * Google Chrome (no separate browser download). `npm run test:e2e` builds and
 * starts the site itself, or reuses a server that's already running there.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Real Chrome windows are heavy: a few at a time keeps the tests from timing out on a busy laptop.
  workers: 3,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  use: {
    baseURL: `http://localhost:${port}`,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  webServer: {
    command: `npm run build && npm run start -- -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
