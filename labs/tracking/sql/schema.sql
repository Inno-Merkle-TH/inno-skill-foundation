CREATE TABLE IF NOT EXISTS qe_orders (
  transaction_id VARCHAR(64) PRIMARY KEY,
  value_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  analytics_eligible BOOLEAN NOT NULL,
  occurred_at DATETIME(3) NOT NULL
);
CREATE TABLE IF NOT EXISTS qe_events (
  event_id VARCHAR(64) PRIMARY KEY,
  transaction_id VARCHAR(64) NOT NULL,
  value_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  received_at DATETIME(3) NOT NULL
);
CREATE TABLE IF NOT EXISTS qe_order_items (
  transaction_id VARCHAR(64) NOT NULL,
  item_id VARCHAR(64) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (transaction_id, item_id)
);
