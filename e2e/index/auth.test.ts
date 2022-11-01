import { test, expect } from "@playwright/test";

test.describe("The bingo game", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("http://localhost:3000/");
  });

  test("Should ask for username", async ({ page }) => {
    await expect(page.locator("label")).toContainText(/username/);
    await expect(page.locator("input")).toContainText("");
  });
});
