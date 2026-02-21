import { expect } from '@playwright/test';

export class OpenDetailPage {
  constructor(page) {
    this.page = page;

    // Order Details 
    this.orderDetailsPage = page.getByTestId('order-details-page');

    // Action buttons
    this.readyForPickupButton = this.orderDetailsPage.getByTestId('ready-pickup-button');
    this.printPicklistButton = this.orderDetailsPage.getByTestId('print-picklist-button');
    this.editPickerChip = this.orderDetailsPage.getByTestId('edit-picker-chip');

    // Assign picker modal (dynamic)
    this.assignPickerModal = page.getByTestId('assign-picker-modal-header');
    this.assignPickerRadios = page.getByTestId('assign-picker-radio');
    this.assignPickerSaveButton = page.getByTestId('assign-picker-save-button');

    // Alert
    this.readyForPickupAlertBox = page.locator('ion-alert');
    this.readyForPickupAlertButton = page.getByRole('button', { name: 'ready for pickup' });

    // Rejection Workflow
    this.rejectItemButton = page.getByTestId('select-rejected-item-button');
    this.rejectionReasonButton = page.getByTestId('select-rejection-reason-button');
    this.rejectionReasonChip = page.getByTestId('change-rejection-reason-chip');
    this.submitRejectionButton = page.getByTestId('submit-rejected-items-button');


    // Toast 
    this.orderPackedText = page.getByText('Order packed and ready for delivery');
    this.orderItemRejection = page.getByText('All order items are rejected');
  }

  async verifyDetailPage() {
    await expect(this.orderDetailsPage).toBeVisible();
  }

  async markReadyForPickup() {
    await expect(this.readyForPickupButton).toBeVisible();
    await this.readyForPickupButton.click();
  }

  async verifyAssignPickerModal() {
    await expect(this.assignPickerModal).toBeVisible();
  }

  async assignPickerAndSave(selectedIndex = 0) {
    await expect(this.assignPickerRadios.nth(selectedIndex)).toBeVisible();
    await this.assignPickerRadios.nth(selectedIndex).click();
    await this.assignPickerSaveButton.click();
  }

  async confirmReadyPickupAlert(){
    await expect(this.readyForPickupAlertBox).toBeVisible();
    await expect(this.readyForPickupAlertButton).toBeVisible();
    await this.readyForPickupAlertButton.click();
  }

  async verifyOrderPackedMessage() {
    await expect(this.orderPackedText).toBeVisible();
  }

  async printPicklist() {
    await expect(this.printPicklistButton).toBeVisible();
    await this.printPicklistButton.click();
  }

  async verifyOrderRejectMessage(message) {
    await expect(this.orderItemRejection).toBeVisible();
  }

  // ---------------- REJECTION FLOW ----------------
   async rejectSingleItem() {

    await expect(this.rejectItemButton.first()).toBeVisible();
    await this.rejectItemButton.first().click();

    // Select a rejection reason
    await expect(this.rejectionReasonButton.first()).toBeVisible();
    await this.rejectionReasonButton.first().click();
    await expect(this.submitRejectionButton).toBeEnabled();
    await this.submitRejectionButton.click();

    // Verify toast message
    await this.verifyOrderRejectMessage();

  }


  async rejectOneItemFromMultiple() {

    const totalItems = await this.rejectItemButton.count();
    expect(totalItems).toBeGreaterThan(1); 

    const firstItem = this.rejectItemButton.first();
    await expect(firstItem).toBeVisible();
    await firstItem.click();
    // Select a rejection reason
    await expect(this.rejectionReasonButton.first()).toBeVisible();
    await this.rejectionReasonButton.first().click();
    // Ensure submit is enabled
    await expect(this.submitRejectionButton).toBeEnabled();
    await this.submitRejectionButton.click();

    // Verify item count is reduced by 1
    await expect(this.rejectItemButton).toHaveCount(totalItems - 1);
  }
}