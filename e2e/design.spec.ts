import { expect, test } from "@playwright/test";

/* The site's design rules, checked on every page at desktop and phone width. */
const pages = ["/", "/villas", "/villas/avalon", "/villas/acland", "/gallery", "/about", "/contact"];

for (const path of pages) {
  test.describe(path, () => {
    test("fits the screen, has one h1 and a main landmark", async ({ page }) => {
      await page.goto(path);
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth, "horizontal overflow").toBeLessThanOrEqual(innerWidth);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main-content")).toHaveCount(1);
    });

    test("has no decorative icons: icons are only used inside controls", async ({ page }) => {
      // The About page keeps its original gold-vein artwork on purpose.
      test.skip(path === "/about", "About keeps its original artwork");
      await page.goto(path);
      const loose = await page.evaluate(() =>
        [...document.querySelectorAll("svg")]
          // An icon is fine inside a button, or as the arrow drawn over a native <select>.
          .filter((svg) => !svg.closest("button") && !svg.parentElement?.querySelector("select"))
          .map((svg) => svg.outerHTML.slice(0, 80)),
      );
      expect(loose).toEqual([]);
    });

    test("every control is at least 24px tall and wide", async ({ page }) => {
      await page.goto(path);
      const small = await page.evaluate(() => {
        const out: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>("a[href], button, input:not([type=hidden]), select, textarea")) {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (r.width === 0 || r.height === 0 || style.visibility === "hidden") continue;
          if (r.width >= 24 && r.height >= 24) continue;
          // Links inside a sentence are exempt (WCAG 2.5.8): skip inline links that sit in running text.
          const inSentence =
            el.tagName === "A" &&
            style.display === "inline" &&
            (el.parentElement?.textContent ?? "").trim().length > (el.textContent ?? "").trim().length + 10;
          if (inSentence) continue;
          if (el.closest(".skip-link")) continue;
          out.push(`${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
        return out;
      });
      expect(small).toEqual([]);
    });
  });
}

test("home hero is a real villa photograph that loads", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("main section").first().locator("img").first();
  await expect(hero).toHaveAttribute("src", /\/assets\/images\/villas\//);
  expect(await hero.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
});

test("the header logo bleeds off the left edge of the screen", async ({ page }) => {
  await page.goto("/");
  const logo = await page.locator("header a[aria-label^='Kintsugi Station Villas']").boundingBox();
  expect(logo!.x).toBeLessThanOrEqual(1);
});
