import { expect, test } from "@playwright/test";

test("exposes a regression matrix and its evidence trace", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SYNTHETIC SUITE")).toBeVisible();
  await expect(page.getByRole("button", { name: /EV-042 Required abstention\. Baseline 94\.0\. Candidate 91\.7\. Threshold 93\.0\. Gate HOLD\./ })).toBeVisible();
  await page.getByRole("button", { name: /Required abstention/ }).click();
  await expect(page.getByText("Candidate answered two fixtures")).toBeVisible();
  await page.getByRole("button", { name: "Failure trace" }).click();
  await expect(page.getByRole("complementary").getByText("Failure trace", { exact: true })).toBeVisible();
  await expect(page.getByRole("complementary").getByText("SYN-077 · answered without evidence")).toBeVisible();
  await page.getByRole("button", { name: "Empty state" }).click();
  await expect(page.getByText("No evaluation evidence is loaded.")).toBeVisible();
  await expect(page.getByRole("complementary")).toHaveCount(0);
  await expect(page.getByText("Promotion remains blocked")).toHaveCount(0);
});

test("is keyboard reachable and has no page-level overflow", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to evaluation matrix" })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test("associates the selected trace with its mobile row", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const row = await page.getByRole("button", { name: /Required abstention/ }).boundingBox();
  const trace = await page.locator(".inline-trace").boundingBox();
  expect(row).not.toBeNull();
  expect(trace).not.toBeNull();
  expect(trace!.y - (row!.y + row!.height)).toBeLessThan(12);
});
