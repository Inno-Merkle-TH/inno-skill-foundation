import { describe, expect, test } from 'vitest';
import { validateOrder } from '../src/orders.js';

const validOrder = {
  transactionId: 'demo-001',
  status: 'completed',
  valueMinor: 19900,
  currency: 'THB',
  occurredAt: '2026-10-09T10:00:00.000Z',
  analyticsEligible: true,
  items: [{ itemId: 'notebook', quantity: 1 }],
};

describe('validateOrder', () => {
  test('returns a validated synthetic order without changing its values', () => {
    expect(validateOrder(validOrder)).toEqual(validOrder);
  });

  test('accepts zero value and analytics-ineligible orders', () => {
    const order = { ...validOrder, valueMinor: 0, analyticsEligible: false };
    expect(validateOrder(order)).toEqual(order);
  });

  test.each([
    ['blank ID', { ...validOrder, transactionId: ' ' }],
    ['missing ID', { ...validOrder, transactionId: undefined }],
    ['empty status', { ...validOrder, status: '' }],
    ['negative money', { ...validOrder, valueMinor: -1 }],
    ['fractional minor units', { ...validOrder, valueMinor: 19.9 }],
    ['string money', { ...validOrder, valueMinor: '19900' }],
    ['unsafe integer', { ...validOrder, valueMinor: Number.MAX_SAFE_INTEGER + 1 }],
    ['lowercase currency', { ...validOrder, currency: 'thb' }],
    ['short currency', { ...validOrder, currency: 'TH' }],
    ['invalid date', { ...validOrder, occurredAt: 'yesterday' }],
    ['impossible calendar date', { ...validOrder, occurredAt: '2026-02-30T10:00:00.000Z' }],
    ['non-UTC date', { ...validOrder, occurredAt: '2026-10-09T17:00:00+07:00' }],
    ['string consent', { ...validOrder, analyticsEligible: 'true' }],
    ['null', null],
    ['array', []],
    ['unexpected PII', { ...validOrder, email: 'synthetic@example.invalid' }],
  ])('rejects %s with a validation error', (_label, input) => {
    expect(() => validateOrder(input)).toThrow(/Invalid order/);
  });
});
