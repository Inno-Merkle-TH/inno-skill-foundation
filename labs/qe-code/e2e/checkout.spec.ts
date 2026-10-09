import { expect, test } from './fixtures.js';
import { syntheticBuyer } from './data/buyer.js';

test('synthetic checkout creates order and delivers one validated purchase', async ({ page, storefront }) => {
  await storefront.addNotebookToCart();
  await page.goto('/checkout/');
  await page.getByRole('button', { name: 'Allow lab analytics' }).click();
  const purchase = page.waitForResponse(response => response.url().endsWith('/lab-events') && response.request().method() === 'POST');
  await storefront.completeCheckout(syntheticBuyer(`granted-${Date.now()}`));
  await expect(page).toHaveURL(/order-received/);
  await expect(page.getByRole('heading', { name: 'Order completed', exact: true })).toBeVisible();
  const response = await purchase;
  expect(response.status()).toBe(202);
  const event = response.request().postDataJSON();
  expect(event.eventName).toBe('purchase');
  expect(event.valueMinor).toBe(19900);
  expect(event.currency).toBe('THB');
  expect(event.transactionId).toBeTruthy();
  expect(event).not.toHaveProperty('email');
});
