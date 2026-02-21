import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

function loadSkusFromCSV() {
  const fileContent = fs.readFileSync('/Users/Shubham/Desktop/inventory_count_100.csv', 'utf8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });
  return records.map(record => record.idValue.toString());
}

test.setTimeout(30*60*1000);
test('Scan SKUs from CSV', async ({ page }) => {
  const skus = loadSkusFromCSV();

  await page.goto('https://inventorycount-dev.hotwax.io/');
  await page.getByRole('textbox', { name: 'OMS' }).fill('dev-oms');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('Hotwax@786');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Test AA').click();
  await page.getByPlaceholder('Scan or search products').click();

  for (const sku of skus) {
    await page.getByPlaceholder('Scan or search products').type(sku);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
  }
});
