# 12 — Failover, backup และ recovery

## Prerequisites / mental model

มี core/tracking evidence เครื่องรองรับสอง apps Backup ไม่ใช่ HA; replication ไม่ใช่ backup; RTO คือเวลาที่ตั้งเป้ากลับมาให้บริการ RPO คือข้อมูลย้อนหลังที่ยอมสูญเสีย ต้องกำหนดก่อนทดลองแล้ววัดจริง ไม่ยืม production SLA มาใส่ lab

## Lab A: app failover

จาก `labs/commerce`: `bash tests/failover.sh` ใช้ Compose HA override มี app A/B แชร์ WordPress volume และ DB ทดสอบ stop A แล้ว shop ยังตอบ; backend header เป็น lab-only ห้ามใช้ข้อมูลนี้ใน production โดยไม่พิจารณา security

Expected: GET storefront fallback ได้ แต่ request checkout ที่เริ่มก่อน app ล้มอาจมี outcome ไม่แน่นอน ห้าม retry POST checkout อัตโนมัติแบบสร้าง order ซ้ำ ตรวจ order/transaction ID ก่อนทุก recovery action

Backup script ชุดนี้ครอบคลุม commerce DB + wp-content ไม่รวม eventdb/LINE/GA4 ต้องระบุ RPO และ recovery policy ของแต่ละ store แยก การ restore order snapshot เก่ากว่า events อาจทำ reconciliation ไม่ตรงตามคาด ห้ามสรุปว่า end-to-end recovery ครบจาก core snapshot อย่างเดียว

## Lab B: database outage

จาก `labs/commerce` หยุด DB `docker compose stop db` แล้วทดสอบอ่านหน้าและ checkout บันทึก 5xx/error และผลต่อ orders เปิดกลับ `docker compose start db` ตรวจ health และ reconciliation ห้ามตีความว่า app B แก้ DB outage ได้

## Lab C: isolated restore

กลับ core mode และหยุด app B ก่อน backup:

```bash
docker compose -f compose.yaml -f compose.ha.yaml stop wordpress-b
docker compose up -d --build --wait proxy wordpress
bash scripts/backup.sh
```

นำ backup path ที่ output เช่น `backups/20261009T...Z` มาใช้ `bash tests/restore.sh <path>` โดยแทน `<path>` จริง Restore ตรวจ snapshot identity/SHA256 ก่อนเริ่ม services แยก project/volumes จาก primary และปฏิเสธถ้ามีตารางอยู่แล้ว Expected: SQL import ผ่าน options/orders count/value ตรงและ uploaded fixture อยู่; ยังต้องตรวจ user-visible pages/ownership และ incident-specific records ก่อนประกาศ recovery ครบ

## Troubleshooting / cleanup

Backup interrupt: trap เปิด services กลับ ให้ดู exit status ไม่ใช้ไฟล์ครึ่งหนึ่ง Restore existing DB: script ปฏิเสธ อย่าลบ volume โดยอัตโนมัติ ใช้ sandbox ใหม่เช่น `RESTORE_PROJECT_NAME=qe-foundation-restore-round2 bash tests/restore.sh <path>` prefix จำกัดไม่ให้ชี้ primary project Secrets/backups อยู่ .gitignore แต่ยังต้องตรวจ staged files

หยุด restore ด้วย `docker compose -p qe-foundation-restore -f compose.restore.yaml down` เก็บ volumes; core cleanup down โดยไม่ -v ถ้า image/config HA cached ให้ rebuild core proxy

## Exercise / เกณฑ์ผ่าน

ส่ง recovery report พร้อม timeline, error rate, orders/events ก่อน/หลัง, RTO/RPO ที่ตั้งและวัด, uploaded asset verification ระบุ SPOFs: DB, proxy, full shared WP volume, host, tunnel; single-machine simulation ไม่ใช่ production HA

## References

- [Docker volumes](https://docs.docker.com/engine/storage/volumes/)
- [MariaDB backup basics](https://mariadb.com/docs/server/server-management/backup-and-restore)
