import { test, expect } from "@playwright/test";

test("Sentry error flow", async ({ page }) => {
    // Navigate to the page
    await page.goto("/sentry-example-page");

    // Ensure the page has the default content loaded
    await expect(page.getByText("Get started by sending us a sample error")).toBeVisible();
    const errorButton = page.getByRole("button", { name: "Throw error!" });
    await expect(errorButton).toBeVisible();
});
