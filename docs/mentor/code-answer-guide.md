# Mentor: beginner code review

อย่าแจกไฟล์นี้ก่อนผู้เรียนลองเอง

Summary exercise ต้องคืน count ตามจำนวนรายการและ totalMinor ตามยอดรวมใน currency เดียว ใช้ safe integer และห้าม silently รวมหลาย currency ให้ผู้เรียนเสนอ policy (reject หรือ group) ก่อนเพิ่ม interface

Test ที่ควรเห็น: empty array, one/multiple orders, invalid input และ negative behavior ที่จับด้วย assertion จริง Async exercise ต้อง await readText, parse JSON, validate แต่ละ record และ propagate error ไม่ swallow เป็น empty success

ถามผู้เรียนให้เปลี่ยน test fixture โดยไม่ใช้ AI: valueMinor เป็น string, currency lowercase, invalid timestamp, extra fields ทำไม validator ตัดสินเช่นนั้น TypeScript type เป็น compile-time ไม่ใช่คำรับประกัน input ที่ส่งมาจาก network
