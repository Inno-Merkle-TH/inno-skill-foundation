export type OrderRecord = {
  transactionId: string;
  status: string;
  valueMinor: number;
  currency: string;
  occurredAt: string;
  analyticsEligible: boolean;
  items: { itemId: string; quantity: number }[];
};

export function validateOrder(input: unknown): OrderRecord {
  const invalid = () => new Error('Invalid order');
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    throw invalid();
  }
  const record = input as Record<string, unknown>;
  const fields = ['transactionId', 'status', 'valueMinor', 'currency', 'occurredAt', 'analyticsEligible', 'items'];
  if (Object.keys(record).some(field => !fields.includes(field))) throw invalid();
  if (typeof record.transactionId !== 'string' || !record.transactionId.trim()) throw invalid();
  if (typeof record.status !== 'string' || !record.status.trim()) throw invalid();
  if (typeof record.valueMinor !== 'number' || !Number.isSafeInteger(record.valueMinor) || record.valueMinor < 0) throw invalid();
  if (typeof record.currency !== 'string' || !/^[A-Z]{3}$/.test(record.currency)) throw invalid();
  if (typeof record.analyticsEligible !== 'boolean') throw invalid();
  if (!Array.isArray(record.items) || !record.items.length) throw invalid();
  for (const item of record.items) {
    if (!item || typeof item.itemId !== 'string' || !item.itemId.trim() || !Number.isSafeInteger(item.quantity) || item.quantity <= 0) throw invalid();
    if (Object.keys(item).some(field => !['itemId', 'quantity'].includes(field))) throw invalid();
  }
  if (typeof record.occurredAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(record.occurredAt)) throw invalid();
  const timestamp = new Date(record.occurredAt);
  if (!Number.isFinite(timestamp.getTime()) || timestamp.toISOString() !== record.occurredAt) throw invalid();
  return {
    transactionId: record.transactionId,
    status: record.status,
    valueMinor: record.valueMinor,
    currency: record.currency,
    occurredAt: record.occurredAt,
    analyticsEligible: record.analyticsEligible,
    items: record.items.map(item => ({ itemId: item.itemId, quantity: item.quantity })),
  };
}
