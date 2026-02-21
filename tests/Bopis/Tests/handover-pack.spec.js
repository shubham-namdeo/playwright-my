import { test, expect } from '@playwright/test';
import { PackedOrderPage} from '../pages/orders/pack-orders.page';
import {PackedDetailPage } from '../pages/order-detail/pack-order-detail.page';
import { CompletedOrdersPage } from '../pages/orders/complete-orders.page';
import { OrderPage } from '../pages/orders/orders.page';

test('Steps to Handover the order from Orders list page', async ({ page }) => {
  const packedPage = new PackedOrderPage(page);
  const completedPage = new CompletedOrdersPage(page);
  const orderPage=new OrderPage(page);

  await page.goto(process.env.CURRENT_APP_URL);
  await packedPage.goToPackedTab();
  const orderName =await orderPage.getOrderName();
  await packedPage.clickHandover();
  await orderPage.verifySuccessToast();
  await completedPage.goToCompletedTab();
  // Assert order exists in completed tab
  const orderInCompleted = await completedPage.findCardByOrderName(orderName);
  await expect(orderInCompleted).toHaveCount(1);
});


test('Steps to Handover the order from Order Detail Packed page', async ({ page }) => {
  const packedPage = new PackedOrderPage(page);
  const packedDetailPage = new PackedDetailPage(page);
  const completedPage = new CompletedOrdersPage(page);
  const orderPage= new OrderPage(page);

  await page.goto(process.env.CURRENT_APP_URL);
  await packedPage.goToPackedTab();
  const orderName =await orderPage.getOrderName();

  await packedPage.openFirstOrderDetail();
  await packedDetailPage.verifyDetailPageVisible();
  await packedDetailPage.handoverOrder();
  // Switch to Completed tab
  await page.goBack();
  await completedPage.goToCompletedTab();
  // Assert order exists in completed tab
  const orderInCompleted = await completedPage.findCardByOrderName(orderName);
  await expect(orderInCompleted).toHaveCount(1);
});