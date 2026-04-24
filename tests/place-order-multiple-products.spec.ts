import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { buildUniqueEmail, getOrderData } from '../utils/testData';

test.describe('Place order with multiple products', () => {
  test.setTimeout(120_000);

  test('should place an order and validate cart price calculations', async ({ page }) => {
    const orderData = getOrderData();
    const homePage = new HomePage(page);
    const authPage = new AuthPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigate();

    await authPage.register({
      firstName: orderData.customer.firstName,
      lastName: orderData.customer.lastName,
      email: buildUniqueEmail(orderData.customer.emailPrefix),
      password: process.env.DEMO_USER_PASSWORD ?? orderData.customer.password,
    });

    for (const product of orderData.products) {
      await homePage.searchProduct(product.name);
      await productPage.setQuantity(product.quantity);
      await productPage.addToCart();
      await homePage.navigate();
    }

    await homePage.openShoppingCart();
    for (const product of orderData.products) {
      await cartPage.assertProductInCart(product.name);
      await cartPage.assertLineItemTotalMatches(product.name);
    }
    await cartPage.assertOrderTotalMatchesSumOfLineItems();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillBillingAddress(orderData.billingAddress);
    await checkoutPage.completeCheckout();
    await checkoutPage.assertOrderPlaced();
  });
});
