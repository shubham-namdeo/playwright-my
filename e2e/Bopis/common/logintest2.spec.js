// login-multiple-users.spec.ts
import { test } from '@playwright/test';

const PASSWORD = 'user@2025';
const OMS_NAME = 'hacktoberfest-oms';

// Create users hacktoberfest.user01 ... hacktoberfest.user15
const users = Array.from({ length: 15 }, (_, i) =>
  `hacktoberfest.user${String(i + 1).padStart(2, '0')}`
);

// Optional: Run tests in parallel (remove if not needed)
// test.describe.configure({ mode: 'parallel' });

for (const username of users) {
  test(`Login test for ${username}`, async ({ page }) => {
    await page.goto('https://launchpad-dev.hotwax.io/');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('textbox', { name: 'OMS' }).fill(OMS_NAME);
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('https://fulfillment-dev.hotwax.io/');

    // ✅ Wait for 2 seconds after login
    await page.waitForTimeout(2000);

    // No need to close — Playwright handles it after each test
  });
}
