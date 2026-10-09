# 01 — อ่านระบบผ่าน HTTP และส่งงานผ่าน GitHub

## Prerequisites / เป้าหมาย

ผ่านบท 00 ใช้ browser DevTools ได้ มี Git ส่วน GitHub ใช้ sandbox ที่ mentor อนุมัติ เป้าหมายคืออธิบาย request/response และสร้าง PR ที่ reviewer ตรวจได้

## Mental model

Browser → HTTP request → application → data → HTTP response Status `200` บอกว่า server ตอบสำเร็จตาม protocol ไม่รับประกันว่าข้อมูลธุรกิจถูกหรือ analytics บันทึกครบ `4xx` มักเป็นปัญหา request/auth; `5xx` เป็น server-side failure แต่ต้องตรวจ body/log ประกอบ

Request ประกอบด้วย method, URL, headers และอาจมี body; JSON เป็นรูปแบบข้อมูล ไม่ใช่ database Token/cookie ที่เห็นใน DevTools เป็นข้อมูลลับ ห้ามแนบ raw HAR จาก production

Git: working tree → staging → commit → remote; PR คือข้อเสนอเปลี่ยนแปลง ไม่ใช่การ deploy อัตโนมัติ

## Lab A: HTTP ในเครื่อง

จาก folder หลักสูตร:

```bash
node --input-type=module -e 'import {createServer} from "node:http"; createServer((request,response)=>{response.setHeader("Content-Type","application/json"); response.end(JSON.stringify({path:request.url,status:"lab"}));}).listen(8099,"127.0.0.1")'
```

Expected: terminal ค้างรอ request ไม่ใช่ error เปิด `http://127.0.0.1:8099/?source=line` ใน browser → DevTools → Network → reload → เลือก request บันทึก method, status, query string, Content-Type และ response เปิด Console เทียบ object ที่ parse แล้วกับ JSON string

เปิด terminal อีกอัน:

```bash
curl -i 'http://127.0.0.1:8099/?source=line'
```

Expected: HTTP 200 และ JSON ที่มี path พร้อม query ลอง `/missing` จะยัง 200 เพราะ server ตัวอย่างไม่ได้ตรวจ route จึงต้องเขียน assertion ตาม business requirement ไม่เชื่อ status เพียงอย่างเดียว

## Lab B: GitHub PR

ทำเฉพาะ sandbox ใหม่ ไม่ใช้ repository ของลูกค้า:

1. Mentor/ผู้เรียนสร้าง private repo ใน GitHub พร้อม README และกำหนดผู้มีสิทธิ์ review
2. Copy clone URL จาก repo; terminal ในโฟลเดอร์สำหรับงานทดลอง รัน `git clone <URL>` โดยแทน `<URL>` จริง แล้ว `cd <ชื่อ-repo>`
3. ตั้ง author ใน repo นี้ `git config user.name "ชื่อผู้เรียน"` และ `git config user.email "email ที่ทีมอนุญาต"` ไม่เปลี่ยน global settings โดยไม่จำเป็น
4. ทำตามคำสั่ง:

```bash
git status
git switch -c feature/http-evidence
printf 'HTTP lab: status 200 is not a business assertion.\n' > http-evidence.txt
git diff
git add http-evidence.txt
git diff --cached
git commit -m "docs: record HTTP lab evidence"
git push -u origin feature/http-evidence
```

5. เปิด PR ใน GitHub ไป default branch ของ sandbox ใส่ purpose, changes, test evidence, risks และ rollback ให้ mentor comment แล้วแก้หนึ่งรอบก่อน merge

Expected: PR มีไฟล์เดียว ไม่มี token/cookie และแสดงหลักฐาน assertion ไม่ใช่ข้อความ “tested OK” อย่าใช้ `git add .` โดยไม่ดู staged diff

## Troubleshooting

`EADDRINUSE`: port 8099 มีผู้ใช้แล้ว ให้เลือก port ใหม่และแก้ URL ให้ตรง `Author identity unknown`: ตั้ง repo-local author `Authentication failed`: ใช้ approved GitHub sign-in/credential flow ไม่ใส่ password/token ใน URL `not a git repository`: ตรวจ `pwd` ก่อน ไม่ init repo หลักสูตรเพื่อแก้ข้อผิดพลาดนี้

## Reset / cleanup

Ctrl+C ใน terminal server เพื่อหยุด ตรวจ URL เข้าไม่ได้แล้ว Sandbox เก็บไว้เป็นหลักฐาน ไม่ลบ shared branch ไม่ใช้ force push

## หลักฐานที่เก็บ

อธิบายว่าทำไม `/missing` ยัง 200 และเสนอ assertion ที่จับได้ แยก request query กับ response JSON ส่ง PR ที่ได้รับ review พร้อม redacted Network screenshot และอธิบาย working tree/staging/commit/remote ได้

## Lab C: ตรวจหลักฐานก่อนส่ง PR

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| เทียบ `curl -i` กับ Network สำหรับ URL เดียวกัน | method/query/status/body ตรงกัน ไม่ใช้ screenshot แทน assertion |
| เรียก `/missing` แล้วเขียน expected ของระบบจริง | demo ยัง 200; อธิบายได้ว่าต้องตรวจ route/business response เพิ่ม |
| แก้ข้อความหลัง `git add` แล้วดู `git diff` กับ `git diff --cached` | แยก unstaged/staged ได้; stage เฉพาะฉบับที่ต้องการก่อน commit |

## Checklist — ลงมือทำครบหรือยัง

- [ ] บันทึก request/response โดยไม่มี cookie/token
- [ ] ได้ PR ที่ชี้ commit และมี purpose/test/risk/rollback
- [ ] ตรวจ staged diff และแก้ review comment หรือบันทึกว่ายังรอ review
- [ ] หยุด HTTP server ด้วย Ctrl+C และตรวจว่า URL ใช้ไม่ได้แล้ว

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายกรณี HTTP 200 แต่ requirement ไม่ผ่านได้
- [ ] บอกความต่าง commit, push, PR และ deploy ได้
- [ ] ชี้ได้ว่าไฟล์ใหม่ที่ untracked ดูด้วย `git status` ก่อน ไม่ใช่ `git diff` อย่างเดียว

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [HTTP overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Git basics](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [GitHub pull requests](https://docs.github.com/en/pull-requests)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
