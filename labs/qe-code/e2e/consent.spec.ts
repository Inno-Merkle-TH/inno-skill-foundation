import { test, expect } from './fixtures.js';
import { syntheticBuyer } from './data/buyer.js';

test('denied consent still completes checkout without a purchase request', async ({ page, storefront }, testInfo) => {
  const requests: string[] = [];
  page.on('request', request => { if (request.url().endsWith('/lab-events')) requests.push(request.url()); });
  await storefront.addNotebookToCart();
  await page.goto('/checkout/');
  await page.getByRole('button', { name: 'Deny lab analytics' }).click();
  await storefront.completeCheckout(syntheticBuyer(`deny-${Date.now()}-${testInfo.workerIndex}`));
  await expect(page.getByRole('heading', { name: 'Order completed', exact: true })).toBeVisible();
  await page.waitForLoadState('load');
  expect(requests).toEqual([]);
});

test('collector rejection does not turn a completed order into checkout failure', async ({ page, storefront }) => {
  await page.route('**/lab-events', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"synthetic outage"}' }));
  await storefront.addNotebookToCart();
  await page.goto('/checkout/');
  await page.getByRole('button', { name: 'Allow lab analytics' }).click();
  const rejected = page.waitForResponse(response => response.url().endsWith('/lab-events'));
  await storefront.completeCheckout(syntheticBuyer(`outage-${Date.now()}`));
  await expect(page.getByRole('heading', { name: 'Order completed', exact: true })).toBeVisible();
  expect((await rejected).status()).toBe(503);
});

test('revoking consent clears a rejected pending purchase before online retry', async ({ page, storefront }) => {
  const requests: string[] = [];
  page.on('request', request => { if (request.url().endsWith('/lab-events')) requests.push(request.url()); });
  await page.route('**/lab-events', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"synthetic outage"}' }));
  await storefront.addNotebookToCart();
  await page.goto('/checkout/');
  await page.getByRole('button', { name: 'Allow lab analytics' }).click();
  const rejected = page.waitForResponse(response => response.url().endsWith('/lab-events'));
  await storefront.completeCheckout(syntheticBuyer(`revoke-${Date.now()}`));
  expect((await rejected).status()).toBe(503);
  await page.getByRole('button', { name: 'Deny lab analytics' }).click();
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect(page.getByRole('heading', { name: 'Order completed', exact: true })).toBeVisible();
  expect(requests).toHaveLength(1);
});
