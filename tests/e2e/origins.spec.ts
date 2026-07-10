import { test, expect } from "@playwright/test";

test.describe("/career/origins", () => {
  test("Jump to nav scrolls to the right section", async ({ page }) => {
    await page.goto("/career/origins");
    const toc = page.getByRole("navigation", { name: "Jump to" });
    await expect(toc).toBeVisible();

    await toc.getByRole("link", { name: "The Live Wire" }).click();
    await expect(page).toHaveURL(/#the-live-wire$/);
    await expect(page.getByRole("heading", { name: "The Live Wire", level: 2 })).toBeInViewport();
  });
});
