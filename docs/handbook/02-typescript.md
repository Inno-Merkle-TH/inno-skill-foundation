# 02 — เขียนโค้ดตรวจข้อมูลธุรกิจ

## Prerequisites / เป้าหมาย

ผ่านบท 01 มี Node.js 22.x และ npm เป้าหมายคืออ่านข้อมูลจาก JSON ตรวจ runtime input และเขียน test ทั้ง valid/invalid โดยอธิบายโค้ดเองได้

## Mental model / คำศัพท์

Variable เก็บค่า, object รวม fields, array รวมหลาย records, function รับ input และคืน output, Promise แทนผลที่อาจยังไม่พร้อม TypeScript ตรวจ type ตอนพัฒนา แต่ข้อมูลจาก API ยังต้อง validate ตอน runtime

เงินบาทใน lab เก็บ minor units: 199 บาท = `19900` สตางค์ ลดปัญหา float; currency ใช้รหัสตัวพิมพ์ใหญ่ 3 ตัว Date ใช้ ISO UTC ที่ลงท้าย `Z` สถานะ order กับ consent เป็นคนละ field

## Lab: validator ที่มี tests

จาก folder หลักสูตร:

```bash
cd labs/qe-code
npm ci
npm test
npm run typecheck
```

Expected: test runner ผ่านและ typecheck ไม่รายงาน error เปิด `src/orders.ts` กับ `tests/orders.test.ts` เทียบ input ที่ถูกและผิด ทุก test ต้องตอบได้ว่าเปลี่ยน production behavior แบบไหนแล้ว test นี้จะ fail

จาก `labs/qe-code` รันตัวอย่าง standalone JavaScript เพื่อเริ่มจาก basics:

```bash
node --input-type=module -e 'const order={transactionId:"demo-001",valueMinor:19900,currency:"THB"}; console.log(`${order.transactionId}: ${order.valueMinor/100} ${order.currency}`)'
```

Expected: `demo-001: 199 THB` แก้ค่าเป็น string แล้วสังเกต JavaScript coercion; อธิบายว่าทำไมต้อง validate input ก่อนคำนวณ

## Exercise: ทำ test-first ในสำเนา sandbox

1. Copy coding lab ไป sandbox Git repo ของบท 01 โดยไม่ copy node_modules แล้วรัน npm ci
2. เพิ่ม `tests/order-summary.test.ts` กำหนด `summarizeOrders(orders)` คืน `{count,totalMinor}` test empty array ได้ `{count:0,totalMinor:0}` และสองรายการ 19900/5000 ได้ `{count:2,totalMinor:24900}`
3. รัน `npm test` ยืนยัน fail เพราะ function ยังไม่มี ไม่ใช่ typo
4. สร้าง `src/order-summary.ts` ใช้ function/loop หรือ reduce แล้วรัน tests + typecheck
5. เพิ่ม async exercise: `loadOrders(readText)` ที่รับ function คืน Promise<string>; malformed JSON ต้อง reject ไม่คืน empty success
6. ส่ง PR พร้อม RED/GREEN evidence และบอกว่าผลรวมหลาย currency ไม่ควรบวกเข้าด้วยกันโดยไม่มี policy

หาก AI ช่วย ต้องระบุส่วนที่ช่วยและตอบ mentor ได้ว่า `unknown`, guard และ Promise ทำอะไร ห้ามส่ง customer JSON ให้ AI

## Troubleshooting

`npm ci` ต้องมี lockfile รันใน `labs/qe-code` ไม่ใช่ root `Cannot find module` ตรวจ import/file name และ case `NaN` ตรวจ runtime type อย่าแก้ด้วย cast `as number` อย่างเดียว Tests fail เพราะ invalid fixture: เทียบ contract ไม่แก้ test ให้ยอมรับข้อมูลผิดเพื่อให้ green

## Reset / cleanup

Ctrl+C เมื่อ process ค้าง Coding lab ไม่มี DB ให้ล้าง เก็บ RED/GREEN evidence แล้วกลับ root ด้วย `cd ../..` ถ้าต้องคืน exercise ให้ใช้ sandbox branch ใหม่ ไม่ลบทับงานต้นฉบับ

## เกณฑ์ผ่าน

Tests ครอบคลุม valid, empty และ invalid input; ผู้เรียนอธิบายได้ว่าทำไม typecheck ไม่แทน runtime validation และพิสูจน์ test จับ defect ได้ Mentor ดูเฉลยแนวทางแยกใน `docs/mentor/code-answer-guide.md`

## References

- [TypeScript for new programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Vitest](https://vitest.dev/guide/)
