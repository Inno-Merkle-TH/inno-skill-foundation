# QA → QE Foundation: Connected Commerce & Data Quality

สถานะ: Design spec รอผู้ใช้รีวิวก่อนจัดทำ implementation plan และคู่มือ/lab

## 1. เป้าหมายและความเข้าใจร่วมกัน

ผู้เรียนเป็น Manual QA ที่ต้องการพัฒนาเป็น Quality Engineer ซึ่งเขียนโค้ดได้ วิเคราะห์ความเสี่ยงของระบบ และตรวจ tracking/data quality ได้ ผู้ใช้อนุมัติแนวทางเรียนผ่านร้านค้า WordPress/WooCommerce เดียว เชื่อม LINE OA กับเว็บ และค่อยต่อยอด API/Login โดยใช้เครื่องมือฟรีเป็นหลัก GA4 เป็น optional แต่การตรวจ tracking เป็น core

สมมติฐานที่ใช้วางหลักสูตร: 14 สัปดาห์ สัปดาห์ละ 6–8 ชั่วโมง มี mentor ตรวจงานหนึ่งครั้งต่อสัปดาห์ ไม่ต้องมีพื้นฐานเขียนโปรแกรม ใช้ข้อมูลและบัญชีทดลอง ไม่มีการชำระเงินจริง ระยะเวลาเป็นกรอบประมาณการ ผู้เรียนที่ยังไม่ผ่าน checkpoint ให้ทบทวนก่อนขึ้นระดับ

ผลสำเร็จต้องวัดจากโค้ดและหลักฐาน ไม่ใช่การดูวิดีโอครบ:

- อธิบาย HTTP, 3-tier, data flow และ failure boundary ได้
- ใช้ Git/GitHub และ Git flow ทำ PR แก้ conflict และย้อนการเปลี่ยนแปลงได้
- เขียน TypeScript, SQL, API tests และ Playwright tests โดยอธิบายโค้ดได้
- ตรวจ event หาย ซ้ำ ผิด schema หรือผิดความหมายเทียบกับข้อมูลธุรกิจได้
- สร้าง/ตั้งค่า LINE OA เอง และอธิบาย Provider/Channel/identity ได้
- ทดลอง failure/recovery และอธิบายข้อจำกัดของ HA simulation ได้
- ทำ risk register และเสนอ release decision พร้อมหลักฐานด้าน security/privacy/governance

## 2. ขอบเขตและการแบ่งงาน

แบ่งการสร้างเนื้อหาเป็นสามชุดที่ใช้โปรเจกต์เดียวกัน:

1. Core handbook + local commerce/data labs: พื้นฐาน โค้ด Git Docker SQL automation tracking และ governance
2. LINE experience: OA setup เป็น core; Messaging API และ Login เป็น extension ตามเวลา
3. Reliability + capstone: app failover, backup/restore, tracking reconciliation และ release review; GA4 เป็น extension

แต่ละชุดต้องมี checkpoint ก่อนพึ่งพาชุดถัดไป ไม่สร้าง production platform, production database cluster หรือระบบรับชำระเงินจริง ไม่สอน penetration testing บนระบบที่ไม่ได้รับอนุญาต

## 3. สถาปัตยกรรม lab

