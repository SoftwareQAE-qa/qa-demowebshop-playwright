import { expect, Page } from '@playwright/test';

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class AuthPage {
  constructor(private readonly page: Page) {}

  async register(user: RegisterUser): Promise<void> {
    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.locator('#FirstName').fill(user.firstName);
    await this.page.locator('#LastName').fill(user.lastName);
    await this.page.locator('#Email').fill(user.email);
    await this.page.locator('#Password').fill(user.password);
    await this.page.locator('#ConfirmPassword').fill(user.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
    await expect(this.page.getByText('Your registration completed')).toBeVisible();
    await this.page.locator('input.button-1.register-continue-button').click();
  }
}
