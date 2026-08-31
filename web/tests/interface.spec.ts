import { expect, test } from "@playwright/test";

test("exposes a regression matrix and its evidence trace", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SYNTHETIC SUITE")).toBeVisible();
  await page.getByRole("button", { name: /Required abstention/ }).click();
  await expect(page.getByText("Candidate answered two fixtures")).toBeVisible();
  await page.getByRole("button", { name: "Failure trace" }).click();
  await expect(page.getByRole("complementary").getByText("Failure trace", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Empty state" }).click();
  await expect(page.getByText("No comparison selected")).toBeVisible();
});

test("is keyboard reachable and has no page-level overflow", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to evaluation matrix" })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});
