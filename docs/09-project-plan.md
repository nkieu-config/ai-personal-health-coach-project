# 09 — Project Plan (6–30 ก.ค. 2026)

## ทีมและการแบ่งงาน

ทุกคน fullstack — แบ่งตาม feature แต่ละคนรับผิดชอบ feature ของตัวเองจบทั้ง UI+API ตาม requirement ใน docs/04

| คน | Role | Features ที่รับผิดชอบ |
|---|---|---|
| **A (PM & SA)** | แผนงาน เอกสาร pitch deck | F1 Check-in (FR-1.x) + Onboarding/Disclaimer (FR-0.2, FR-0.3) |
| **B** | Frontend lead | F2 Dashboard (FR-2.x) + F6 Weekly Reflection UI (FR-6.x) |
| **C** | AI lead | `lib/ai` + `lib/patterns`, F3 Pattern Analysis, F4 Coach, F5 Micro Goal (FR-3.x–5.x) + AI safety checklist |
| **D** | Infra & QA lead | Repo/CI/Vercel/Supabase setup, Auth (FR-0.1), Privacy page (FR-7.x), seed script, QA ทุก feature |

กติกาการทำงาน: feature branch + PR, review ขั้นต่ำ 1 คน, merge เข้า `main` = deploy อัตโนมัติ, standup สั้นทุกวัน (ออนไลน์ได้), ทุก issue เขียนไว้ที่ `.scratch/` ตามระบบใน [agents/issue-tracker.md](agents/issue-tracker.md)

## Sprint Plan

### Sprint 0: Foundation (จ. 6 – พ. 8 ก.ค.)

| งาน | เจ้าของ |
|---|---|
| อ่านเอกสารชุดนี้ทั้งหมด + ตกลง scope ร่วมกัน | ทุกคน |
| ตั้ง GitHub repo, Next.js + Tailwind + shadcn, Vercel, Supabase project + schema จาก docs/05 + RLS | D |
| Wireframe หน้าหลัก 5 หน้า (check-in, dashboard, coach, goals, reflection) | A + B |
| ทดลองยิง Gemini free tier + ร่าง system prompt ใช้ได้จริง | C |
| แตก requirement เป็น issues ใน `.scratch/` | A |

**เช็คพอยต์ 8 ก.ค.:** repo รันได้ login ได้ schema ครบ — ถ้าไม่ทันให้แจ้งทันที ไม่ลากยาว

### Sprint 1: Check-in + โครง (พฤ. 9 – พ. 15 ก.ค.)

| งาน | เจ้าของ |
|---|---|
| Onboarding + disclaimer + โปรไฟล์ | A |
| Check-in form ครบ + แก้ย้อนหลัง | A |
| Layout หลัก + dashboard เวอร์ชันแรก (กราฟ 3 pillars) | B |
| `lib/patterns` คำนวณ candidates ครบ 4 ตัว + unit test | C |
| Auth flow, privacy page, ปุ่มลบข้อมูล | D |

**เช็คพอยต์ ศ. 12 ก.ค.: check-in ใช้งานจริงบน production ได้** → **เริ่ม dogfooding จ. 13 ก.ค. ทั้งทีม** (ADR-0004) — นี่คือ deadline ที่เข้มที่สุดของแผน

### Sprint 2: AI ทั้งหมด (พฤ. 16 – พ. 22 ก.ค.)

| งาน | เจ้าของ |
|---|---|
| Pattern analysis จบเส้น: patterns → Gemini → ตารางบน dashboard + cache | C |
| Coach chat + guided flow ตั้งเป้า + escalation (FR-4.4) | C |
| Micro goal: เสนอ/รับ/ติ๊กรายวัน + validation คำต้องห้าม | C (UI ช่วยโดย B) |
| Dashboard เต็มรูป: overlay disruptor, ช่วง 7/14/30 วัน | B |
| Seed script สร้างข้อมูลปาล์ม 4 สัปดาห์ฝัง pattern 3 เรื่อง | D |
| รวบรวม feedback dogfooding รอบแรก ปรับ check-in ให้เบาลง | A |

**เช็คพอยต์ พ. 22 ก.ค.:** workflow หลักครบทุกเส้นบน production (ยังไม่ polish)

### Sprint 3: Reflection + Polish + Pitch (พฤ. 23 – อ. 28 ก.ค.)

| งาน | เจ้าของ |
|---|---|
| Weekly reflection จบเส้น + หน้าย้อนหลัง | C + B |
| Polish UI ทุกหน้า, empty states, loading states, responsive | B |
| AI safety checklist 10 ข้อ (docs/07) — รันและบันทึกผล | C + D |
| QA เต็มรอบตาม demo script + แก้บั๊ก | D + ทุกคน |
| Pitch deck + demo script (เดินเรื่องด้วย persona ปาล์ม) + เตรียม screenshot สำรอง | A |
| เขียน limitations & future improvements (deliverable 14) | A |

### Freeze & Pitch

- **พ. 29 ก.ค.:** Code freeze เที่ยง → ซ้อม pitch 2 รอบกับ demo account จริง จับเวลา แบ่งคนพูด
- **พฤ. 30 ก.ค.: Pitching Day**

## Risk Register

| ความเสี่ยง | โอกาส | ผลกระทบ | แผนรับมือ |
|---|---|---|---|
| Gemini rate limit/ล่ม ตอน demo | กลาง | สูง | Cache ใน ai_outputs, ซ้อมด้วย cache, screenshot สำรอง, สลับ Typhoon ได้ (ADR-0003) |
| Check-in ไม่เสร็จ 12 ก.ค. → dogfooding เลื่อน → ข้อมูลจริงไม่พอ | กลาง | กลาง | Scope check-in ให้เล็กสุดก่อน (ฟอร์มเดียว บันทึกได้) ฟีเจอร์แก้ย้อนหลังตามมาทีหลัง; seed data คือ safety net ของ demo อยู่แล้ว |
| ทีมมีสอบ/ภาระอื่นกลางทาง | สูง | กลาง | แผนกำหนดเจ้าของสำรองผ่าน PR review + เช็คพอยต์ทุกสัปดาห์รู้ตัวเร็ว งาน M น้อยกว่า capacity ~70% |
| AI output หลุด guardrail ตอน demo | ต่ำ | สูง | Safety checklist 10 ข้อก่อน freeze + demo script ใช้คำถามที่ซ้อมแล้ว |
| Scope creep (อยากเพิ่มฟีเจอร์) | สูง | กลาง | ทุกไอเดียใหม่เข้า `.scratch/` เป็น future ก่อน — PM ตัดสินใจโดยยึด M/S/C ใน docs/04 |

## Definition of Done (ต่อ feature)

1. ตรง requirement (FR ระดับ M ครบ)
2. ผ่าน PR review 1 คน
3. ใช้งานได้บน production (Vercel) ไม่ใช่แค่ localhost
4. AI output (ถ้ามี) ผ่าน guardrail — ไม่มีคำต้องห้าม ภาษาไม่ตัดสิน
5. Responsive มือถือ + desktop
