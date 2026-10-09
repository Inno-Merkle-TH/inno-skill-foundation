import { test as base, expect } from '@playwright/test';
import { Storefront } from './pages/storefront.js';
export const test = base.extend<{ storefront: Storefront }>({ storefront: async ({ page }, use) => { await use(new Storefront(page)); } });
export { expect };
