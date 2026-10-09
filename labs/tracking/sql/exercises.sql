SELECT * FROM qe_orders;
SELECT * FROM qe_events;
SELECT SUM(value_minor) AS eligible_total_minor FROM qe_orders WHERE analytics_eligible = 1;
SELECT orders.transaction_id, events.event_id
FROM qe_orders AS orders
LEFT JOIN qe_events AS events ON events.transaction_id = orders.transaction_id
WHERE orders.analytics_eligible = 1;
