import { expect, test } from "@playwright/test";

/*
 * The site's gentle motion: the shimmer across gold buttons, the slow settle on hero photos,
 * footer links that slide, underlines that draw in, and photos that ease towards you on hover.
 * These guard against the motion quietly disappearing in a redesign.
 */
const pages = ["/", "/villas", "/villas/avalon", "/villas/acland", "/gallery", "/about", "/contact", "/does-not-exist"];

for (const path of pages) {
  test(`every gold button has the shimmer: ${path}`, async ({ page }) => {
    await page.goto(path);
    const missing = await page.evaluate(() => {
      const gold = getComputedStyle(document.documentElement).getPropertyValue("--color-gold").trim();
      const probe = document.createElement("i");
      probe.style.color = gold;
      document.body.appendChild(probe);
      const goldRgb = getComputedStyle(probe).color;
      probe.remove();
      const out: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>("a, button")) {
        if (getComputedStyle(el).backgroundColor !== goldRgb) continue;
        if (el.getBoundingClientRect().width === 0) continue;
        // The shimmer is a ::after band; a button without it has no content there.
        if (getComputedStyle(el, "::after").content === "none") out.push((el.textContent || "").trim().slice(0, 30));
      }
      return out;
    });
    expect(missing, "gold buttons without the shimmer").toEqual([]);
  });
}

test("the shimmer plays when a gold button is hovered", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "hover is a pointer behaviour");
  await page.goto("/");
  const button = page.getByRole("link", { name: "Book Now" }).first();
  await button.hover();
  const animation = await button.evaluate((el) => getComputedStyle(el, "::after").animationName);
  expect(animation).toBe("sheen");
});

test("the visible hero photo settles in slowly", async ({ page }) => {
  await page.goto("/");
  const photo = page.locator('section[aria-roledescription="carousel"] img[alt]:not([alt=""])');
  expect(await photo.evaluate((el) => getComputedStyle(el).animationName)).toBe("settle");
  expect(await photo.evaluate((el) => parseFloat(getComputedStyle(el).animationDuration))).toBeGreaterThan(5);
});

test("footer links slide over on hover", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "hover is a pointer behaviour");
  await page.goto("/");
  const link = page.locator("footer nav a", { hasText: "Gallery" });
  await link.hover();
  await page.waitForTimeout(800);
  const shift = await link.evaluate((el) => parseFloat(getComputedStyle(el).translate.split(" ")[0]) || 0);
  expect(shift).toBeGreaterThan(0);
});

test("text links draw their underline in on hover", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "hover is a pointer behaviour");
  await page.goto("/");
  const link = page.getByRole("link", { name: "View all photos" });
  expect(await link.evaluate((el) => getComputedStyle(el).backgroundSize)).toMatch(/^0(px)? /);
  await link.hover();
  await page.waitForTimeout(800);
  expect(await link.evaluate((el) => getComputedStyle(el).backgroundSize)).toMatch(/^100% 1px$/);
});

test("photos ease towards you on hover", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "hover is a pointer behaviour");
  await page.goto("/");
  const tile = page.locator("main section div.group", { has: page.locator("img") }).first();
  await tile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800); // let the reveal finish
  await tile.hover();
  await page.waitForTimeout(1300);
  const scale = await tile.locator("img").evaluate((el) => parseFloat(getComputedStyle(el).scale) || 1);
  expect(scale).toBeGreaterThan(1);
});