```text
LINE app / browser
        |
  ngrok HTTPS (เฉพาะช่วง integration)
        |
  Nginx :8080
    |-- storefront → WordPress/WooCommerce → MariaDB commerce
    |-- /lab-api/* → Node.js/TypeScript integration service
    |-- /lab-events → tracking collector → lab database
    |-- /line/webhook → signature validation → event processing
    `-- /auth/line/* → Login callback (extension)
```

เริ่มจาก local storefront ก่อนเปิด tunnel ไม่ expose database, SQL admin UI หรือ service debug port สู่ internet; ปิด remote access ไปยัง WordPress admin/install routes ใน lab public mode และให้ setup/admin ผ่าน local-only endpoint

แยก commerce database กับ lab event store และใช้สิทธิ์อ่านอย่างจำกัดเมื่อตรวจ orders ไม่แก้ข้อมูลธุรกิจโดยตรงจาก collector ใช้ WooCommerce API หรือคำสั่งใน application ตามหน้าที่

อธิบาย 3-tier เป็น presentation/business/data ไม่เท่ากับจำนวน container: WordPress รวม presentation กับ business ใน deployment เดียวได้ และ Nginx เป็น proxy ไม่ใช่ business tier โดยตัวมันเอง

ชุด HA เพิ่ม WordPress app instance ที่สองและ load balancing ใช้ plugin/theme version เดียวและ shared uploads สำหรับการทดลอง แสดงให้เห็นว่า shared volume, database, proxy, host และ tunnel ยังเป็น single points of failure ห้ามเรียก lab บนเครื่องเดียวว่า production HA

## 4. ลำดับการเรียน 14 สัปดาห์

| สัปดาห์ | เนื้อหาและงานจริง | หลักฐาน/เกณฑ์ผ่าน |
|---|---|---|
| 1 | Terminal, filesystem, HTTP, JSON, DevTools, Git/GitHub, issue/PR | อธิบาย request/response และส่ง PR แรกโดยไม่ commit secret |
| 2 | JavaScript → TypeScript: variables, functions, arrays, objects, async/await, errors | สคริปต์อ่าน JSON ตรวจ field และมี automated tests ทั้ง valid/invalid |
| 3 | Git flow: main/develop/feature/release/hotfix; review, conflict, revert; เปรียบเทียบ trunk-based | ซ้อม release/hotfix และ conflict ใน sandbox repo พร้อม release evidence |
| 4 | Docker/Compose: image, container, network, volume, logs, health; 3-tier | เปิดร้านจาก clean setup สร้างสินค้าจำลอง และพิสูจน์ persistence หลัง restart |
| 5 | Data/SQL: keys, joins, NULL, aggregation, transactions, data dictionary | query reconciliation กับ fixture ที่ทราบคำตอบ และอธิบาย join ที่ทำยอดซ้ำ |
| 6 | API tests, test pyramid, fixtures, negative paths; UI Playwright | test cart/checkout จำลอง พร้อม assert ผลธุรกิจ ไม่ใช้ sleep เป็นหลัก |
| 7 | GitHub Actions, automation scheduling, artifacts, flaky tests; AI-assisted workflow | CI ผ่านและจับ seeded defect ได้; อธิบาย test ที่ AI ช่วยเขียนได้ |
| 8 | Tracking plan, schema, consent, collection pipeline, reconciliation | collector local และ validator จับ missing/duplicate/invalid event จาก fixture ได้ |
| 9 | สร้าง OA, profile, greeting, auto-response, human chat, rich menu, broadcast quota | OA จริงสำหรับทดลอง rich menu เข้าเว็บเดิมได้ พร้อม config checklist และ UTM evidence |
| 10 | OA → web journey, in-app/external browser, redirect, identity, Provider/Channel; API extension เริ่มเมื่อพร้อม | identity map และทดสอบเส้นทางเข้าเว็บ/checkout โดยแยก attribution กับ authentication |
| 11 | Tracking failure drills และ LINE API extension; Login extension หากเวลาเหลือ | missing/duplicate diagnosis; extension ตรวจ signature/retry/ownership และผลเมื่อ delivery ล้ม |
| 12 | app failover, database outage, restart, backup/restore, RTO/RPO | outage timeline, error rate และ reconciliation ก่อน/หลัง recovery |
| 13 | Security, PDPA/GDPR, Data/AI/Product Governance | threat model, data inventory, retention, access matrix และ risk register ที่มี owner |
| 14 | Capstone: integrated journey และ release review; GA4 extension | test suite, data-quality report, recovery evidence และ go/no-go พร้อม residual risks |

Privacy/security เป็น guardrail ตั้งแต่สัปดาห์แรก ไม่รอเรียนสัปดาห์ 13; Superpowers workflow เริ่มผ่าน mentor ตัวอย่างและลงลึกในสัปดาห์ 7

## 5. รูปแบบคู่มือและ deliverables ที่ต้องสร้างในขั้น implementation

ทุกบทมี prerequisites, คำศัพท์, mental model, ขั้นตอน/คำสั่ง, expected output, troubleshooting, reset/cleanup, exercise, assessment และ official references แต่ละคำสั่งต้องระบุ directory และเครื่องที่รัน ห้ามใช้คำว่า “ตั้งค่าตามปกติ” แทนขั้นตอน

โครงสร้างเป้าหมาย:

```text
README.md                   เส้นทางเริ่มต้นและ learning map
docs/handbook/               บทเรียนภาษาไทย
docs/mentor/                 facilitation, rubric, answer guidance
labs/commerce/              Compose, proxy, fixtures, reset/backup
labs/qe-code/               TypeScript/API/UI exercises
labs/tracking/              collector, schema, seeded failures
labs/line/                  OA checklist และ API/Login extensions
templates/                  test plan, tracking plan, risk register, ADR
.github/workflows/          CI หลังได้รับอนุมัติ implementation
```

แยก starter exercises กับเฉลย/mentor notes ไม่ปล่อย lab ให้ติดตั้ง extension/plugin เชิงพาณิชย์โดยไม่จำเป็น pin versions และทดสอบ image/platform compatibility ตอนสร้าง lab พร้อมระบุวันที่ตรวจ

## 6. Tracking/data-quality contract

ใช้ event ตัวอย่าง view_item, add_to_cart, begin_checkout, purchase และ integration events แยกต่างหาก ข้อมูลควรมี event_id, schema_version, occurred_at, received_at, source, consent_state และ correlation ID ตามความจำเป็น purchase ต้องมี transaction_id, value, currency และ items

กำหนด event semantics และ source of truth ก่อน coding: การกด checkout ไม่ใช่ purchase; lab กำหนด purchase เกิดเมื่อ order เข้าสถานะที่เลือกไว้ใน tracking plan สำหรับการชำระเงินจำลอง ไม่อ้างว่าเป็นการชำระเงินจริง

เก็บ monetary value แบบ decimal/minor units ตาม contract ไม่คำนวณยอดเงินจาก float โดยไม่มีวิธีจัดการ rounding ใช้ timezone ชัดเจนและกำหนด reconciliation window

การวัดต้องแยก eligible orders ตาม consent/นโยบายออกจาก orders ทั้งหมด พร้อมแสดง excluded count; ไม่ลักลอบใช้ server-side tracking เพื่อข้าม consent ห้ามรับประกันว่า browser tracking จะครบ 100%

Mandatory failure fixtures:

- missing purchase หลัง order สำเร็จ
- duplicate จาก refresh/retry/redelivery
- currency/value/items ไม่ตรง order
- schema ผิดหรือ schema version ไม่รองรับ
- UTM หายจาก redirect และ session เปลี่ยนข้าม browser
- consent denied/revoked ซึ่งต้องไม่ตีความเป็น defect ของ collection ที่ออกแบบให้ไม่เก็บ
- timeout, collector outage, delayed/out-of-order event
- notification fail แต่ order สำเร็จ และ app failover ระหว่าง checkout

รายงานแสดง expected/observed/duplicate/invalid/late/excluded โดยไม่ใช้ HTTP 200 เป็นหลักฐานว่า data ถึงรายงานปลายทางแล้ว

## 7. LINE learning experience และขอบเขต identity

### Core: OA ก่อน API

สร้าง Business ID และ OA ทดลอง ตั้ง profile, greeting, auto-response, rich menu, chat และทดลอง broadcast เฉพาะผู้ทดสอบที่ยินยอม บันทึกโควตาจาก console ไม่ hard-code แพ็กเกจในคู่มือ ทำ QR/link และ UTM จาก rich menu ไปเว็บเดิม

ให้เปรียบเทียบพฤติกรรมบนมือถือใน LINE in-app browser กับ external browser อย่างน้อยหนึ่งเครื่องจริง ไม่อ้างว่า Playwright desktop จำลอง LINE app ได้ครบ

### Core: Provider/Channel/IDs

ทำตารางแยก OA Basic ID, Provider ID, Channel ID, LINE user ID และ customer ID ของเว็บ เลือก Provider ก่อน enable API เพราะเปลี่ยน/ถอด Provider ของ OA ภายหลังไม่ได้ตามเอกสาร LINE และ user IDs อยู่ในขอบเขต Provider อย่า join identity ข้าม Provider โดยสมมติว่า ID เท่ากัน

### Extension A: Messaging API

เปิด Messaging API จาก OA Manager แล้วตั้งค่า channel ใน Developers Console ใช้ ngrok HTTPS → proxy → webhook ตรวจ signature จาก raw request body ก่อน parse/process และตรวจ empty-event verification payload ได้ จัดการ webhook redelivery อย่าง idempotent และไม่ทำให้ OA auto-response กับ bot ตอบซ้ำ

เริ่ม reply ก่อน push; หากส่ง order notification ต้องมี account linking/ownership proof ไม่ใช้ user ID หรือ order ID ที่ client ส่งมาเป็น authorization เก็บ token/secret ฝั่ง server พร้อม log redaction กรณี retry ต้องคำนึงถึงข้อจำกัด reply token และ API แยก order status ออกจาก notification status

### Extension B: LINE Login

สร้าง Login channel ใต้ Provider ที่เหมาะสม ตั้ง callback URL ให้ตรง ตรวจ state, token และเงื่อนไข OIDC/nonce ตาม flow ที่ใช้ ฝึก cancellation, expired credentials และ account mismatch; login ไม่แปลว่าได้เป็นเพื่อน OA หรือยินยอม tracking และห้ามใช้ email/display name เป็นหลักฐานผูกบัญชีโดยลำพัง

## 8. เครื่องมือ ค่าใช้จ่าย และทางเลือก

- Git, Node.js/TypeScript, Playwright, Nginx, MariaDB, WordPress/WooCommerce core และ DBeaver Community เป็นชุดหลัก ใช้ local checkout จำลอง
- Docker Desktop ต้องตรวจ license ขององค์กร; free route ใช้ Docker Engine/Compose บน Linux หรือ Linux VM ที่องค์กรอนุญาต ระบุ Windows/macOS/Linux setup แยกกันตอน implementation
- GitHub ใช้ free account; local test เป็น fallback ถ้า Actions quota/policy ไม่อนุญาต ไม่มี workflow ที่ต้องใช้ paid runner
- ngrok Free ใช้ assigned development domain และ HTTPS endpoint เข้า proxy เดียว มี quota และ HTML interstitial ต้องบันทึกผลกระทบต่อ browser journey ห้ามสมมติว่าจะใส่ custom header ให้ LINE in-app navigation ได้
- LINE OA ใช้ free plan ภายในโควตาปัจจุบัน ไม่ใช้ Premium ID/paid broadcast หรือ plugin เสียเงิน; automated CI ใช้ mock ไม่ส่งข้อความจริง
- Claude/Superpowers เป็นบทเครื่องมือที่ต้องมีสิทธิ์ใช้งานตามองค์กร ไม่รับประกัน Claude ฟรี; หากไม่มีสิทธิ์ให้ mentor demo และทำ workflow brainstorming → plan → test → review ด้วยมือ โดยไม่บล็อก core assessment
- GA4 optional ใช้ property ทดลอง ไม่มี BigQuery export เป็น dependency ของ core

รายการฟรีเป็นข้อกำหนดการออกแบบ ไม่ใช่คำรับรองค่าใช้จ่ายของทุกองค์กร ตรวจ terms/quota อีกครั้งเมื่อเปิด cohort

## 9. Governance และ safety

Data: owner, definition, lineage, quality checks, access, retention และ deletion; AI: approved data/tool, prompt injection จาก repo/เว็บ, skill/plugin provenance, human review และ reproducibility; Product: acceptance criteria, risk owner, change approval, ADR, release/rollback และ residual risk

PDPA/GDPR สอน data minimization, lawful basis, purpose, rights, processor/controller และ incident escalation โดยแยกข้อกำหนดของแต่ละกฎหมาย ไม่กล่าวว่า consent เป็นฐานเดียวเสมอ และไม่ถือว่า GDPR ใช้กับทุกระบบโดยอัตโนมัติ ให้ DPO/legal ทบทวนก่อนใช้กับ production ไม่มีบทนี้แทนคำปรึกษากฎหมาย

ใช้ข้อมูล synthetic เท่านั้น ไม่เก็บ access token/password/LINE UID/email ใน analytics, screenshots หรือ CI artifacts แบบไม่จำเป็น ตรวจ IDOR, least privilege, secrets, dependency risk และ webhook authenticity เฉพาะ sandbox ของตน

## 10. การประเมินและ verification ของ lab

Rubric: coding/automation 25%, tracking/data quality 30%, architecture/reliability 20%, privacy/security/governance 15%, communication/evidence 10% เกณฑ์ผ่านที่เสนอคือ 75/100 และผ่าน safety gate ทั้งหมด คะแนนรวมชดเชย secret leak หรือ unauthorized data access ไม่ได้

ทุก checkpoint ใช้ seeded defect อย่างน้อยหนึ่งกรณี ผู้เรียนต้องอธิบายสาเหตุและผลกระทบพร้อมหลักฐาน mentor ตรวจโค้ดที่ AI ช่วยสร้างด้วยคำถาม/การแก้โจทย์สั้น ๆ

ก่อนส่งมอบคู่มือจริงต้อง verify: clean setup ตามคู่มือ, Compose validation, service health, local checkout, SQL fixture answers, automated tests ทั้ง pass/fail ที่ตั้งใจ, CI artifacts ไม่มี secret, collector outage/retry, restart persistence, backup/restore และ app-instance failover รายงานช่องว่าง platform/account ที่ไม่ได้ทดลองจริง; ไม่ประกาศว่า lab ผ่านจาก config validation อย่างเดียว

RTO/RPO ของ lab เป็นเป้าหมายทดลองที่ mentor กำหนดก่อน drill ไม่ใช่ production SLA ต้องวัดเวลาจริงและจำนวน records ที่สูญหาย/ซ้ำ

## 11. References และการดูแลความถูกต้อง

วันที่ตรวจแหล่งหลักของ LINE/ngrok/Docker/Claude: 2026-10-09; แหล่งอื่นด้านล่างเป็น reading list ทางการที่ต้องเปิดตรวจรายละเอียดเมื่อเขียนบท ไม่ถือว่า implementation commands ผ่านการตรวจแล้ว

- Git: https://git-scm.com/book/en/v2
- GitHub: https://docs.github.com/en/get-started และ https://docs.github.com/en/actions
- Docker Compose: https://docs.docker.com/compose/
- Docker Desktop license: https://docs.docker.com/subscription-billing/desktop-license/
- TypeScript: https://www.typescriptlang.org/docs/handbook/
- Playwright: https://playwright.dev/docs/intro
- WooCommerce developer docs: https://developer.woocommerce.com/docs/
- MariaDB: https://mariadb.com/docs/
- LINE OA Learning Hub: https://lineforbusiness.com/th/learning-hub/OA-B-01
- LINE API setup/Provider restrictions: https://developers.line.biz/en/docs/messaging-api/getting-started/
- LINE account linking: https://developers.line.biz/en/docs/messaging-api/linking-accounts/
- LINE API pricing: https://developers.line.biz/en/docs/messaging-api/pricing/
- LINE Login: https://developers.line.biz/en/docs/line-login/
- ngrok free limits: https://ngrok.com/docs/pricing-limits/free-plan-limits/
- Claude Skills: https://support.claude.com/en/articles/12512180-use-skills-in-claude
- Superpowers plugin: https://claude.com/plugins/superpowers
- GA4 ecommerce: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
- OWASP testing: https://owasp.org/www-project-web-security-testing-guide/
- GDPR authoritative text: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- PDPA/ประกาศที่เกี่ยวข้อง: https://www.pdpc.or.th/ — ตรวจฉบับกฎหมาย/ประกาศกับ DPO ก่อนเผยแพร่บท ไม่ใช้บทสรุปจาก AI เป็นแหล่งกฎหมาย

## 12. ขอบเขตการอนุมัติรอบนี้

ไฟล์นี้เป็น design ไม่ใช่คู่มือสำเร็จหรือ runnable lab ยังไม่ได้สร้าง repo, install dependencies, เปิด OA, ผูก Provider, เปิด tunnel หรือรันระบบจริง ผู้ใช้ต้องรีวิว spec ก่อนจัดทำ implementation plan แล้วเลือกวิธีดำเนินงาน ไม่มีการ commit หรือสร้าง branch โดยไม่ได้รับคำขอ
