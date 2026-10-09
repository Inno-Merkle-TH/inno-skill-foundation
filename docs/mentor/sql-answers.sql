SELECT orders.transaction_id AS missing
FROM qe_orders AS orders
LEFT JOIN qe_events AS events
  ON events.transaction_id = orders.transaction_id
  AND events.value_minor = orders.value_minor
  AND events.currency = orders.currency
WHERE orders.analytics_eligible = 1 AND events.event_id IS NULL;
SELECT transaction_id, COUNT(*) - 1 AS duplicate_surplus
FROM qe_events GROUP BY transaction_id HAVING COUNT(*) > 1;
SELECT SUM(value_minor) AS eligible_total_minor FROM qe_orders WHERE analytics_eligible = 1;
