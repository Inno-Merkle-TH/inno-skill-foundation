import type { OrderRecord } from './orders.js';
import type { PurchaseEvent } from './event-contract.js';

export type ReconciliationReport = {
  expected: number;
  observed: number;
  missing: string[];
  duplicate: string[];
  invalid: string[];
  late: string[];
  excluded: string[];
};

export function reconcile(orders: OrderRecord[], events: PurchaseEvent[], window: { from: string; to: string }): ReconciliationReport {
  const from = Date.parse(window.from);
  const to = Date.parse(window.to);
  if (!Number.isFinite(from) || !Number.isFinite(to) || from >= to) throw new Error('Invalid window');
  const inWindow = orders.filter(order => Date.parse(order.occurredAt) >= from && Date.parse(order.occurredAt) < to);
  const eligible = inWindow.filter(order => order.analyticsEligible && order.status === 'completed');
  const report: ReconciliationReport = { expected: eligible.length, observed: 0, missing: [], duplicate: [], invalid: [], late: [], excluded: inWindow.filter(order => !order.analyticsEligible || order.status !== 'completed').map(order => order.transactionId) };
  const byId = new Map(eligible.map(order => [order.transactionId, order]));
  const observed = new Set<string>();
  const itemKey = (items: PurchaseEvent['items']) => {
    const totals = new Map<string, number>();
    for (const item of items) totals.set(item.itemId, (totals.get(item.itemId) ?? 0) + item.quantity);
    return JSON.stringify([...totals].sort(([left], [right]) => left.localeCompare(right)));
  };
  for (const event of events) {
    const order = byId.get(event.transactionId);
    if (!order || event.valueMinor !== order.valueMinor || event.currency !== order.currency || itemKey(event.items) !== itemKey(order.items)) {
      report.invalid.push(event.eventId);
      continue;
    }
    if (Date.parse(event.receivedAt) >= to) report.late.push(event.eventId);
    if (observed.has(event.transactionId)) report.duplicate.push(event.eventId);
    observed.add(event.transactionId);
  }
  report.observed = observed.size;
  report.missing = eligible.filter(order => !observed.has(order.transactionId)).map(order => order.transactionId);
  return report;
}
