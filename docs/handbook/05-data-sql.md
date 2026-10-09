# 05 — Data/SQL และ reconciliation

## Prerequisites / mental model

ผ่าน Docker/TypeScript มี lab DB ของ commerce แต่ schema ตัวอย่างใช้ตาราง `qe_*` แยกจาก WooCommerce Primary key ระบุ record; JOIN เชื่อม records ไม่ได้รับประกันหนึ่งต่อหนึ่ง; NULL ไม่ใช่ศูนย์หรือ empty string Reconciliation คือเทียบสิ่งที่ควรเกิดกับสิ่งที่พบ ไม่ใช่ count events อย่างเดียว

## Lab

จาก root ใช้ schema/seed ที่ idempotent ไม่มี DROP/TRUNCATE:

```bash
cat labs/tracking/sql/schema.sql labs/tracking/sql/seed.sql | docker compose --env-file labs/commerce/.env -f labs/commerce/compose.yaml exec -T db sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce'
cat labs/tracking/sql/exercises.sql | docker compose --env-file labs/commerce/.env -f labs/commerce/compose.yaml exec -T db sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce'
cd labs/qe-code
npm test -- reconcile
```

ใช้ `--env-file` ในคำสั่งจาก root เพื่อระบุ credentials file โดยไม่ส่ง secret ผ่าน command line

Expected: 4 orders, 3 events, eligible total `59700`; eligible 3 orders มี observed unique 2, missing order-b, duplicate surplus 1 สำหรับ order-c และ excluded order-d Missing test ไม่รวม order ที่ consent ไม่ให้เก็บ

## Exercise

หา missing ด้วย LEFT JOIN/IS NULL, duplicate ด้วย GROUP BY/HAVING ทำ JOIN orders กับ items แล้ว SUM(order total) ดู order-a ถูกนับซ้ำ อธิบายวิธี aggregate ก่อน join ลองเปลี่ยน currency ของ event ผ่าน transaction ใน sandbox และ ROLLBACK เทียบ invalid กับ missing valid purchase ห้าม UPDATE ตาราง WooCommerce

## Troubleshooting / cleanup

Unknown table: รัน schema ก่อน seed; count เปลี่ยนหลังรัน seed ซ้ำไม่ควรเพิ่มเพราะ primary keys; NULL ใช้ IS NULL ไม่ใช้ `= NULL` SQL fixture อยู่ใน volume หลัง down ไม่จำเป็นลบ database หากต้อง reset ใช้ sandbox ใหม่ร่วมกับ mentor

## เกณฑ์ผ่าน

ส่ง SQL + expected/observed counts อธิบาย denominator, timezone UTC, half-open window `[from,to)` และ late arrivals ผู้เรียนต้องจับ invalid money/currency ที่ไม่ควรซ่อน missing valid event

## References

- [MariaDB SELECT](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select)
- [WooCommerce order query APIs](https://developer.woocommerce.com/docs/features/orders/high-performance-order-storage/)
