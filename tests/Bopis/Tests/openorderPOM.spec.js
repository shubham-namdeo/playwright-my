import { expect, test } from '@playwright/test';


test('Steps for Packing the Open Order From List Page (Tracking Enabled)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL + '/tabs/orders');
  const bopis = new BopisOpenOrdersPage(page);

  // Go to Open tab
  await bopis.goToOpenTab();

  // Get the first order card and check visibility
  const openFirstCard = await bopis.getFirstOrderCard();
  await expect(openFirstCard).toBeVisible();

  // Click Ready for Pickup button within the first order card
  // Using scoped clickByTestId with card as parent
  await bopis.clickByTestId('ready-pickup-button', 0, openFirstCard);

  // Assign a Picker from the modal: select first available picker (index 0)
  await bopis.assignPicker(0);

  // Confirm success message (adjust text to match actual app message)
  await bopis.verifyByText('Order packed and ready for delivery');
});
