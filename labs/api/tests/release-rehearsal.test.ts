import { test, expect } from 'vitest';
import { rehearseRelease } from '../scripts/release-rehearsal.js';

test('selects healthy candidate after business verification and closes processes', async () => {
  const result = await rehearseRelease(false);
  expect(result.selected).toBe('candidate');
  expect(result.baselineReadable).toBe(true);
  await expect(fetch(result.baselineUrl)).rejects.toThrow();
  await expect(fetch(result.candidateUrl)).rejects.toThrow();
});
test('rejects a live but broken candidate and preserves baseline resource', async () => {
  const result = await rehearseRelease(true);
  expect(result.selected).toBe('baseline');
  expect(result.candidateHealth).toBe(200);
  expect(result.candidateBusiness).toBe(503);
  expect(result.baselineReadable).toBe(true);
  await expect(fetch(result.baselineUrl)).rejects.toThrow();
});
