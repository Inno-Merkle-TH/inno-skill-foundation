# วิธีทำ lab และตรวจตัวเอง

## วงจรการเรียน

1. อ่าน prerequisites และเปิดเฉพาะ services ที่บทนั้นใช้
2. เขียน expected result ก่อนลงมือ แล้วทำ lab หลักตามลำดับ
3. เปลี่ยน input หรือทำ failure case ทีละอย่าง เปรียบเทียบ actual กับ expected
4. ติ๊ก checklist ลงมือทำเมื่อมีหลักฐาน และติ๊กความเข้าใจเมื่ออธิบายด้วยตัวเองพร้อมตัวอย่างได้
5. คืนระบบ ตรวจ cleanup และบันทึกสิ่งที่ยังไม่รู้ก่อนไปบทถัดไป

ใช้ [learning evidence](../../templates/learning-evidence.md) หนึ่งชุดต่อบท เก็บใน sandbox ของตน ไม่แก้ checklist ต้นฉบับให้คนถัดไปเห็นว่าผ่านแล้ว ไม่มีคะแนนหรือการจัดอันดับ

| สถานะ | ใช้เมื่อ |
|---|---|
| ทำแล้วและตรวจแล้ว | มี assertion/result ที่ทำซ้ำได้ พร้อม environment/commit |
| ต้องลองใหม่ | ผลไม่ตรง expected; เก็บ error และสิ่งที่จะลองต่อ |
| ยังไม่ทำ | ไม่มีบัญชี เครื่องมือ หรือยังไม่ถึงขั้น implementation |
| ไม่ใช้ในขอบเขตนี้ | optional ไม่ได้เลือกทำ; ระบุเหตุผล ไม่ติ๊กว่าผ่าน |

Self-check ไม่ใช่แค่รันตามแล้วเห็นสีเขียว: ลองอธิบายโดยปิดคู่มือ เปลี่ยน fixture แล้วทำนายผลก่อนรัน หากต้องดูเฉลยให้ลองใหม่ด้วยข้อมูลอีกชุด Mentor ช่วยเมื่อมีข้อสงสัย; การผูก Provider, เปิด public endpoint และตัดสินกฎหมายยังต้อง owner/ผู้มีหน้าที่ตรวจตาม policy

## Working directory และ sandbox

- คำว่า **root** หมายถึงโฟลเดอร์ที่มี README นี้อยู่เหนือ `docs/`; ใช้ `pwd` ตรวจเสมอ
- ทุก code block ที่มี `cd labs/...` ให้เริ่มจาก root ใหม่ ไม่รันต่อจาก directory ของ block เก่า
- shell commands ใช้ Bash/WSL/Git Bash; Node ต้อง `>=22.22.3 <23` ตาม package engines
- แก้แบบฝึกใน Git sandbox ไม่แก้ reference assertions เพื่อให้รับข้อมูลผิด
- ใช้สำเนา tracked files ที่ไม่มี `.env`, backups, node_modules หรือ credentials; อย่า copy hidden files ทั้งโฟลเดอร์โดยไม่ตรวจ
- ก่อน commit ใช้ `git status`, `git diff`, `git diff --cached`; ไฟล์ untracked ยังไม่แสดงใน diff

## ลำดับและขอบเขต

| กลุ่ม | dependency | รันอะไรได้ |
|---|---|---|
| 00–03 | Node/Git; GitHub account สำหรับ PR จริง | local HTTP, coding tests, Git rehearsal |
| 04–05 | Docker core store | checkout, persistence, SQL fixtures |
| 06–08 | core + tracking profile | API/UI, CI, event collector |
| 09–10 | OA test account/mobile; owner review ก่อน public | OA features, rich menu, identity map |
| 11–14 | core/tracking; ผล mobile แยกตามสิ่งที่ทำจริง | failure/recovery/governance/capstone |
| Extensions | core; API/Login ต้องพัฒนาเพิ่มก่อน live | offline lab ก่อน แล้วเลือก live integration |

SQL/TypeScript fixtures ไม่ใช่ตัวดึง live WooCommerce orders อัตโนมัติ และ core ยังไม่มี LINE webhook/Login/GA4 instrumentation อย่านำ fixture test ผ่านไปอ้างว่าทุก integration ทำงานแล้ว

## Public tunnel preflight

ปิด ngrok ไว้ก่อน ตรวจจากเครื่องด้วยคำสั่งนี้ (core ต้องเปิดอยู่):

```bash
for route in /wp-admin/ /wp-login.php /xmlrpc.php /wp-json/wp/v2/users '/?rest_route=/wp/v2/users'; do
  curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:8080$route"
done
```

Expected: ทุกบรรทัดเป็น `403`; ตรวจ `docker compose ps` จาก `labs/commerce` ว่า DB ไม่ publish host port และ 8081 ผูก loopback ผ่าน owner review แล้วจึงเปิด tunnel เฉพาะ 8080 ทดสอบ paths เดิมผ่าน HTTPS อีกครั้งก่อนแชร์ URL หากมี ngrok warning ให้แยกออกจาก response ของ app ห้ามเผย 8081 หรือ DB เพื่อแก้ปัญหา

Public store และ collector เป็น lab ไม่ใช่ hardened production: เปิดระยะสั้นเฉพาะ test audience ไม่ส่งข้อมูลจริง ปิด tunnel หากเกิด traffic ไม่คาดคิด

## คืนระบบหลัง lab

- อย่ารัน E2E พร้อม smoke/failover/backup เพราะ scripts หยุด/restart service ได้
- หลัง collector outage: จาก `labs/commerce` ใช้ `docker compose --profile tracking up -d qe-api` แล้วตรวจ `/lab-api/health`; health ไม่พิสูจน์ event DB persistence
- หลัง DB outage: `docker compose start db` แล้วตรวจ `docker compose ps` และ storefront ก่อนทำงานต่อ
- หลัง tunnel: Ctrl+C ngrok, คืน `PUBLIC_URL=http://localhost:8080` ใน `.env`, จาก `labs/commerce` รัน `docker compose up -d --force-recreate wordpress` แล้วตรวจร้านค้า/admin
- หลัง HA: ทำขั้นคืน core mode ในบท 12 ก่อน lab อื่น หากแก้ config ที่ COPY ใน image ต้อง rebuild ไม่ใช่ restart อย่างเดียว
- หยุด core/tracking ด้วย `docker compose --profile tracking down` โดยไม่ใส่ `-v`; หยุด app B/restore project แยกตามบท 12
- เก็บ volumes เป็นหลักฐาน ไม่รัน `down -v`, `git clean -fdx` หรือ restore ทับ primary เพื่อทำให้ผลดูผ่าน

## หลักฐานที่แชร์ได้

เก็บคำสั่ง, exit status, expected/actual, synthetic IDs, commit และข้อจำกัด ไม่เก็บ passwords, cookies, access tokens, real UID, raw HAR หรือ backup bundle ใน PR อธิบาย test fail ก่อนแก้และ test หลังแก้ให้สัมพันธ์กับ defect เดิม

[กลับสารบัญ](../../README.md) · [เริ่มบท 00](00-setup.md)
