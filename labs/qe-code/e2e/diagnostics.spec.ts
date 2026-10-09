import { test, expect } from '@playwright/test';

test('waits for the observable result rather than a fixed sleep', async ({ page }) => {
  await page.setContent('<button>Calculate</button><output aria-label="Total">Pending</output><script>document.querySelector("button").onclick=()=>setTimeout(()=>document.querySelector("output").textContent="199 THB",150)</script>');
  await page.getByRole('button', { name: 'Calculate' }).click();
  await expect(page.getByLabel('Total')).toHaveText('199 THB');
});
