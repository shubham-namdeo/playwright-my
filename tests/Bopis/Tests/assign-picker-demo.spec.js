import { test, expect } from '@playwright/test';

test('@demo Complete Picklist flow with picker assignment, rejection, and ready for pickup', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);

  // 1. Identify First Order Card
  const firstOrderCard = page.getByTestId('order-card').first();
  await expect(firstOrderCard).toBeVisible();

  // 2. Click the Print Picklist Button
  const printPicklistBtn = firstOrderCard.getByTestId('print-picklist-button');
  await expect(printPicklistBtn).toBeVisible();
  await printPicklistBtn.click();

  // 3. Assign a Picker from the Modal
  const assignPickerModal = page.getByTestId('assign-picker-modal-header');
  await expect(assignPickerModal).toBeVisible();

  const pickerRadio = page.getByTestId('assign-picker-radio').first();
  await pickerRadio.click();

  const assignPickerSaveBtn = page.getByTestId('assign-picker-save-button');
  await assignPickerSaveBtn.click();

  // 4. Picklist prints in new tab, verify
  const popup = await page.waitForEvent('popup');
  await popup.waitForLoadState();
  expect(popup.url()).toContain('blob');
  //await popup.close();
  await page.bringToFront();
  
  // 5. Move back to origin tab (already on page)

  // 6. Search the same order again
  const orderNameTag = await firstOrderCard.getByTestId('order-name-tag').textContent();
  const orderSearch = page.getByTestId('order-searchbar');
  await orderSearch.fill(orderNameTag || '');
  await orderSearch.press('Enter');

  // 7. Go to Order Detail Page
  const searchedOrderCard = page.getByTestId('order-card').first();
  await searchedOrderCard.click();

  // 8. Reject an Item in the Order
  const rejectButton = page.getByTestId('select-rejected-item-button').first();
  await expect(rejectButton).toBeVisible();
  await rejectButton.click();

  // Select "No Variance" as rejection reason
  const noVarianceReason = page.getByTestId('select-rejection-reason-button').filter({ hasText: 'No Variance' }).first();
  await expect(noVarianceReason).toBeVisible();
  await noVarianceReason.click();

  // Submit rejected items button (to confirm rejection)
  const submitRejectedItemsBtn = page.getByTestId('submit-rejected-items-button');
  await expect(submitRejectedItemsBtn).toBeVisible();
  await submitRejectedItemsBtn.click();

  // 9. Click the Print Picklist Button Again (on detail page)
  const printPicklistBtnDetail = page.getByTestId('print-picklist-button');
  await expect(printPicklistBtnDetail).toBeVisible();
  await printPicklistBtnDetail.click();

  // 10. Picklist prints in new tab, verify
  const popup2 = await page.waitForEvent('popup');
  await popup2.waitForLoadState();
  expect(popup2.url()).toContain('blob');
  await popup2.close();

  // 11. Move back to origin tab (detail page)

  // 12. Click the Ready for Pickup Button to Pack the Order
  const readyPickupBtn = page.getByTestId('ready-pickup-button');
  await expect(readyPickupBtn).toBeVisible();
  await readyPickupBtn.click();

  // 13. Click the “Ready for Pickup” Button in Confirmation Alert
  const confirmReadyPickupBtn = page.getByTestId('confirm-cancellation-button'); // update testid if needed
  await expect(confirmReadyPickupBtn).toBeVisible();
  await confirmReadyPickupBtn.click();

  // 14. Capture success label ready-handover-label for verification
  const successLabel = page.getByTestId('ready-handover-label');
  await expect(successLabel).toBeVisible();
  const labelText = await successLabel.textContent();
  expect(labelText?.toLowerCase()).toContain('ready');
});
