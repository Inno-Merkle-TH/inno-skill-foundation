import type { Page } from '@playwright/test';
import type { syntheticBuyer } from '../data/buyer.js';
export class Storefront {
  constructor(readonly page: Page) {}
  async addNotebookToCart() {
    await this.page.goto('/shop/');
    await this.page.getByRole('link', { name: 'Synthetic QE Notebook', exact: true }).click();
    await this.page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  }
  async completeCheckout(buyer: ReturnType<typeof syntheticBuyer>) {
    await this.page.locator('#billing_first_name').fill(buyer.firstName);
    await this.page.locator('#billing_last_name').fill(buyer.lastName);
    await this.page.locator('#billing_country').selectOption('TH');
    await this.page.locator('#billing_address_1').fill('LAB ONLY DO NOT SHIP');
    await this.page.locator('#billing_city').fill('Bangkok');
    await this.page.locator('#billing_state').selectOption('TH-10');
    await this.page.locator('#billing_postcode').fill('10110');
    await this.page.locator('#billing_phone').fill('0000000000');
    await this.page.locator('#billing_email').fill(buyer.email);
    await this.page.locator('#place_order').click();
  }
}
