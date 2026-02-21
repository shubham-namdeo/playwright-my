/*import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';

//  TODO: Need to Work on this to  use OrderName

// Gift Card Activation Packed List page 
test('Gift Card Activation Packed Tab - List Page', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);
  await page.waitForLoadState('networkidle');

  const bopis = new BopisOrdersPage(page);
  // Go to Packed tab
  await bopis.goToPackedTab();
  // Order Cards locator
  const orderCards = page.getByTestId('order-card');
  // Filter to cards that contain a gift-card-activation-button
  const giftCardOrders = orderCards.filter({
    has: page.getByTestId('gift-card-activation-button')
  });

  // Get the first matching card
  const firstGiftCard = giftCardOrders.first()
  await expect(firstGiftCard).toBeVisible();

  /*const orderName='HCDEV#'
  // Or Either we can do it with OrderName 
  const firstGiftCard=orderCards.filter({
    hasText:orderName
  })

  const giftcardIcon=firstGiftCard.getByTestId('gift-card-activation-button').first();
  await giftcardIcon.click();

  // Wait for the modal
  const giftcardModal = page.getByTestId('giftcard-activation-modal-header');
  await expect(giftcardModal).toBeVisible();

  // After giftcardModal is visible:
  const giftcardInput = page.getByTestId('giftcard-activation-input');
  const giftcardLabel = page.getByTestId('giftcard-activation-label');

  await Promise.race([
  giftcardInput.first()
    .waitFor({ state: 'visible', timeout: 2000 })
    .catch((err) => {
      console.warn('Giftcard input not visible within timeout:', err.message);
    }),
  giftcardLabel.first()
    .waitFor({ state: 'visible', timeout: 2000 })
    .catch((err) => {
      console.warn('Giftcard label not visible within timeout:', err.message);
    })
  ]);

  const hasInput = await giftcardInput.isVisible();
  const hasLabel = await giftcardLabel.isVisible();
  expect(hasInput || hasLabel).toBe(true);

  if (hasInput) {
    // Input is present — fill and save
    await giftcardInput.click();
    await giftcardInput.type('mygiftcard123'); 
    await bopis.clickByTestId('giftcard-activation-save-button');
    await bopis.clickByRole('button','Activate');

  } else if (hasLabel) {
    // Already filled, just close    
    await bopis.clickByTestId('giftcard-activation-close-button', 0, giftcardModal);
  } else {
    throw new Error('No input or label found in giftcard modal');
  }

});

// Gift Card Activation Packed Detail page 
test(' Gift Card Activation Packed Tab - Detail Page', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);
  await page.waitForLoadState('networkidle');

  const bopis = new BopisOrdersPage(page);
  // Go to Packed tab
  await bopis.goToPackedTab();
  // Order Cards locator
  const orderCards = page.getByTestId('order-card');
  
  /*Filter to cards that contain a gift-card-activation-button
  const orderName='HCDEV#3843';
  const giftCardOrders = orderCards.filter({
  hasText: orderName
  });

  const giftCardOrders = orderCards.filter({
  has: page.getByTestId('gift-card-activation-button')
  });

  // Get the first matching card
  const firstgiftCard = giftCardOrders.first()
  await expect(firstgiftCard).toBeVisible();
  await firstgiftCard.click();

  const detailPage= page.getByTestId('order-details-page');
  await expect(detailPage).toBeVisible();
  
  // Click the gift card activation button on Detail page
  await bopis.clickByTestId('gift-card-activation-button', 0, detailPage);

  const giftcardModal = page.getByTestId('giftcard-activation-modal-header');
  await expect(giftcardModal).toBeVisible();

  // After giftcardModal is visible:
  const giftcardInput = page.getByTestId('giftcard-activation-input');
  const giftcardLabel = page.getByTestId('giftcard-activation-label');

  await Promise.race([
  giftcardInput.first()
    .waitFor({ state: 'visible', timeout: 2000 })
    .catch((err) => {
      console.warn('Giftcard input not visible within timeout:', err.message);
    }),
  giftcardLabel.first()
    .waitFor({ state: 'visible', timeout: 2000 })
    .catch((err) => {
      console.warn('Giftcard label not visible within timeout:', err.message);
    })
  ]);

  const hasInput = await giftcardInput.isVisible();
  const hasLabel = await giftcardLabel.isVisible();
  expect(hasInput || hasLabel).toBe(true);

  if (hasInput) {
    // Input is present — fill and save
    await giftcardInput.click();
    await giftcardInput.type('mygiftcard123');
    await bopis.clickByTestId('giftcard-activation-save-button');
    await bopis.clickByRole('button','Activate');
    await bopis.verifyTextExists('Gift card activated successfully.');

  } else if (hasLabel) {
    // Already filled, just close
    await bopis.clickByTestId('giftcard-activation-close-button', 0, giftcardModal);
  } else {
    throw new Error('No input or label found in giftcard modal');
  }
});

// Gift Card Activation Completed List page
test('Gift Card Viewing Completed Tab - List Page', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);
  await page.waitForLoadState('networkidle');

  const bopis = new BopisOrdersPage(page);
  // Go to Completed tab
  await bopis.goToCompletedTab();
  // Order Cards locator
  const orderCards = page.getByTestId('order-card');
  // Filter to cards that contain a gift-card-activation-button
  const giftCardOrders = orderCards.filter({
    has: page.getByTestId('gift-card-activation-button')
  });

  // Get the first matching card
  const firstGiftCard = giftCardOrders.first()
  await expect(firstGiftCard).toBeVisible();

  const giftcardIcon=firstGiftCard.getByTestId('gift-card-activation-button').first();
  await giftcardIcon.click();

  // Wait for the modal
  const giftcardModal = page.getByTestId('giftcard-activation-modal-header');
  await expect(giftcardModal).toBeVisible();

  // After giftcardModal is visible:
  const giftcardInput = page.getByTestId('giftcard-activation-input');
  const giftcardLabel = page.getByTestId('giftcard-activation-label');
  const hasInput = await giftcardInput.isVisible();
  const hasLabel = await giftcardLabel.isVisible();
  expect(hasInput || hasLabel).toBe(true);

  if (hasInput) {
    // Input is present — fill and save
    await giftcardInput.click();
    await giftcardInput.type('mygiftcard123');
    await bopis.clickByTestId('giftcard-activation-save-button');
    await bopis.clickByRole('button','Activate');
    await bopis.verifyTextExists('Gift card activated successfully.');

  } else if (hasLabel) {
    // Already filled, just close
    await bopis.clickByTestId('giftcard-activation-close-button', 0, giftcardModal);
  } else {
    throw new Error('No input or label found in giftcard modal');
  }

});

// Gift Card Activation Completed Detail page
test('Gift Card Activation From Completed Detail page ', async ({ page }) => {

  await page.goto(process.env.CURRENT_APP_URL);
  await page.waitForLoadState('networkidle');

  const bopis = new BopisOrdersPage(page);
  // Go to Completed tab
  await bopis.goToCompletedTab();
  // Order Cards locator
  const orderCards = page.getByTestId('order-card');
  // Filter to cards that contain a gift-card-activation-button
  const giftCardOrders = orderCards.filter({
    has: page.getByTestId('gift-card-activation-button')
  });
  // Get the first matching card
  const firstgiftCard = giftCardOrders.first()
  await expect(firstgiftCard).toBeVisible();
  await firstgiftCard.click();

  const detailPage= page.getByTestId('order-details-page');
  await expect(detailPage).toBeVisible();
  
  // Click the gift card activation button on Detail page
  await bopis.clickByTestId('gift-card-activation-button', 0, detailPage);

  const giftcardModal = page.getByTestId('giftcard-activation-modal-header');
  await expect(giftcardModal).toBeVisible();

  // After giftcardModal is visible:
  const giftcardInput = page.getByTestId('giftcard-activation-input');
  const giftcardLabel = page.getByTestId('giftcard-activation-label');
  
  const hasInput = await giftcardInput.isVisible();
  const hasLabel = await giftcardLabel.isVisible();
  expect(hasInput || hasLabel).toBe(true);

  if (hasInput) {
    // Input is present — fill and save
    await giftcardInput.click();
    await giftcardInput.type('mygiftcard123');
    await bopis.clickByTestId('giftcard-activation-save-button');
    await bopis.clickByRole('button','Activate');
    await bopis.verifyTextExists('Gift card activated successfully.');

  } else if (hasLabel) {
    // Already filled, just close
    await bopis.clickByTestId('giftcard-activation-close-button', 0, giftcardModal);
  } else {
    throw new Error('No input or label found in giftcard modal');
  }
});  */

