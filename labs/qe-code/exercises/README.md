# Beginner exercises

ทำงานในสำเนา sandbox ไม่แก้ reference tests ให้ยอมรับ input ผิด

1. สร้าง summarizeOrders ตามบท 02: empty/two-order tests ก่อน function
2. เลือก policy currency ผสมร่วมกับ mentor ก่อนเขียนโค้ด
3. ทำ async loadOrders โดย inject readText ที่คืน Promise<string>
4. เก็บ failing assertion → passing assertion และ PR evidence

Reference validator ไม่รับ PII/unknown fields และรับ timestamp UTC canonical แบบ `YYYY-MM-DDTHH:mm:ss.sssZ` เท่านั้น เป็น contract ของ lab ไม่ใช่ข้ออ้างว่า API ทั่วไปต้องใช้รูปแบบนี้ทั้งหมด
