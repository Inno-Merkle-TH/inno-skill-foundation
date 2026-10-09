import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: process.env.STOREFRONT_URL ?? 'http://localhost:8080', trace: 'off', screenshot: 'off' },
  reporter: 'list',
  workers: 1,
  retries: 0,
});
