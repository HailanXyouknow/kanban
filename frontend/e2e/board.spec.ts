import { expect, test } from "@playwright/test";

test("shows dummy board data", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("column-col-backlog")).toBeVisible();
  await expect(page.getByTestId("column-title-col-backlog")).toHaveText("Backlog");
  await expect(page.getByTestId("card-card-api-docs")).toContainText("Document public API");
  await expect(page.getByTestId("column-col-done")).toBeVisible();
});

test("renames a column", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("column-title-col-ready").click();
  await page.getByTestId("column-title-col-ready").fill("Up Next");
  await page.getByTestId("column-title-col-ready").press("Enter");
  await expect(page.getByTestId("column-title-col-ready")).toHaveText("Up Next");
});

test("adds a card", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("add-card-toggle-col-review").click();
  await page.getByTestId("add-card-title-col-review").fill("QA notes");
  await page.getByTestId("add-card-details-col-review").fill("Record remaining browser checks.");
  await page.getByTestId("add-card-submit-col-review").click();
  await expect(page.getByText("QA notes")).toBeVisible();
  await expect(page.getByText("Record remaining browser checks.")).toBeVisible();
});

test("deletes a card", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("delete-card-card-onboarding").click();
  await expect(page.getByTestId("card-card-onboarding")).toHaveCount(0);
});

test("drags a card to another column", async ({ page }) => {
  await page.goto("/");
  const card = page.getByTestId("card-card-empty-states");
  const target = page.getByTestId("column-col-progress");
  await card.dragTo(target);
  await expect(page.getByTestId("column-col-progress")).toContainText("Empty states copy");
  await expect(page.getByTestId("column-col-ready")).not.toContainText("Empty states copy");
});
