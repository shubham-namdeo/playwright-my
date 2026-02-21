import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://launchpad.hotwax.io/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'OMS' }).click();
  await page.getByRole('textbox', { name: 'OMS' }).fill('hacktoberfest-oms');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('hacktoberfest.user01');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user@2025');
  await page.getByRole('button', { name: 'Login' }).click();
});