import { expect } from '@playwright/test';

export class OpenOrderPage {

  constructor(page) {
    this.page = page;
    this.openTabButton = page.getByTestId('open-segment-button');
    this.firstCard = page.getByTestId('order-card').first();
    this.readyForPickupButton = this.firstCard.getByTestId('ready-pickup-button');
    this.printPicklistbutton=this.page.getByTestId('print-picklist-button').first();

    // Dynamic thing
    this.readyForPickupAlertBox = page.locator('ion-alert');
    this.readyForPickupAlertButton=page.getByRole('button',{name:'ready for pickup'});

    this.assignPickerModal = page.getByTestId('assign-picker-modal-header');
    this.assignPickerRadios = page.getByTestId('assign-picker-radio');
    this.assignPickerSaveButton = page.getByTestId('assign-picker-save-button');

    this.orderPackedText = page.getByText('Order packed and ready for delivery');
  }

  async goToOpenTab() {
    await expect(this.openTabButton).toBeVisible();
    await this.openTabButton.click();
    await expect(this.firstCard).toBeVisible();
  }

  async getFirstOrderCard() {
    return this.firstCard;
  }

  async markReadyForPickup() {
    await expect(this.readyForPickupButton).toBeVisible();
    await this.readyForPickupButton.click();
  }

  async assignPickerAndSave(selectedIndex = 0) {
    await expect(this.assignPickerModal).toBeVisible();
    await expect(this.assignPickerRadios.nth(selectedIndex)).toBeVisible();
    await this.assignPickerRadios.nth(selectedIndex).click();
    await this.assignPickerSaveButton.click();
  }
  async confirmReadyPickupAlert(){
    await expect(this.readyForPickupAlertBox).toBeVisible();
    await expect(this.readyForPickupAlertButton).toBeVisible();
    await this.readyForPickupAlertButton.click();
  }

  async verifyTextExists() {
    await expect(this.orderPackedText).toBeVisible();
  }
  
  async printPicklist(){
    await expect(this.printPicklistbutton).toBeVisible();
    await this.printPicklistbutton.click();
  }
  
  async handlePopupAndVerify() {
    const popupPromise = this.page.waitForEvent('popup').catch(() => null);
    const result = await Promise.race([popupPromise]);
    if (result && result.url()) {
      const url = result.url();
      expect(url).toMatch(/(blob|pdf)/);
      console.log(`Blob URL opened in new tab: ${url}`);
    } else {
      throw new Error('No blob URL detected after clicking Print Picklist.');
    }
  }
}
