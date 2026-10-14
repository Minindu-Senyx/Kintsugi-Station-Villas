import { test } from "@playwright/test";

/*
 * Not an assertion test: it saves a full-page screenshot of every page to
 * e2e/screenshots/ (git-ignored) so a change can be checked by eye on desktop
 * and mobile. Run it alone with: npx playwright test e2e/screenshots.spec.ts
 */
const pages = ["/", "/villas", "/villas/avalon", "/villas/acland", "/gallery", "/about", "/contact", "/does-not-exist"];

for (const path of pages) {
  test(`screenshot ${path}`, async ({ page }, info) => {
    await page.goto(path);
    // Scroll through so the scroll-reveal animations have run, then back to the top.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(250);
    }
    // Headless Chrome can skip frames under load, so make sure every reveal has fired.
    await page
      .waitForFunction(() => !document.querySelector("[data-reveal]:not([data-shown])"), undefined, { timeout: 4000 })
      .catch(() => page.evaluate(() => document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => el.setAttribute("data-shown", ""))));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1800);
    const name = (path === "/" ? "home" : path.slice(1).replace(/\//g, "_")) + `.${info.project.name}.png`;
    await page.screenshot({ path: `e2e/screenshots/${name}`, fullPage: true });
  });
}
