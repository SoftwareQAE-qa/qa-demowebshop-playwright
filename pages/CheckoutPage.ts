import { expect, Page } from '@playwright/test';
import { BillingAddress } from '../utils/types';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillBillingAddress(address: BillingAddress): Promise<void> {
    await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: address.country });
    await this.page.locator('#BillingNewAddress_City').fill(address.city);
    await this.page.locator('#BillingNewAddress_Address1').fill(address.address1);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(address.zipPostalCode);
    await this.page.locator('#BillingNewAddress_PhoneNumber').fill(address.phoneNumber);
    await this.page.locator('#billing-buttons-container input.button-1.new-address-next-step-button').click();
  }

  async completeCheckout(): Promise<void> {
    await this.page.locator('#shipping-buttons-container input.button-1.new-address-next-step-button').click();
    await this.page.locator('#shipping-method-buttons-container input.button-1.shipping-method-next-step-button').click();
    await this.page.locator('#payment-method-buttons-container input.button-1.payment-method-next-step-button').click();
    await this.page.locator('#payment-info-buttons-container input.button-1.payment-info-next-step-button').click();
    await this.page.locator('#confirm-order-buttons-container input.button-1.confirm-order-next-step-button').click();
  }

  async assertOrderPlaced(): Promise<void> {
    await expect(this.page.getByText('Your order has been successfully processed!')).toBeVisible();
  }
}
