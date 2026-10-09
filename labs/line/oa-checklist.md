# OA manual checklist

- [ ] บัญชีทดลอง owner/roles ชัดเจน ไม่ผูก production
- [ ] Profile บอกว่าไม่รับเงินจริง
- [ ] Greeting ถูก trigger เมื่อเพิ่มเพื่อน
- [ ] Auto-response และ human chat ไม่ตอบซ้ำโดยไม่ได้ตั้งใจ
- [ ] Rich menu publish และเข้า shop เดิมด้วย UTM
- [ ] Broadcast quota ตรวจจาก console ก่อนส่ง
- [ ] Provider review ผ่านก่อน enable API
- [ ] Public endpoints review ผ่านก่อนเปิด ngrok
- [ ] LINE in-app/external browser evidence แยกกัน
- [ ] Logs/screenshots ไม่มี tokens/real UID
- [ ] ปิด tunnel และคืน local URL หลัง lab

ไม่มีเครื่องหมายผ่านล่วงหน้า ตรวจด้วยบัญชีทดลองจริงและบันทึก expected/actual; owner review ก่อนผูก Provider/เปิด public endpoint ตาม policy

ทำตาม [บท OA](../../docs/handbook/09-line-oa.md) แล้วบันทึกผลใน [learning evidence](../../templates/learning-evidence.md) ข้อที่ยังไม่มีบัญชีหรือสิทธิ์ให้ระบุยังไม่ทำ ไม่ถือว่าผ่านจากภาพตัวอย่าง
