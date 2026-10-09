export type PurchaseEvent = {
  eventId: string;
  schemaVersion: 1;
  eventName: 'purchase';
  transactionId: string;
  valueMinor: number;
  currency: string;
  items: { itemId: string; quantity: number }[];
  occurredAt: string;
  receivedAt: string;
  consentState: 'granted';
  source: 'browser' | 'server';
};
