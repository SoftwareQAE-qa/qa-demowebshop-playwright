import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private parseCurrency(value: string): number {
    return Number(value.replace(/[^0-9.-]/g, ''));
  }

  async assertProductInCart(productName: string): Promise<void> {
    await expect(this.page.locator('tr.cart-item-row').filter({ hasText: productName })).toBeVisible();
  }

  async assertLineItemTotalMatches(productName: string): Promise<void> {
    const row = this.page.locator('tr.cart-item-row').filter({ hasText: productName });
    const unitPriceText = await row.locator('.product-unit-price').innerText();
    const qtyText = await row.locator('input.qty-input').inputValue();
    const subtotalText = await row.locator('.product-subtotal').innerText();

    const unitPrice = this.parseCurrency(unitPriceText);
    const quantity = Number(qtyText);
    const subtotal = this.parseCurrency(subtotalText);

    expect(unitPrice * quantity).toBeCloseTo(subtotal, 2);
  }

  async assertOrderTotalMatchesSumOfLineItems(): Promise<void> {
    const subtotals = await this.page.locator('tr.cart-item-row .product-subtotal').allInnerTexts();
    const sum = subtotals.reduce((acc, current) => acc + this.parseCurrency(current), 0);
    const displayedSubTotal = await this.page.locator('.totals .product-price').first().innerText();
    expect(sum).toBeCloseTo(this.parseCurrency(displayedSubTotal), 2);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator('#termsofservice').check();
    await this.page.locator('#checkout').click();
  }
}
