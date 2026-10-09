import type { PurchaseEvent } from './event-contract.js';
import { validateOrder } from './orders.js';

export function validateEvent(input: unknown, receivedAt: string): PurchaseEvent {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid event');
  const record = input as Record<string, unknown>;
  if (record.consentState !== 'granted') throw new Error('Consent required');
  const fields = ['eventId', 'schemaVersion', 'eventName', 'transactionId', 'valueMinor', 'currency', 'items', 'occurredAt', 'consentState', 'source'];
  if (Object.keys(record).some(field => !fields.includes(field))) throw new Error('Invalid event');
  if (typeof record.eventId !== 'string' || !record.eventId.trim() || record.eventId.length > 128) throw new Error('Invalid event');
  if (record.schemaVersion !== 1 || record.eventName !== 'purchase' || typeof record.source !== 'string' || !['browser', 'server'].includes(record.source)) throw new Error('Invalid event');
  try {
    validateOrder({ transactionId: record.transactionId, status: 'completed', valueMinor: record.valueMinor, currency: record.currency, occurredAt: record.occurredAt, analyticsEligible: true, items: record.items });
  } catch {
    throw new Error('Invalid event');
  }
  if (!Array.isArray(record.items) || record.items.length === 0) throw new Error('Invalid event');
  for (const item of record.items) {
    if (!item || typeof item !== 'object' || Object.keys(item).some(field => !['itemId', 'quantity'].includes(field))) throw new Error('Invalid event');
    if (typeof item.itemId !== 'string' || !item.itemId.trim() || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) throw new Error('Invalid event');
  }
  return { ...record, receivedAt } as PurchaseEvent;
}
