// tests/order-journey.spec.js
import { test, expect } from '@playwright/test';
import { OpenOrderPage } from '../pages/orders/open-orders.page';
import { OpenDetailPage } from '../pages/order-detail/open-order-detail.page';
import { PackedOrderPage } from '../pages/orders/pack-orders.page';
import { PackedDetailPage } from '../pages/order-detail/pack-order-detail.page';
import { CompletedOrdersPage } from '../pages/orders/complete-orders.page';
import { OrderPage } from '../pages/orders/orders.page';

test('@Flow: Order Journey', async ({ page }) => {
  const openPage = new OpenOrderPage(page);
  const openDetail = new OpenDetailPage(page);
  const packedPage = new PackedOrderPage(page);
  const packedDetail = new PackedDetailPage(page);
  const completedPage = new CompletedOrdersPage(page);
  const orderPage = new OrderPage(page);

  await page.goto(process.env.CURRENT_APP_URL);

  // 1. Navigate to Open Tab
  await openPage.goToOpenTab();
  
  const firstCard = await orderPage.getFirstOrderCard();

  /* 2. Find order card by name */
  const orderName = 'HCDEV#4152';
  const orderCard = await orderPage.findCardByOrderName(orderName);
  //const orderName = await orderPage.getOrderName(firstCard);
  console.log('Order Name:', orderName);

  // 3. Assign Picker and Print Picklist
  await openPage.markReadyForPickup();
  await openPage.assignPickerAndSave(0);
  await page.waitForTimeout(2000);  
  await page.bringToFront();
  await firstCard.click();

  // Verify Detail Page
  await openDetail.verifyDetailPage();
  // Reject one item from multiple
  await openDetail.rejectOneItemFromMultiple();

  // 5. Reprint Picklist
  await page.waitForTimeout(2000);
  await openDetail.printPicklist();
  await page.waitForTimeout(2000);
  await page.bringToFront();

  // 6. Mark Ready for Pickup
  await openDetail.markReadyForPickup();
  await openDetail.confirmReadyPickupAlert();

  // 7. Go back to list, move to Packed Tab

  await page.waitForTimeout(5000);
  await orderPage.pageGoback();
  await packedPage.goToPackedTab();

  // 8. Find and click the same order in packed tab
  const packedCard = await orderPage.findCardByOrderName(orderName);
  await packedCard.click();


  // 9. Cancel an item
  await page.waitForTimeout(5000);
  await packedDetail.cancelOneItemFromMultiple();

  // 10. Print Packing Slip
  await packedDetail.printPackingSlipFromDetail();
  await page.waitForTimeout(2000);
  await page.bringToFront();  

  // 11. Handover order
  await packedDetail.handoverOrder();

  // 12. Go back, move to Completed tab, verify order
  await orderPage.pageGoback();
  await completedPage.goToCompletedTab();
  const orderInCompleted = await orderPage.searchByOrderName(orderName);
  await expect(orderInCompleted).toHaveCount(1);
});