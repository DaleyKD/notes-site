import { test, expect } from "@playwright/test";

test.describe("/career/act-i", () => {
  test("Jump to nav scrolls to the right section", async ({ page }) => {
    await page.goto("/career/act-i");
    const toc = page.getByRole("navigation", { name: "Jump to" });
    await expect(toc).toBeVisible();

    await toc.getByRole("link", { name: "Building the Help Desk" }).click();
    await expect(page).toHaveURL(/#building-the-help-desk$/);
    await expect(page.getByRole("heading", { name: "Building the Help Desk", level: 2 })).toBeInViewport();
  });
});
