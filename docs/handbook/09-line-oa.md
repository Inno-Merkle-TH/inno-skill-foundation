# 09 — สร้าง LINE OA ด้วยตัวเอง ก่อนเขียน bot

## Prerequisites / mental model

ร้านค้า local พร้อม มือถือและ LINE test account ที่ยินยอม ผู้เรียน/mentor เป็นผู้สร้างบัญชีเอง OA Manager ใช้ตั้งการสื่อสารของธุรกิจ Developers Console ใช้ channels/API credentials ไม่ใช่หน้าจอเดียวกัน

## Lab A: OA setup

1. เปิด [LINE OA creation](https://entry.line.biz/) ลงทะเบียน Business ID ตาม policy ทีม
2. สร้าง OA ชื่อเช่น “QE Lab — ชื่อ cohort” ไม่แอบอ้างธุรกิจจริง ไม่ซื้อ Premium ID
3. เข้า [OA Manager](https://manager.line.biz/) เลือกบัญชี ตรวจชื่อ/Basic ID/role ของตน
4. ตั้ง profile, icon และ description ว่าเป็นร้านทดลอง ไม่รับเงินจริง
5. ตั้ง greeting message ให้เพื่อนใหม่เห็นข้อความ “ร้านจำลองสำหรับฝึก QA/QE”
6. ตั้ง auto-response สำหรับคำว่า “ช่วยเหลือ” แล้วเทียบกับ manual chat พร้อมทดสอบช่วงที่ปิด/เปิดแต่ละโหมด
7. สร้าง rich menu แบ่ง “ดูสินค้า / ติดตามคำสั่งซื้อ / ช่วยเหลือ” ในบทนี้ tracking order ใช้หน้าคำอธิบาย ไม่เปิด order ใครก็ได้
8. ให้บัญชีทดสอบเพิ่มเพื่อนผ่าน QR/link เก็บผล greeting และ rich menu โดยปิดชื่อ/รูปผู้ใช้
9. ตรวจ free message quota ใน console แล้ว broadcast ข้อความทดลองหนึ่งครั้งเฉพาะกลุ่มที่ยินยอม บันทึกวิธีคิดโควตา ไม่ส่งซ้ำทุก automation run

ชื่อเมนู/feature availability อาจเปลี่ยน ให้ใช้ Learning Hub ประกอบและบันทึกวันที่ ห้ามเปิด API ก่อน Provider review ในบท 10

## Lab B: เปิดเว็บด้วย ngrok Free

ต้องตั้ง public mode กับ mentorก่อน: local `localhost` ใน rich menu มือถือชี้ไปมือถือ ไม่ใช่เครื่องผู้เรียน

1. สร้าง ngrok free account และติดตั้ง official agent ตาม [quickstart](https://ngrok.com/docs/getting-started/)
2. ลงทะเบียน authtoken ตาม dashboard บนเครื่องส่วนตัว ห้ามแนบ token ใน evidence
3. ก่อนเปิด tunnel ทดสอบ local public port 8080 ตาม [security preflight](learning-guide.md#public-tunnel-preflight) ให้ครบ แล้วจาก terminal รัน `ngrok http 8080` ดู assigned HTTPS dev domain
4. หยุด tunnel ชั่วคราว ตั้ง `PUBLIC_URL=https://<assigned-domain>` ใน `labs/commerce/.env` แล้วรัน `docker compose up -d --force-recreate wordpress` และตรวจ config/store
5. เปิด tunnel เดิมให้ mentor ตรวจ `/wp-admin/`, `/wp-login.php`, `/xmlrpc.php`, users REST และ rest_route bypass ถูกปฏิเสธ ไม่ส่ง credential ผ่าน public URL
6. Rich menu ใช้ `https://<assigned-domain>/shop/?utm_source=line&utm_medium=oa&utm_campaign=qe_lab&utm_content=rich_menu_shop`
7. เปิดจาก LINE in-app browser ดูหน้า ngrok warning ถ้ามี ยืนยันต่อ แล้วเทียบ external browser

ตรวจ restrictions บน localhost ก่อนเปิด tunnel และตรวจซ้ำผ่าน HTTPS ทันทีหลังเปิด หากไม่ผ่านให้ปิดทันที; ยังไม่แชร์ rich menu URL จนผ่าน endpoint security review; core local lab ใช้ต่อได้แม้ไม่เปิด LINE journey จริง

## Expected / exercise

เพื่อนใหม่เห็น greeting, auto-response ไม่ตอบซ้ำกับเจ้าหน้าที่โดยไม่ตั้งใจ, rich menu เข้า shop เดิมและ query UTM เห็นใน Network บันทึกว่าคลิกไม่เท่ากับ session/report/purchase และ warning page อาจเพิ่ม friction

## Troubleshooting / cleanup

rich menu ไม่ขึ้น: ตรวจ publish/default/display setting; ไม่ broadcast แก้แบบสุ่ม Link เข้าไม่ได้: ตรวจ tunnel running และ PUBLIC_URL; free quota เต็ม: mock/เลื่อน test ไม่อัปเกรดเสียเงินอัตโนมัติ Ctrl+C ปิด ngrok แล้วคืน PUBLIC_URL local/recreate app; ไม่ลบ OA เพราะมี Provider constraints

## หลักฐานที่เก็บ

ส่ง checklist feature ที่ตนตั้งเอง พร้อม mobile test cases และ configuration decisions ไม่ส่ง tokens/UIDs Mentor ไม่ถือ desktop browser เป็นหลักฐาน LINE app

## Lab C: เดิน journey จากมือถือแล้วเทียบ config

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| ให้ test account เพิ่มเพื่อนและส่ง keyword ที่ตั้งไว้ | greeting/auto-response ตรง configuration; เก็บ aliases แทน UID |
| เปิด rich menu จาก LINE in-app แล้วเปิด external browser | เข้าร้านเดิมและมี UTM; บันทึก session ที่ต่างกัน ไม่สรุป identity |
| ปิด ngrok แล้วกด rich menu อีกครั้ง | เว็บสาธารณะเข้าไม่ได้ แต่ local lab ยังตรวจได้หลังคืน URL |

## Checklist — ลงมือทำครบหรือยัง

- [ ] สร้าง OA และตั้ง profile/greeting/response/rich menu ด้วยตนเอง
- [ ] บันทึก quota ก่อน broadcast เฉพาะ test audience ที่ยินยอม
- [ ] ตรวจ local public-port restrictions ก่อนเปิด tunnel
- [ ] ทดสอบมือถือจริง แยกจาก desktop และบันทึก warning page ถ้ามี
- [ ] ปิด tunnel คืน PUBLIC_URL และทดสอบ local store/admin

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายได้ว่า OA Manager ต่างจาก Developers Console อย่างไร
- [ ] บอกเหตุผลที่ localhost ในมือถือไม่ใช่เครื่องที่รัน Docker
- [ ] อธิบายว่าคลิก rich menu ยังไม่ยืนยัน session, purchase หรือ report

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [OA Learning Hub](https://lineforbusiness.com/th/learning-hub/OA-B-01)
- [LINE OA/API creation](https://developers.line.biz/en/docs/messaging-api/getting-started/)
- [ngrok Free limits/interstitial](https://ngrok.com/docs/pricing-limits/free-plan-limits/)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
