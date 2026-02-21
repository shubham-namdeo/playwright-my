import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const inputCsvPath = '/Users/Shubham/Downloads/inventory_count_import_large.csv';
const outputCsvPath = '/Users/Shubham/Desktop/inventory_count_output.csv';

// 1️⃣ Load CSV
function loadCsv() {
  const fileContent = fs.readFileSync(inputCsvPath, 'utf8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}

// 2️⃣ Save updated CSV
function saveCsv(data) {
  const csvContent = stringify(data, {
    header: true,
    columns: Object.keys(data[0]),
  });
  fs.writeFileSync(outputCsvPath, csvContent, 'utf8');
}

test.setTimeout(40 * 60 * 1000);

test('Scan and update SKUs in CSV', async ({ page }) => {
  const skuRecords = loadCsv();

  await page.goto('https://inventorycount-dev.hotwax.io/');
  await page.getByRole('textbox', { name: 'OMS' }).fill('dev-oms');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('john.doe');
  await page.getByRole('textbox', { name: 'Password' }).fill('Hotwax@786');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByText('Test 171').click();
  await page.waitForTimeout(9000);

  const scanInput = page.getByPlaceholder('Scan or search products');
  await scanInput.click();

  // 3️⃣ Loop through SKUs and update status
  for (const record of skuRecords) {
    const sku = record.idValue?.toString().trim();

    try {
      await scanInput.type(sku);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      record.status = 'Scanned';
    } catch (err) {
      record.status = 'Failed';
      console.error(`❌ Failed: ${sku}`, err);
    }
  }

  // 4️⃣ Save updated CSV
  saveCsv(skuRecords);
  console.log(`📝 Updated CSV saved to: ${outputCsvPath}`);
});