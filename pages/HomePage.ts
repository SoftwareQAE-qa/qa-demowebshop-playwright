import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Demo Web Shop/);
  }

  async searchProduct(productName: string): Promise<void> {
    await this.page.locator('#small-searchterms').fill(productName);
    await this.page.locator('input.button-1.search-box-button').click();
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  async openShoppingCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();
  }
}
