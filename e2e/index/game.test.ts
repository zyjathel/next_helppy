import { test, expect } from "@playwright/test";

test.describe("The bingo game", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("http://localhost:3000/");
    await page.type("input", "user");
    await page.keyboard.press("Enter");
  });

  test("Should show username in the heading", async ({ page }) => {
    await expect(page.locator("role=navigation")).toContainText(/user/);
    await expect(page.locator("input")).toContainText("");
  });

  test("Should show the `restart` button", async ({ page }) => {
    await expect(page.locator("text='Restart'")).toBeVisible();
  });

  test("Should show the `next` button", async ({ page }) => {
    await expect(page.locator("text='Next'")).toBeVisible();
  });
});
