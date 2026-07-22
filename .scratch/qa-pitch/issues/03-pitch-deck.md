# QA-03: Pitch deck + demo script

Status: ready-for-human
Owner: A
Sprint: 3
Priority: M
Refs: docs/10 (แนวเดินเรื่อง + mapping เกณฑ์ 9 ข้อ)

## งาน

- [ ] Deck เดินเรื่อง: ปัญหา → ปาล์ม → demo สด → safety/privacy → สิ่งที่เรียนรู้จาก dogfooding → limitations/future
- [ ] Demo script ละเอียดรายคลิก ใช้ demo account (seed) — ระบุใครพูดท่อนไหน
- [ ] Screenshot สำรองทุกจอสำคัญ กัน Gemini/เน็ตล่มวันจริง (ADR-0003)
- [ ] เช็คว่า deck ตอบเกณฑ์ครบ 9 ข้อตามตาราง mapping ใน docs/10
- [ ] ซ้อม 2 รอบวันที่ 29 ก.ค. จับเวลา

## Acceptance criteria

- ซ้อมจบในเวลาที่กำหนด (เผื่อถาม-ตอบ)
- มี plan B ทุกจุดที่พึ่งเน็ต/AI
- **ซ้อมเต็มรูปแบบได้โดยไม่กินโควตา AI ของวันจริง** (ดู checklist ด้านล่าง)

## Comments

2026-07-14 (A): 🚨 **checklist บังคับก่อน demo — โควตา Gemini ฟรีมีแค่ 20 ครั้ง/วัน ทั้งแอป** · แชท 1 ข้อความ = 1 ครั้ง (ดู INFRA-07 + ADR-0003)

---

2026-07-20 (A): ✅ deck outline + demo script ร่างเสร็จ → [`docs/pitch/`](../../../docs/pitch/) · ⚠️ โควตาเป็น **500/วัน** แล้วหลัง INFRA-23 → **อย่าดู checklist ข้างบนแล้ว** เก็บไว้เป็นประวัติเฉย ๆ แต่ยังต้องมี plan B เรื่องเน็ตล่ม

📍 ขั้นตอนเช้าวัน pitch อยู่ที่เดียวใน [`docs/pitch/demo-script.md`](../../../docs/pitch/demo-script.md) — รวม `npm run refresh:demo-week` (ข้อมูล demo ผูก `today()` จึงเก่าเองทุกวัน)

**เหลือทำ:** ทำสไลด์จริงใน Canva ตาม outline → export `deck.pdf` · เก็บ screenshot สำรอง · เติมชื่อคนพูด · ซ้อม 2 รอบ 29 ก.ค.
