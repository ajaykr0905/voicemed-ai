import { expect, test } from "@playwright/test";

test("synthetic workflow requires review before export", async ({ page }) => {
  await page.goto("/console");
  await expect(page.getByRole("heading", { name: "Documentation Lab" })).toBeVisible();
  await page.getByRole("button", { name: "Run synthetic example" }).click();
  await expect(page.getByRole("heading", { name: "Unreviewed draft" })).toBeVisible();
  const download = page.getByRole("button", { name: "Download reviewed draft" });
  await expect(download).toBeDisabled();
  await page.getByRole("checkbox").check();
  await expect(download).toBeEnabled();
});

test("public safety boundary is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Human reviewed AI documentation lab")).toBeVisible();
  await page.goto("/reports");
  await expect(page.getByRole("heading", { name: "Session only by design" })).toBeVisible();
});
