import { expect, test } from "@playwright/test";

const formsubmit = "https://formsubmit.co/ajax/**";

test.describe("contact form (formsubmit.co)", () => {
  test("sends the message to FormSubmit and shows a thank-you", async ({ page }) => {
    let payload: Record<string, string> | undefined;
    let target = "";
    await page.route(formsubmit, async (route) => {
      target = route.request().url();
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { success: "true", message: "ok" } });
    });

    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Ada Lovelace");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByLabel(/WhatsApp/).fill("+44 7700 900123");
    await page.getByLabel("Which villa?").selectOption("Villa Acland");
    await page.getByLabel("Your message").fill("Do you allow small dogs?");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("heading", { name: "Thank you, message sent" })).toBeVisible();
    expect(target).toBe("https://formsubmit.co/ajax/bpgunarathna@gmail.com");
    expect(payload).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "+44 7700 900123",
      villa: "Villa Acland",
      message: "Do you allow small dogs?",
      _cc: "kianog@gmail.com",
      _subject: "New message from the Kintsugi Station website",
    });
    expect(payload?._honey).toBe("");

    // "Send another message" brings back an empty form.
    await page.getByRole("button", { name: "Send another message" }).click();
    await expect(page.getByLabel("Your name")).toHaveValue("");
  });

  test("shows a helpful error when FormSubmit fails", async ({ page }) => {
    await page.route(formsubmit, (route) => route.fulfill({ status: 500, json: { success: "false" } }));
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Ada");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByLabel("Your message").fill("Hello");
    await page.getByRole("button", { name: "Send message" }).click();

    // (Next's route announcer is also an alert, so look inside the form.)
    const alert = page.locator("form").getByRole("alert");
    await expect(alert).toContainText("send");
    await expect(alert.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /wa\.me\/94779344582/);
    // What was typed is still there to resend.
    await expect(page.getByLabel("Your message")).toHaveValue("Hello");
  });

  test("silently drops spam that fills the hidden trap field", async ({ page }) => {
    let called = false;
    await page.route(formsubmit, (route) => {
      called = true;
      return route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Bot");
    await page.getByLabel("Email", { exact: true }).fill("bot@example.com");
    await page.getByLabel("Your message").fill("Buy now");
    await page.locator('input[name="_honey"]').evaluate((el: HTMLInputElement) => (el.value = "gotcha"));
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("heading", { name: "Thank you, message sent" })).toBeVisible();
    expect(called).toBe(false);
  });

  test("won't submit an empty or invalid form", async ({ page }) => {
    let called = false;
    await page.route(formsubmit, (route) => {
      called = true;
      return route.fulfill({ json: { success: "true" } });
    });
    await page.goto("/contact");
    await page.getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByLabel("Your name")).toBeFocused();
    expect(called).toBe(false);
  });

  test("falls back to a plain POST to FormSubmit without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/contact");
    const form = page.locator("form[action^='https://formsubmit.co/']");
    await expect(form).toHaveAttribute("action", "https://formsubmit.co/bpgunarathna@gmail.com");
    await expect(form).toHaveAttribute("method", /post/i);
    await expect(form.locator('input[name="_cc"]')).toHaveValue("kianog@gmail.com");
    await context.close();
  });
});
