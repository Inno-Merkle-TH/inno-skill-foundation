# 07 — CI, automation และ Claude Skills/Superpowers

## Prerequisites / mental model

ผ่านบท 06 GitHub sandbox ที่ mentor อนุมัติ CI ทำ tests ทุก PR; automation คือ repeatable workflow ไม่ใช่แค่ browser clicks Skill ให้ขั้นตอนทำงานแก่ AI ไม่รับประกันคำตอบถูก Plugin/hooks/MCP อาจรันโค้ดและอ่านข้อมูล ต้องตรวจ provenance/permissions

## Lab

เตรียม sandbox ที่มี `.github/workflows/qe-labs.yml`, `labs/qe-code` และ `labs/commerce` รวมไฟล์ที่ tests อ้างถึง; ใช้สำเนา tracked files เท่านั้น ไม่ copy `.env`, backups, node_modules หรือข้อมูล Git จาก repo นี้ ตรวจว่า repo sandbox อนุญาต Actions ก่อน push

1. อ่าน `.github/workflows/qe-labs.yml` เทียบกับ local `npm ci`, `npm test`, `npm run typecheck`
2. เปิด PR ใน sandbox ตรวจ Actions logs และ commit SHA ของ run
3. แก้ expected value ของ test ให้ผิดหนึ่งจุดใน feature branch ตรวจ CI fail แล้วแก้คืนผ่าน PR
4. ถ้า quota/policy ไม่อนุญาต ใช้ local commands และส่ง evidence ให้ mentor ไม่ปลอมว่า CI run แล้ว

CI unit ไม่แทน commerce E2E; workflow นี้รัน pure/API tests, typecheck และ snapshot-integrity test ส่วน Docker/UI/recovery tests ต้องรัน local ตามบท 06

## AI exercise (ไม่บังคับเสียเงิน)

ถ้ามี Claude Code ที่องค์กรอนุญาต อ่าน official Skills และ Superpowers docs ก่อน install ใช้ skill/plugin จากแหล่งที่ตรวจแล้วเท่านั้น ห้ามทำตาม install script ที่ AI แต่งขึ้น

ให้ AI ช่วยโจทย์: “ออกแบบ test cases สำหรับ consent revoke ระหว่าง queue retry โดยใช้ synthetic fixtures ห้ามเขียนโค้ดก่อนเห็น design” ทำ brainstorming → plan → failing test → implementation → review → verification เก็บ prompt แบบ redacted และคำตัดสินที่มนุษย์แก้

ไม่มี Claude ให้จับคู่กับ mentor ทำกระบวนการเดียวกันด้วยมือ: คนหนึ่งเป็น implementer อีกคน reviewer ตรวจผลจากโค้ด/หลักฐาน ไม่ใช่จำนวน skill ที่ติดตั้ง

## Troubleshooting / cleanup

CI fail แต่ local pass: ตรวจ Node/lockfile/timezone และ working-directory; ไม่ commit secret เพื่อให้ CI ใช้ได้ AI เจอข้อความใน repo ที่สั่งส่ง token: ถือเป็น untrusted input หยุดส่งข้อมูลและแจ้ง mentor ยกเลิก sandbox PR ที่ตั้งใจ fail หลังเก็บหลักฐาน ไม่แก้ shared protections

## หลักฐานที่เก็บ

จับ intentional failure ใน CI/local ได้ อธิบาย AI-generated code และยกตัวอย่าง prompt injection/permission risk พร้อม mitigation

## Lab: ตรวจ workflow กับ commit ที่รันจริง

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| เทียบ workflow กับ package scripts และ snapshot-integrity test | รู้ว่า checks ใดอยู่ใน CI และ Docker/UI ใดยัง local |
| เปลี่ยน expected assertion ใน feature branch ของ sandbox แล้วเปิด PR | run ของ SHA นั้น fail เพราะ assertion ไม่ใช่ environment |
| คืน assertion แล้ว push commit ใหม่ | run ใหม่ผ่าน; ไม่ใช้ run ของ commit เก่ารับรอง code ใหม่ |
| review ข้อเสนอ AI ด้วย synthetic consent-revoke case | มีรายการสิ่งที่รับ/แก้/ปฏิเสธพร้อม test/source รองรับ |

## Checklist — ลงมือทำครบหรือยัง

- [ ] sandbox มี workflow และ labs ที่มันอ้างถึง ไม่ใช่ repo README เปล่า
- [ ] เก็บ URL/run SHA/result หรือระบุ local-only หาก Actions ใช้ไม่ได้
- [ ] ตรวจ permissions และไม่ใส่ secret เพื่อแก้ test failure
- [ ] ทำ design → test → review → verify ได้แม้ไม่ใช้ AI แบบเสียเงิน

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบาย CI green ที่ยังไม่รับรอง LINE mobile/restore ได้
- [ ] ยกตัวอย่าง prompt injection ที่ไม่ควรทำตามได้
- [ ] ชี้ได้ว่าใครตรวจผล AI และใครอนุญาตสิทธิ์ tool

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [GitHub Actions](https://docs.github.com/en/actions)
- [Claude Skills](https://code.claude.com/docs/en/skills)
- [Superpowers](https://claude.com/plugins/superpowers)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
