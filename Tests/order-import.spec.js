import { test, expect } from '@playwright/test';

test.setTimeout(5 * 60 * 1000);
test('test', async ({ page }) => {
  await page.goto('https://hc-sandbox.myshopify.com/');
  await page.getByRole('link', { name: 'Catalog' }).click();
  //await page.getByRole('listitem').filter({ hasText: 'Abominable Hoodie Abominable Hoodie Regular price from $69.00 Sale price from $' }).locator('#hc_preorderButton').click();
  //await page.getByRole('link', { name: 'Catalog' }).click();
  //await page.getByRole('listitem').filter({ hasText: 'Ajax Full-Zip Sweatshirt Ajax' }).locator('#hc_preorderButton').click();
  //await page.getByRole('link', { name: 'Catalog' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Ajax Full-Zip Sweatshirt Ajax' }).locator('#hc_preorderButton').click();
  //await page.getByRole('link', { name: 'Catalog' }).click();
  //await page.getByRole('listitem').filter({ hasText: 'Abominable Hoodie Abominable Hoodie Regular price from $69.00 Sale price from $' }).locator('#hc_preorderButton').click();
  await page.getByRole('button', { name: 'Check out' }).click();
  await page.getByRole('textbox', { name: 'Email or mobile phone number' }).click();
  await page.getByRole('textbox', { name: 'Email or mobile phone number' }).fill('blt@gmail.com');
  await page.getByLabel('Country/Region').first().selectOption('United States');
  await page.getByRole('textbox', { name: 'First name (optional)' }).click();
  await page.getByRole('textbox', { name: 'First name (optional)' }).fill('Black');
  await page.getByRole('textbox', { name: 'First name (optional)' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Thunder');
  await page.getByRole('textbox', { name: 'Address' }).click();
  await page.getByRole('textbox', { name: 'Address' }).fill('123-St');
  await page.getByRole('textbox', { name: 'Apartment, suite, etc. (' }).click();
  await page.getByRole('textbox', { name: 'Apartment, suite, etc. (' }).fill('App Suite');
  await page.getByRole('textbox', { name: 'City' }).click();
  await page.getByRole('textbox', { name: 'City' }).fill('New York');
  await page.getByLabel('State').selectOption('New York');
  await page.getByRole('textbox', { name: 'ZIP code' }).click();
  await page.getByRole('textbox', { name: 'ZIP code' }).fill('10001');
  await page.waitForTimeout(4000);
// Card Number
const cardFrame = page.frameLocator('iframe[name^="card-fields-number"]');
await cardFrame.getByRole('textbox', { name: 'Card number' }).click();
await cardFrame.getByRole('textbox', { name: 'Card number' }).fill('1');

// Expiration Date
const expiryFrame = page.frameLocator('iframe[name^="card-fields-expiry"]');
await expiryFrame.getByRole('textbox', { name: 'Expiration date (MM / YY)' }).click();
await expiryFrame.getByRole('textbox', { name: 'Expiration date (MM / YY)' }).fill('08 / 89');

// Security Code
const cvvFrame = page.frameLocator('iframe[name^="card-fields-verification_value"]');
await cvvFrame.getByRole('textbox', { name: 'Security code' }).click();
await cvvFrame.getByRole('textbox', { name: 'Security code' }).fill('123');
await page.waitForTimeout(3000);
const standardRadio = page.getByRole('radio', { name: 'Standard' });
if (await standardRadio.count() > 0) {
  // Element exists, safe to interact
  await standardRadio.check();
} else {
  console.warn('Standard radio button not found, skipping...');
}
await page.getByRole('button', { name: 'Pay now' }).click();
await page.waitForTimeout(11000);

});