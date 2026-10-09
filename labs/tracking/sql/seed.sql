INSERT IGNORE INTO qe_orders VALUES
('order-a',19900,'THB',1,'2026-10-09 10:00:00'),
('order-b',19900,'THB',1,'2026-10-09 10:00:00'),
('order-c',19900,'THB',1,'2026-10-09 10:00:00'),
('order-d',19900,'THB',0,'2026-10-09 10:00:00');
INSERT IGNORE INTO qe_events VALUES
('a1','order-a',19900,'THB','2026-10-09 10:00:01'),
('c1','order-c',19900,'THB','2026-10-09 10:00:01'),
('c2','order-c',19900,'THB','2026-10-09 10:00:02');
INSERT IGNORE INTO qe_order_items VALUES
('order-a','item-1',1),('order-a','item-2',1),('order-b','item-1',1);
