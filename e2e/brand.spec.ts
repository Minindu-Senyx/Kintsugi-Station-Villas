import { expect, test } from "@playwright/test";

test.describe("logo", () => {
  test("header and footer show the logo and it links home", async ({ page }) => {
    await page.goto("/about");
    const links = page.getByRole("link", { name: "Kintsugi Station Villas, Sri Lanka: home" });
    await expect(links).toHaveCount(2); // header + footer
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", "/");
      const img = link.locator("img");
      await expect(img).toBeVisible();
      // The picture actually loaded (not a broken image).
      expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  });

  test("the header logo stays inside the header on every page width", async ({ page }) => {
    await page.goto("/");
    const header = await page.locator("header").boundingBox();
    const logo = await page.locator("header a[aria-label^='Kintsugi Station Villas']").boundingBox();
    expect(logo!.y).toBeGreaterThanOrEqual(header!.y);
    expect(logo!.y + logo!.height).toBeLessThanOrEqual(header!.y + header!.height);
  });

  test("favicon and social card use the logo files, and the files exist", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon/);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/assets\/brand\/og-image\.jpg$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    for (const path of ["/assets/brand/og-image.jpg", "/assets/brand/kintsugi-station-villas-logo-720.webp", "/assets/brand/kintsugi-station-villas-logo.png"]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });
});
