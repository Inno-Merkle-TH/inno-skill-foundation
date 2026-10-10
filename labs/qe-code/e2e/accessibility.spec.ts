import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('controlled form has a programmatically associated label', async ({ page }) => {
  await page.setContent('<html lang="en"><head><title>QE fixture</title></head><body><main><h1>Checkout</h1><label for="name">Name</label><input id="name"><button>Continue</button></main></body></html>');
  const results = await new AxeBuilder({ page }).withRules(['label']).analyze();
  expect(results.violations).toEqual([]);
});

test('detects the known unlabeled-input defect', async ({ page }) => {
  await page.setContent('<html lang="en"><head><title>QE negative fixture</title></head><body><main><h1>Checkout</h1><input id="missing-label"></main></body></html>');
  const results = await new AxeBuilder({ page }).withRules(['label']).analyze();
  expect(results.violations.map(violation => violation.id)).toContain('label');
});

test('storefront accessibility audit reports findings without suppressing violations', async ({ page }, testInfo) => {
  test.skip(process.env.AUDIT_STOREFRONT !== '1', 'Separate opt-in audit; not a fixture conformance claim');
  await page.goto('/shop/');
  const results = await new AxeBuilder({ page }).analyze();
  await testInfo.attach('accessibility-summary', { body: JSON.stringify(results.violations.map(({ id, impact, description }) => ({ id, impact, description })), null, 2), contentType: 'application/json' });
  expect(results.violations).toEqual([]);
});
