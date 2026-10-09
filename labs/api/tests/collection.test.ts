import { test, expect } from 'vitest';
import { runCollection } from '../scripts/run-collection.js';

test('runs portable collection twice without shared records', async () => {
  expect(await runCollection()).toBeGreaterThan(5);
  expect(await runCollection()).toBeGreaterThan(5);
});

test('wrong collection expectation produces failure', async () => {
  await expect(runCollection(999)).rejects.toThrow();
});
