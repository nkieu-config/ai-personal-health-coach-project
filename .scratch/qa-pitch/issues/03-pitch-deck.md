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

2026-07-14 (A): 🚨 **checklist บังคับก่อน demo — โควตา Gemini ฟรีมีแค่ 20 ครั้ง/วัน ทั้งแอป**

ตัวเลขนี้วัดจริงตอนรัน F3-02 (ดู INFRA-07 + ADR-0003) · **แชท 1 ข้อความ = 1 ครั้ง** → ถ้าไม่วางแผน มีสิทธิ์หมดกลางเวที

---

2026-07-20 (A): **ของ 2 อย่างแรกเสร็จแล้ว + checklist ข้างบนตกยุค**

- ✅ **Deck outline + demo script ร่างเสร็จ** → [`docs/pitch/`](../../../docs/pitch/) · deck-outline มี speaker notes + tag เกณฑ์ที่แต่ละสไลด์ปิด · demo-script เดินรายคลิก + แบ่งคนพูด
- ⚠️ **โควตาไม่ใช่ 20/วันแล้ว — เป็น 500/วัน** หลัง INFRA-23 (ย้าย `gemini-3.1-flash-lite`) → ความเสี่ยง "หมดกลางเวที" ต่ำลงมาก แต่ยังต้องมี plan B เรื่องเน็ตล่ม
- 📍 **ขั้นตอนเช้าวัน pitch ย้ายไปอยู่ที่เดียวใน [`docs/pitch/demo-script.md`](../../../docs/pitch/demo-script.md)** — รวมคำสั่ง `npm run refresh:demo-week` ที่อุ่นทั้ง goal + insight/reflection ให้ตรงวัน (ของพวกนี้ผูก `today()` จึงเก่าเองทุกวัน) · **อย่าดู checklist ข้างบนแล้ว** เก็บไว้เป็นประวัติเฉย ๆ

**เหลือทำ:** ทำสไลด์จริงใน Canva ตาม outline → export `deck.pdf` · เก็บ screenshot สำรอง · เติมชื่อคนพูด · ซ้อม 2 รอบ 29 ก.ค.
