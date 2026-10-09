import { expect, test } from 'vitest';
import { reconcile } from '../src/reconcile.js';
import type { PurchaseEvent } from '../src/event-contract.js';

const window = { from: '2026-10-09T00:00:00.000Z', to: '2026-10-10T00:00:00.000Z' };
const orders = ['order-a', 'order-b', 'order-c', 'order-d'].map((transactionId, index) => ({ transactionId, status: 'completed', valueMinor: 19900, currency: 'THB', occurredAt: '2026-10-09T10:00:00.000Z', analyticsEligible: index !== 3, items: [{ itemId: 'QE-NOTEBOOK-001', quantity: 1 }] }));
const event = (eventId: string, transactionId: string): PurchaseEvent => ({ eventId, transactionId, schemaVersion: 1, eventName: 'purchase', valueMinor: 19900, currency: 'THB', items: [{ itemId: 'QE-NOTEBOOK-001', quantity: 1 }], occurredAt: '2026-10-09T10:00:00.000Z', receivedAt: '2026-10-09T10:00:01.000Z', consentState: 'granted', source: 'browser' });

test('finds missing and duplicate purchases without counting excluded orders as missing', () => {
  expect(reconcile(orders, [event('a1', 'order-a'), event('c1', 'order-c'), event('c2', 'order-c')], window)).toEqual({ expected: 3, observed: 2, missing: ['order-b'], duplicate: ['c2'], invalid: [], late: [], excluded: ['order-d'] });
});

test('invalid money or currency does not hide a missing valid purchase', () => {
  const wrong = { ...event('a1', 'order-a'), valueMinor: 19899, currency: 'USD' };
  const report = reconcile([orders[0]], [wrong], window);
  expect(report.invalid).toEqual(['a1']);
  expect(report.observed).toBe(0);
  expect(report.missing).toEqual(['order-a']);
});

test('uses half-open order window and records late arrival', () => {
  const report = reconcile([{ ...orders[0], occurredAt: window.to }, orders[1]], [{ ...event('b1', 'order-b'), receivedAt: window.to }], window);
  expect(report.expected).toBe(1);
  expect(report.late).toEqual(['b1']);
  expect(report.observed).toBe(1);
});

test('rejects invalid windows rather than returning an empty success', () => {
  expect(() => reconcile(orders, [], { from: window.to, to: window.from })).toThrow(/Invalid window/);
});

test('counts received events for excluded or nonexistent orders as invalid', () => {
  expect(reconcile(orders, [event('d1', 'order-d'), event('x1', 'unknown')], window).invalid).toEqual(['d1', 'x1']);
});

test('does not count a purchase with wrong items as a matching order', () => {
  const order = { ...orders[0], items: [{ itemId: 'QE-NOTEBOOK-001', quantity: 1 }] };
  const wrong = { ...event('a1', 'order-a'), items: [{ itemId: 'wrong-product', quantity: 99 }] };
  const report = reconcile([order], [wrong], window);
  expect(report.invalid).toEqual(['a1']);
  expect(report.missing).toEqual(['order-a']);
});
