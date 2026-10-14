import { expect, test } from "@playwright/test";

test("skip link jumps to the main content", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "needs a keyboard");
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});

test.describe("Villas menu", () => {
  test("desktop dropdown lists both villas and works from the keyboard", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop navigation only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Show villas" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.focus();
    await page.keyboard.press("ArrowDown");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: /Avalon Villa\s*3 bedrooms · sleeps 6/ })).toBeFocused();
    await expect(page.getByRole("link", { name: /Villa Acland\s*1 bedroom · sleeps 2/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Both villas together\s*4 bedrooms · sleeps 8/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();

    await toggle.click();
    await page.getByRole("link", { name: /Villa Acland\s*1 bedroom/ }).click();
    await expect(page).toHaveURL(/\/villas\/acland$/);
    await expect(page.getByRole("heading", { level: 1, name: "Villa Acland" })).toBeVisible();
    // The menu closes after navigating.
    await expect(page.getByRole("button", { name: "Show villas" })).toHaveAttribute("aria-expanded", "false");
  });

  test("desktop dropdown opens on hover", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "hover is a desktop behaviour");
    await page.goto("/");
    await page.getByRole("link", { name: "Villas", exact: true }).hover();
    await expect(page.getByRole("link", { name: /Avalon Villa\s*3 bedrooms/ })).toBeVisible();
  });

  test("mobile menu lists both villas", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: "Mobile" });
    await expect(nav.getByRole("link", { name: /Avalon Villa/ })).toBeVisible();
    await expect(nav.getByRole("link", { name: /Villa Acland/ })).toBeVisible();
    await expect(nav.getByRole("link", { name: /Both villas together/ })).toBeVisible();
  });
});
