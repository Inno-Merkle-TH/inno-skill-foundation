import { expect, test } from 'vitest';
import { validateEvent } from '../src/collector.js';

const receivedAt = '2026-10-09T10:00:01.000Z';
const event = { eventId: 'e1', schemaVersion: 1, eventName: 'purchase', transactionId: 'order-a', valueMinor: 19900, currency: 'THB', items: [{ itemId: 'notebook', quantity: 1 }], occurredAt: '2026-10-09T10:00:00.000Z', consentState: 'granted', source: 'browser' };

test('validates purchase and stamps server receipt time', () => {
  expect(validateEvent(event, receivedAt)).toEqual({ ...event, receivedAt });
});

test.each([
  ['PII', { ...event, email: 'synthetic@example.invalid' }],
  ['client receipt time', { ...event, receivedAt }],
  ['unsupported version', { ...event, schemaVersion: 2 }],
  ['wrong event name', { ...event, eventName: 'click' }],
  ['empty items', { ...event, items: [] }],
  ['zero quantity', { ...event, items: [{ itemId: 'notebook', quantity: 0 }] }],
  ['item PII', { ...event, items: [{ itemId: 'notebook', quantity: 1, email: 'test@example.invalid' }] }],
  ['blank event ID', { ...event, eventId: '' }],
  ['negative money', { ...event, valueMinor: -1 }],
  ['untrusted source', { ...event, source: 'other' }],
  ['array source', { ...event, source: ['browser'] }],
])('rejects %s', (_name, input) => {
  expect(() => validateEvent(input, receivedAt)).toThrow(/Invalid event/);
});

test.each(['denied', 'revoked', undefined])('rejects consent %s explicitly', consentState => {
  expect(() => validateEvent({ ...event, consentState }, receivedAt)).toThrow(/Consent required/);
});
