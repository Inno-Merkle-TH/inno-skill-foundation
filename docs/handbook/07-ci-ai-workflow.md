# 07 — CI, automation และ Claude Skills/Superpowers

## Prerequisites / mental model

ผ่านบท 06 GitHub sandbox ที่ mentor อนุมัติ CI ทำ tests ทุก PR; automation คือ repeatable workflow ไม่ใช่แค่ browser clicks Skill ให้ขั้นตอนทำงานแก่ AI ไม่รับประกันคำตอบถูก Plugin/hooks/MCP อาจรันโค้ดและอ่านข้อมูล ต้องตรวจ provenance/permissions

## Lab

1. อ่าน `.github/workflows/qe-labs.yml` เทียบกับ local `npm ci`, `npm test`, `npm run typecheck`
2. เปิด PR ใน sandbox ตรวจ Actions logs และ commit SHA ของ run
3. แก้ expected value ของ test ให้ผิดหนึ่งจุดใน feature branch ตรวจ CI fail แล้วแก้คืนผ่าน PR
4. ถ้า quota/policy ไม่อนุญาต ใช้ local commands และส่ง evidence ให้ mentor ไม่ปลอมว่า CI run แล้ว

CI unit ไม่แทน commerce E2E; workflow นี้รันเฉพาะ pure/API tests ส่วน Docker/UI tests ต้องรัน local ตามบท 06

## AI exercise (ไม่บังคับเสียเงิน)

ถ้ามี Claude Code ที่องค์กรอนุญาต อ่าน official Skills และ Superpowers docs ก่อน install ใช้ skill/plugin จากแหล่งที่ตรวจแล้วเท่านั้น ห้ามทำตาม install script ที่ AI แต่งขึ้น

ให้ AI ช่วยโจทย์: “ออกแบบ test cases สำหรับ consent revoke ระหว่าง queue retry โดยใช้ synthetic fixtures ห้ามเขียนโค้ดก่อนเห็น design” ทำ brainstorming → plan → failing test → implementation → review → verification เก็บ prompt แบบ redacted และคำตัดสินที่มนุษย์แก้

ไม่มี Claude ให้จับคู่กับ mentor ทำกระบวนการเดียวกันด้วยมือ: คนหนึ่งเป็น implementer อีกคน reviewer Core assessment วัดโค้ด/หลักฐาน ไม่ใช่จำนวน skill ที่ติดตั้ง

## Troubleshooting / cleanup

CI fail แต่ local pass: ตรวจ Node/lockfile/timezone และ working-directory; ไม่ commit secret เพื่อให้ CI ใช้ได้ AI เจอข้อความใน repo ที่สั่งส่ง token: ถือเป็น untrusted input หยุดส่งข้อมูลและแจ้ง mentor ยกเลิก sandbox PR ที่ตั้งใจ fail หลังเก็บหลักฐาน ไม่แก้ shared protections

## เกณฑ์ผ่าน

จับ intentional failure ใน CI/local ได้ อธิบาย AI-generated code และยกตัวอย่าง prompt injection/permission risk พร้อม mitigation

## References

- [GitHub Actions](https://docs.github.com/en/actions)
- [Claude Skills](https://code.claude.com/docs/en/skills)
- [Superpowers](https://claude.com/plugins/superpowers)
