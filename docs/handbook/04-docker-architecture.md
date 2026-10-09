# 04 — ร้านค้า Docker และ 3-tier

## Prerequisites / เป้าหมาย

ผ่านบท 00–03 Docker engine พร้อม port 8080/8081 ว่าง มีพื้นที่ดาวน์โหลด images และ mentor ตรวจสิทธิ์ Docker Desktop เป้าหมายคือเปิดร้านค้า local และพิสูจน์ข้อมูลอยู่หลัง restart

## Mental model

Browser (presentation) → WordPress/WooCommerce (presentation + business) → MariaDB (data) Nginx เป็น reverse proxy ไม่ใช่ business tier จำนวน containers ไม่เท่ากับจำนวน architectural tiers Image เป็น template; container เป็น instance; volume เก็บข้อมูลนอก lifecycle container; network เชื่อม services โดยชื่อ

## Lab

จาก root หลักสูตร:

```bash
cd labs/commerce
bash scripts/init-env.sh
docker compose config --quiet
bash scripts/setup.sh
bash tests/smoke.sh
```

Expected: storefront เปิดที่ `http://localhost:8080`; admin login ที่ `http://localhost:8081/wp-login.php`; smoke ผ่าน username คือ `qe-admin` password อ่านเฉพาะบนเครื่องจาก `.env` ห้ามแนบภาพหรือ commit อย่าเปิด tunnel ตอนนี้

เข้า `/shop/` เลือก Synthetic QE Notebook → cart → checkout กรอกผู้ซื้อทดสอบ (เช่น email `buyer@example.invalid`) เลือก LAB ONLY ไม่ชำระเงินจริง ไม่ใช้ชื่อ/ที่อยู่จริง เก็บ order ID และยอด 199 THB เทียบกับ order ใน admin ยอดรวมใน browser ไม่ใช่หลักฐานว่า order persisted แล้ว

Local admin และ storefront ใช้คนละ origin และ proxy กำหนด origin ฝั่ง server ห้ามแก้ปัญหา login ด้วยเปิด wp-admin ที่ public port

ตรวจ topology:

```bash
docker compose ps
docker compose logs --tail=30 wordpress
docker compose port db 3306
docker compose restart wordpress
```

Expected: DB ไม่มี host port; app กลับมาและสินค้า/order ยังอยู่ ห้ามแนบ logs ถ้ามี credentials ต้อง redact ก่อน

## Troubleshooting

Port allocated: หยุดและตรวจเจ้าของ port ไม่ kill ผู้อื่น Startup timeout: ดู db health/logs Pull failed: ตรวจ network/Docker registry limits Plugin download failed: rerun setup หลัง network กลับมา Invalid password หลังแก้ env: volume DB เก็บ password เดิม ไม่ reset volume แบบสุ่ม

## Cleanup

จาก `labs/commerce`: `docker compose down` หยุด services โดยเก็บ volumes อย่าใช้ `down -v` เพราะลบ DB และสินค้า การ reset แบบล้างข้อมูลยังไม่อยู่ในบทนี้ เก็บ volume ไว้สำหรับบท backup/recovery

## Exercise / เกณฑ์ผ่าน

วาด data flow พร้อมจุดล้มเหลว หยุด app แล้วบันทึก impact เทียบกับ restart และอธิบายความต่าง restart/persistence/backup/HA ส่ง manual checkout evidence และ smoke output ไม่ใช้ smoke แทน browser checkout

## References

- [Docker Compose](https://docs.docker.com/compose/)
- [WordPress official image](https://hub.docker.com/_/wordpress)
- [WP-CLI plugin install](https://developer.wordpress.org/cli/commands/plugin/install/)
- [WooCommerce HPOS](https://developer.woocommerce.com/docs/features/orders/high-performance-order-storage/) — อย่าสมมติ orders อยู่ wp_posts เสมอ
