import { afterEach, expect, test } from 'vitest';
import type { Server } from 'node:http';
import { createApp } from '../src/http-app.js';
import type { PurchaseEvent } from '../src/event-contract.js';

let server: Server;
afterEach(async () => { if (server) await new Promise<void>(resolve => server.close(() => resolve())); });

async function start(fail = false) {
  const events = new Map<string, PurchaseEvent>();
  server = createApp({ async insert(event) { if (fail) throw new Error('outage'); if (events.has(event.eventId)) return false; events.set(event.eventId, event); return true; } });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing address');
  return { url: `http://127.0.0.1:${address.port}`, events };
}

const input = { eventId: 'e1', schemaVersion: 1, eventName: 'purchase', transactionId: 'order-a', valueMinor: 19900, currency: 'THB', items: [{ itemId: 'notebook', quantity: 1 }], occurredAt: '2026-10-09T10:00:00.000Z', consentState: 'granted', source: 'browser' };
const request = (input: unknown) => ({ method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });

test('health returns ready without returning data or credentials', async () => {
  const { url } = await start();
  const response = await fetch(`${url}/lab-api/health`);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: 'ok' });
});

test('accepts once and handles duplicate event IDs atomically through the store', async () => {
  const { url, events } = await start();
  expect((await fetch(`${url}/lab-events`, request(input))).status).toBe(202);
  expect((await fetch(`${url}/lab-events`, request(input))).status).toBe(200);
  expect(events.size).toBe(1);
  expect(events.get('e1')?.receivedAt).toMatch(/^\d{4}-/);
});

test('rejects denied consent and unexpected personal fields without storing them', async () => {
  const { url, events } = await start();
  expect((await fetch(`${url}/lab-events`, request({ ...input, consentState: 'denied' }))).status).toBe(403);
  expect((await fetch(`${url}/lab-events`, request({ ...input, email: 'test@example.invalid' }))).status).toBe(400);
  expect(events.size).toBe(0);
});

test('returns retryable failure for persistence outage, never success', async () => {
  const { url } = await start(true);
  expect((await fetch(`${url}/lab-events`, request(input))).status).toBe(503);
});

test('rejects malformed JSON and unknown routes', async () => {
  const { url } = await start();
  expect((await fetch(`${url}/lab-events`, { method: 'POST', body: '{' })).status).toBe(400);
  expect((await fetch(`${url}/missing`)).status).toBe(404);
});
