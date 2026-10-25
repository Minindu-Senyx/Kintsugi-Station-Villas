import { expect, test, type Page } from "@playwright/test";

/*
 * The home hero carousel. A fake clock stands in for the 6-second wait between photos:
 * it is frozen as soon as it is installed, so only `runFor` ever moves time on.
 */
const PHOTOS = 5;

async function freezeClock(page: Page) {
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 1000));
}
const status = (page: Page) => page.locator('section[aria-roledescription="carousel"] p.sr-only');
const hero = (page: Page) => page.locator('section[aria-roledescription="carousel"]');
const photo = (n: number) => `Photo ${n} of ${PHOTOS}`;

test.describe("hero carousel", () => {
  test.beforeEach(async ({ page }) => {
    await freezeClock(page);
    await page.goto("/");
    // Keep the pointer away from the controls so hovering doesn't pause it.
    await page.mouse.move(2, 2);
  });

  test("rotates through every photo by itself and starts over", async ({ page }) => {
    await expect(status(page)).toContainText(photo(1));
    for (let n = 2; n <= PHOTOS; n++) {
      await page.clock.runFor(6100);
      await expect(status(page)).toContainText(photo(n));
    }
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(1));
  });

  test("keeps rotating after the visitor clicks around the booking bar", async ({ page }) => {
    await page.getByRole("button", { name: /^Guests/ }).click();
    await page.keyboard.press("Escape");
    await page.mouse.move(2, 2);
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(2));
  });

  test("loads only the first photo up front, the rest after the page settles", async ({ page }) => {
    await expect(hero(page).locator("img")).toHaveCount(1);
    await page.clock.runFor(1600);
    await expect(hero(page).locator("img")).toHaveCount(PHOTOS);
  });

  test("has previous, next and per-photo controls", async ({ page }) => {
    await page.getByRole("button", { name: "Next photo" }).click();
    await expect(status(page)).toContainText(photo(2));
    await page.getByRole("button", { name: "Previous photo" }).click();
    await expect(status(page)).toContainText(photo(1));
    await page.getByRole("button", { name: `Show photo 3 of ${PHOTOS}` }).click();
    await expect(status(page)).toContainText(photo(3));
    await expect(page.getByRole("button", { name: `Show photo 3 of ${PHOTOS}` })).toHaveAttribute("aria-current", "true");
    // Going back past the first wraps to the last.
    await page.getByRole("button", { name: `Show photo 1 of ${PHOTOS}` }).click();
    await page.getByRole("button", { name: "Previous photo" }).click();
    await expect(status(page)).toContainText(photo(PHOTOS));
  });

  test("Pause stops it and Play starts it again", async ({ page }) => {
    await page.getByRole("button", { name: "Pause slideshow" }).click();
    await expect(page.getByRole("button", { name: "Play slideshow" })).toBeVisible();
    await page.mouse.move(2, 2);
    await page.clock.runFor(20000);
    await expect(status(page)).toContainText(photo(1));

    await page.getByRole("button", { name: "Play slideshow" }).click();
    await page.mouse.move(2, 2);
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(2));
  });

  test("holds still while the pointer is on the controls and resumes when it leaves", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "hover is a pointer behaviour");
    await page.getByRole("button", { name: "Next photo" }).hover();
    await page.clock.runFor(14000);
    await expect(status(page)).toContainText(photo(1));
    await page.mouse.move(2, 2);
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(2));
  });

  test("keeps rotating when the pointer is simply resting on the photo", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "hover is a pointer behaviour");
    await hero(page).hover({ position: { x: 700, y: 60 } });
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(2));
  });

  test("only the visible photo has alt text", async ({ page }) => {
    await page.clock.runFor(1600);
    const alts = await hero(page).locator("img").evaluateAll((imgs) => imgs.map((i) => i.getAttribute("alt")));
    expect(alts.filter(Boolean)).toHaveLength(1);
  });
});

test.describe("hero carousel with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("still rotates, swapping photos instantly instead of fading", async ({ page }) => {
    await freezeClock(page);
    await page.goto("/");
    await page.mouse.move(2, 2);
    await expect(page.getByRole("button", { name: "Pause slideshow" })).toBeVisible();
    await page.clock.runFor(1600);
    // The fade is switched off: the photos change with no transition time.
    const duration = await hero(page).locator("img").first().evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(parseFloat(duration)).toBeLessThan(0.05);
    await page.clock.runFor(6100);
    await expect(status(page)).toContainText(photo(2));
  });
});
