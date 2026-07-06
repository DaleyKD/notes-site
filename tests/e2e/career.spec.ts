import { test, expect } from "@playwright/test";

test.describe("/career", () => {
  test("renders the intro and both TOCs", async ({ page }) => {
    await page.goto("/career");
    await expect(page.getByRole("heading", { name: "My Career", level: 1 })).toBeVisible();
    await expect(page.getByText("My career has taken a path")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "By the Résumé" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Chronologically" })).toBeVisible();
  });

  test("links to the managers page", async ({ page }) => {
    await page.goto("/career");
    await page.getByRole("link", { name: /Managers Who Have Influenced Me/ }).click();
    await expect(page).toHaveURL(/\/managers$/);
    await expect(page.getByRole("heading", { name: "Managers Who Have Influenced Me", level: 1 })).toBeVisible();
  });

  test("chronological TOC links to the Origins chapter", async ({ page }) => {
    await page.goto("/career");
    await page.getByRole("link", { name: "Origins: Hall C" }).click();
    await expect(page).toHaveURL(/\/career\/origins$/);
  });

  test("chronological TOC links to the Act stubs", async ({ page }) => {
    await page.goto("/career");
    await page.locator('a[href="/career/act-i"]').click();
    await expect(page).toHaveURL(/\/career\/act-i$/);
    await expect(page.getByRole("heading", { name: "An Unexpected Fork", level: 1 })).toBeVisible();

    await page.goto("/career");
    await page.locator('a[href="/career/act-ii"]').click();
    await expect(page).toHaveURL(/\/career\/act-ii$/);

    await page.goto("/career");
    await page.locator('a[href="/career/act-iii"]').click();
    await expect(page).toHaveURL(/\/career\/act-iii$/);
  });

  test("TOCs sit side by side on wide viewports", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto("/career");
    const resumeBox = await page.getByRole("navigation", { name: "By the Résumé" }).boundingBox();
    const chaptersBox = await page.getByRole("navigation", { name: "Chronologically" }).boundingBox();
    expect(resumeBox).not.toBeNull();
    expect(chaptersBox).not.toBeNull();
    // Side by side: roughly the same vertical position, different horizontal position.
    expect(Math.abs(resumeBox!.y - chaptersBox!.y)).toBeLessThan(5);
    expect(chaptersBox!.x).toBeGreaterThan(resumeBox!.x + resumeBox!.width - 5);
  });

  test("TOCs stack vertically on narrow viewports", async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto("/career");
    const resumeBox = await page.getByRole("navigation", { name: "By the Résumé" }).boundingBox();
    const chaptersBox = await page.getByRole("navigation", { name: "Chronologically" }).boundingBox();
    expect(resumeBox).not.toBeNull();
    expect(chaptersBox).not.toBeNull();
    // Stacked: chapters TOC starts below the resume TOC, roughly the same horizontal position.
    expect(chaptersBox!.y).toBeGreaterThan(resumeBox!.y + resumeBox!.height - 5);
    expect(Math.abs(resumeBox!.x - chaptersBox!.x)).toBeLessThan(5);
  });
});
