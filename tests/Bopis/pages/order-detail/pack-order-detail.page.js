import { expect } from '@playwright/test';

export class PackedDetailPage {
  constructor(page) {
    this.page = page;
    this.orderDetailsPage = this.page.getByTestId('order-details-page');

    // Handover button and related elements
    this.handoverButton = this.orderDetailsPage.getByTestId('handover-button');
    this.handedOverSuccessLabel = this.orderDetailsPage.getByTestId('handed-over-success-label');
    
    this.handoverAlert = page.locator('ion-alert'); 
    this.handoverConfirmButton = this.page.getByRole('button', { name: 'Handover' });
    
    // Cancellation Workflow Elements
    this.cancelItemButton = this.orderDetailsPage.getByTestId('select-cancel-item-button');
    this.cancelReasonButton = this.orderDetailsPage.getByTestId('select-cancellation-reason-button');
    this.cancelReasonChip = this.orderDetailsPage.getByTestId('change-cancel-reason-chip');
    this.cancelItemsSubmitButton = this.orderDetailsPage.getByTestId('submit-cancel-items-button');
    this.confirmCancellationButton = this.page.getByTestId('confirm-cancellation-button');

    // Packing slip button for printing
    this.packingSlipButton = this.orderDetailsPage.getByTestId('packing-slip-button');
    
  }

  async verifyDetailPageVisible() {
    await expect(this.orderDetailsPage).toBeVisible();
  }

  async handoverOrder() {
    await expect(this.handoverButton).toBeVisible();
    await this.handoverButton.click();

    await expect(this.handoverAlert).toBeVisible();
    await expect(this.handoverConfirmButton).toBeVisible();
    await this.handoverConfirmButton.click();

    await expect(this.handedOverSuccessLabel).toBeVisible();
  }


  async cancelSingleItem(reasonText) {
    await expect(this.cancelItemButton.first()).toBeVisible();
    await this.cancelItemButton.first().click();

    await expect(this.cancelReasonButton).toBeVisible();
    await this.cancelReasonButton.click();

    const reasonOption = this.page.getByText(reasonText);
    await expect(reasonOption).toBeVisible();
    await reasonOption.click();

    await expect(this.cancelItemsSubmitButton).toBeVisible();
    await this.cancelItemsSubmitButton.click();

    await expect(this.confirmCancellationButton).toBeVisible();
    await this.confirmCancellationButton.click();
  }


  async cancelOneItemFromMultiple(reasonText) {
    const totalItems = await this.cancelItemButton.count();
    expect(totalItems).toBeGreaterThan(1);

    const firstItem = this.cancelItemButton.first();
    await expect(firstItem).toBeVisible();
    await firstItem.click();

    await expect(this.cancelReasonButton).toBeVisible();
    await this.cancelReasonButton.click();

    const reasonOption = this.page.getByText(reasonText);
    await expect(reasonOption).toBeVisible();
    await reasonOption.click();

    await expect(this.cancelItemsSubmitButton).toBeVisible();
    await this.cancelItemsSubmitButton.click();

    await expect(this.confirmCancellationButton).toBeVisible();
    await this.confirmCancellationButton.click();

    // Verify count reduced by one after cancellation
    await expect(this.cancelItemButton).toHaveCount(totalItems - 1);
  }

  async printPackingSlipFromDetail() {
    await expect(this.packingSlipButton).toBeVisible();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.packingSlipButton.click(),
    ]);
    const url = popup.url();
    expect(url).toMatch(/(blob|pdf)/);
    console.log(`Packing slip opeed in new tab: ${url}`);
  }
};