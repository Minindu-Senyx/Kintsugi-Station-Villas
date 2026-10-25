import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Never leave the site: answer Airbnb with an empty page.
  await context.route("https://www.airbnb.com/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "<title>Airbnb</title>" }),
  );
});

test("home booking bar opens the chosen Airbnb listing with dates and guests", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Villa/ }).click();
  await page.getByRole("button", { name: /Villa Acland/ }).click();
  await page.getByLabel("Check-in date").fill("2027-02-10");
  await page.getByLabel("Check-out date").fill("2027-02-14");

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole("button", { name: "Book on Airbnb" }).click(),
  ]);
  const url = new URL(popup.url());
  expect(url.origin + url.pathname).toBe("https://www.airbnb.com/rooms/1253403062767505407");
  expect(url.searchParams.get("check_in")).toBe("2027-02-10");
  expect(url.searchParams.get("check_out")).toBe("2027-02-14");
  expect(url.searchParams.get("adults")).toBe("2");
});

test("a smaller villa caps the party size", async ({ page }) => {
  await page.goto("/");
  // Both villas together sleep 8; the default Avalon only sleeps 6.
  await page.getByRole("button", { name: /^Villa/ }).click();
  await page.getByRole("button", { name: /Both Villas/ }).click();
  await page.getByRole("button", { name: /^Guests/ }).click();
  await expect(page.getByRole("button", { name: "9 guests" })).toHaveCount(0);
  await page.getByRole("button", { name: "8 guests" }).click();
  await page.getByRole("button", { name: /^Villa/ }).click();
  await page.getByRole("button", { name: /Villa Acland/ }).click();
  await expect(page.getByRole("button", { name: /^Guests/ })).toContainText("2 guests");
});

test("every Book button on the villas page goes to Airbnb", async ({ page }) => {
  await page.goto("/villas");
  // Only the booking buttons in the page body (the footer's link goes to the booking section instead).
  const links = page.locator("main a", { hasText: "Book on Airbnb" });
  const count = await links.count();
  expect(count).toBeGreaterThanOrEqual(5);
  for (let i = 0; i < count; i++) {
    await expect(links.nth(i)).toHaveAttribute("href", /^https:\/\/www\.airbnb\.com\/rooms\/\d+$/);
    await expect(links.nth(i)).toHaveAttribute("target", "_blank");
    await expect(links.nth(i)).toHaveAttribute("rel", /noopener/);
  }
});

test("header Book on Airbnb lands on the three listings", async ({ page, isMobile }) => {
  await page.goto("/gallery");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("header").getByRole("link", { name: "Book on Airbnb" }).first().click();
  await expect(page).toHaveURL(/\/villas#book$/);
  await expect(page.getByRole("heading", { name: "Book on Airbnb" })).toBeVisible();
});
