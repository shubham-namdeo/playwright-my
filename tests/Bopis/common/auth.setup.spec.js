// tests/auth.setup.spec.js
const { test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');
fs.mkdirSync(path.dirname(authFile), { recursive: true });

test('login via UI and save storage state', async ({ page }) => {
  await page.goto(process.env.LOGIN_URL);
  await page.getByRole('textbox', { name: 'OMS' }).fill('dev-oms');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto(process.env.CURRENT_APP_URL);
  await page.waitForLoadState('networkidle');

  await page.context().storageState({ path: authFile });
});