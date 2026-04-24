import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async setQuantity(quantity: number): Promise<void> {
    const qtyInput = this.page.locator('input.qty-input').first();
    await qtyInput.fill(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.page.locator('.product-essential input[id^="add-to-cart-button-"]').click();
    await expect(this.page.locator('#bar-notification')).toContainText('The product has been added to your shopping cart');
  }
}
