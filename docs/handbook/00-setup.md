# 00 — เตรียมเครื่องและวิธีเรียน

## เป้าหมาย / prerequisites

มีคอมพิวเตอร์ที่ทีมอนุญาตติดตั้งโปรแกรม browser และ terminal ไม่มี prerequisite เขียนโค้ด ขอ mentor ช่วยก่อนติดตั้งหากเครื่องมี corporate policy ห้ามปิด antivirus หรือ security controls เพื่อให้ lab ผ่าน

## Mental model และคำศัพท์

Terminal คือหน้าต่างรับคำสั่ง; shell เช่น zsh/bash เป็นตัวแปลคำสั่ง; current directory คือที่อยู่ที่คำสั่งทำงาน; runtime เช่น Node.js ใช้รันโปรแกรม; Git เก็บ version ในเครื่อง ส่วน GitHub ให้บริการ remote repository และ review

โครง learning evidence: คาดหวังอะไร → ทำอะไร → เห็นอะไร → พิสูจน์อย่างไร → ยังเสี่ยงอะไร Screenshots อย่างเดียวไม่พอหากไม่มี assertion/result ที่อธิบายได้

## ติดตั้ง

ใช้ official installers และเลือก stable/LTS ไม่ใช้สคริปต์ที่ไม่ทราบแหล่งที่มา:

| OS | Terminal / Git | Runtime | Containers |
|---|---|---|---|
| macOS | Terminal; Git จาก official installer หรือเครื่องมือที่ IT อนุมัติ | Node.js 22.22.3 หรือ 22.x ใหม่กว่าที่ทีมอนุมัติ | Docker Desktop หาก license อนุญาต; fallback Linux VM + Docker Engine |
| Windows | PowerShell สำหรับตรวจ version; Git Bash หรือ WSL2 Bash สำหรับ lab commands | Node.js 22.x ผ่าน official installer; ถ้าใช้ WSL ให้ติดตั้งใน WSL ด้วย | Docker Desktop ตามสิทธิ์ หรือ Linux VM ที่ทีมอนุมัติ |
| Linux | bash และ Git ตาม official/package-manager instructions ของ distro | Node.js 22.x | Docker Engine + Compose plugin |

Windows lab ที่มี `printf`, `cat` หรือ shell script ให้ใช้ Git Bash/WSL ไม่ copy ไป PowerShell ตรง ๆ path ที่ clone ใน WSL ต้องอยู่ใน filesystem ที่ผู้เรียนเข้าใจ หากองค์กรห้าม local installation ใช้ Linux VM ที่ mentor เตรียม ไม่อ้างว่า browser-only เรียนทุก lab ได้

ติดตั้ง editor ที่ทีมใช้ เช่น VS Code; เปิด folder หลักสูตรเป็น workspace อย่าสร้างไฟล์ไว้ใน terminal home โดยไม่รู้ตัว

## ตรวจเครื่อง

รันจาก folder หลักสูตร; PowerShell ใช้ `Get-Location` แทน `pwd` ได้:

```bash
pwd
git --version
node --version
npm --version
docker version
docker compose version
```

Expected: Git มี version, Node ขึ้น `v22...`, npm มี version; Docker แสดงทั้ง Client และ Server ส่วน Docker CLI อย่างเดียวไม่ยืนยันว่า engine พร้อมใช้งาน ไม่ต้องติดตั้ง Docker เพื่อทำบท 1–3

## บัญชีและต้นทุน

GitHub: ใช้บัญชีที่ทีมอนุญาต เปิด 2FA และสร้างเฉพาะ sandbox repository ตาม policy ห้ามอัปโหลดข้อมูลภายในสู่ public repo LINE account และ ngrok ยังไม่ต้องสร้างตอนนี้ Claude ไม่จำเป็นต่อบทเริ่มต้น; ไม่มีสิทธิ์ใช้ให้ทำ brainstorming/planning/test/review ด้วยมือ

Docker Desktop ไม่ฟรีสำหรับทุกองค์กร ตรวจ [license](https://docs.docker.com/subscription-billing/desktop-license/) ก่อนเลือก ใช้ [Docker Engine บน Linux](https://docs.docker.com/engine/install/) เป็น free route ที่ยังต้องผ่าน policy

## Troubleshooting

- `command not found`: เปิด terminal ใหม่หลัง install แล้วตรวจ PATH; อย่าใช้ sudo เพื่อแก้แบบสุ่ม
- Docker มี Client แต่เชื่อม Server ไม่ได้: เปิด engine ที่อนุมัติและตรวจ context; ยังเรียนบท 1–3 ได้
- Port ชนในบทถัดไป: ตรวจ process เจ้าของ port ก่อนเปลี่ยน config ห้าม kill โปรแกรมคนอื่น
- npm permission denied: ห้าม sudo npm install ใน workspace; ตรวจ owner และตำแหน่งโฟลเดอร์กับ mentor

## Reset / cleanup

บทนี้ไม่มี container หรือข้อมูลให้ลบ ถ้าเปลี่ยน terminal ให้กลับเข้า folder หลักสูตรแล้วใช้ `pwd` ตรวจ ไม่รัน `rm -rf`, `git clean -fdx` หรือ factory reset เพื่อแก้เครื่อง

## Exercise / เกณฑ์ผ่าน

ส่ง version checklist ตาม template โดยไม่แนบ hostname/user path ที่ละเอียดเกินจำเป็น อธิบายความต่าง CLI/runtime/server และบอกว่าบัญชีใดจำเป็นตอนนี้ หาก Docker ยังไม่พร้อมให้บันทึก limitation ไม่ทำเครื่องหมายผ่าน Docker

## References

ตรวจแหล่งหลัก 2026-10-09; platform setup อื่นยังไม่ได้ทดลองจริง:

- [Git installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js download](https://nodejs.org/en/download)
- [Docker Engine installation](https://docs.docker.com/engine/install/)
- [Claude Skills](https://code.claude.com/docs/en/skills)
