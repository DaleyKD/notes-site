import { test, expect } from "@playwright/test";

test.describe("/managers", () => {
  test("renders and links back to /career", async ({ page }) => {
    await page.goto("/managers");
    await expect(page.getByRole("heading", { name: "Managers Who Have Influenced Me", level: 1 })).toBeVisible();
    await page.getByRole("link", { name: /Back to My Career/ }).click();
    await expect(page).toHaveURL(/\/career$/);
  });
});