import { expect, test } from '@playwright/test';
import { PackedOrderPage } from '../pages/orders/pack-orders.page';
import { OrderDetailPage } from '../pages/order-detail/order-detail.page';
import { CompletedOrdersPage } from '../pages/orders/complete-orders.page';
import { OrderPage } from '../pages/orders/orders.page';                      
// Gift Card Activation Packed List page 
test('Gift Card Activation - Packed Tab (List Page)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);

  const packedOrders = new PackedOrderPage(page);
  const orderList=new OrderPage(page);
  await packedOrders.goToPackedTab();
  await orderList.openFirstGiftCardModalFromList();
  await orderList.activateGiftCard('mygiftcard123');
});

// Gift Card Activation Packed Detail page 
test('Gift Card Activation - Packed Tab (Detail Page)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);

  const packedOrders = new PackedOrderPage(page);
  const detailPage = new OrderDetailPage(page);

  await packedOrders.goToPackedTab();
  await packedOrders.openFirstGiftCardOrder();
  // Gift card flow on detail page
  await detailPage.verifyDetailPage();
  await detailPage.openGiftCardModal();
  await detailPage.activateGiftCard('mygiftcard123');
});

// Gift Card Activation Completed Detail page
test('Gift Card Activation - Completed Detail Page', async ({ page }) => {
  const completedOrders = new CompletedOrdersPage(page);
  const orderDetail = new OrderDetailPage(page);

  await page.goto(process.env.CURRENT_APP_URL);
  await completedOrders.goToCompletedTab();
  await completedOrders.openFirstGiftCardOrder();
  // Gift card flow on detail page
  await orderDetail.verifyDetailPage();
  await orderDetail.openGiftCardModal();
  await orderDetail.activateGiftCard('mygiftcard123');
});

// Gift Card Activation Completed List page
test('Gift Card Activation - Completed List Page', async ({ page }) => {
  const completedOrders = new CompletedOrdersPage(page);
  const orderDetail = new OrderDetailPage(page);
  const orderList=new OrderPage(page);
  
  await page.goto(process.env.CURRENT_APP_URL);
  await completedOrders.goToCompletedTab();
  // Directly open gift card modal from list card
  await orderList.openFirstGiftCardModalFromList();
  // Gift card activation
  await orderList.activateGiftCard('mygiftcard123');
});