import { expect } from '@playwright/test';

export class CompletedOrdersPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.orderCard=page.getByTestId('order-card');
    this.completedTabButton = page.getByTestId('completed-segment-button');
    this.orderCards = page.getByTestId('order-card');
    this.giftCardActivationButton = page.getByTestId('gift-card-activation-button');
  }
  async goToCompletedTab() {
    await expect(this.completedTabButton).toBeVisible();
    await this.completedTabButton.click();

    const firstCard = this.orderCards.first();
    await expect(firstCard).toBeVisible();
  }
  async openFirstGiftCardOrder() {
    const giftCardOrders = this.orderCards.filter({
      has: this.giftCardActivationButton
    });
    const firstGiftCard = giftCardOrders.first();
    await expect(firstGiftCard).toBeVisible();
    await firstGiftCard.click();
  }
  
  async findCardByOrderName(orderName) {
    const matchingCard = this.orderCard.filter({ hasText: orderName }).first();
    await expect(matchingCard).toBeVisible();
    return matchingCard;
  }
}
