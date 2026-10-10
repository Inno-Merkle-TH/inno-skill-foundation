import assert from 'node:assert/strict';

export function summarizeOrders(orders) {
  return { count: orders.length, totalMinor: 0 };
}

assert.deepEqual(summarizeOrders([]), { count: 0, totalMinor: 0 });
assert.deepEqual(summarizeOrders([{ amountMinor: 19900 }, { amountMinor: 5000 }]), { count: 2, totalMinor: 24900 });
assert.throws(() => summarizeOrders([{ amountMinor: '19900' }]), TypeError);
assert.throws(() => summarizeOrders([{ amountMinor: Number.MAX_SAFE_INTEGER }, { amountMinor: 1 }]), RangeError);
console.log('All order summary assertions passed');
