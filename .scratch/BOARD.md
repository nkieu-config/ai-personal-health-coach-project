# Board รวม — HealthCoach (อัปเดตล่าสุด: 6 ก.ค. 2026)

มุมมองรวมของ issues ทั้งหมดใน `.scratch/` เรียงตาม sprint — สถานะจริงอยู่ในไฟล์ issue แต่ละใบ (`Status:` line) ไฟล์นี้เป็นแค่ index สำหรับ PM ไล่ดูภาพรวม

## Sprint 0 (6–8 ก.ค.) — Foundation

| Issue | งาน | Owner |
|---|---|---|
| infra/01 | Repo + Next.js scaffold | D |
| infra/02 | Supabase schema + RLS | D |
| infra/03 | Vercel deploy | D |
| infra/04 | Gemini spike + lib/ai | C |
| infra/05 | Wireframes | A + B |

## Sprint 1 (9–15 ก.ค.) — Check-in + โครง ⚠️ check-in ต้องขึ้น production 12 ก.ค.

| Issue | งาน | Owner |
|---|---|---|
| f0/01 | Auth | D |
| f0/02 | Onboarding + โปรไฟล์ | A |
| f0/03 | Safety disclaimer 🔒 | A |
| f1/01 | Check-in form ⚠️ | A |
| f1/02 | Check-in API upsert ⚠️ | A |
| f1/03 | แก้ย้อนหลัง + backfill | A |
| f1/04 | สรุปหลังบันทึก | A |
| f2/01 | Dashboard layout | B |
| f2/02 | กราฟ 3 pillars | B |
| f3/01 | lib/patterns + tests | C |
| f3/02 | System prompt guardrail 🔒 | C |
| f7/01 | หน้า privacy 🔒 | D |
| f7/02 | ลบข้อมูล/บัญชี 🔒 | D |

## Sprint 2 (16–22 ก.ค.) — AI ทั้งหมด

| Issue | งาน | Owner |
|---|---|---|
| f3/03 | Insight endpoint + cache | C |
| f3/04 | เคสข้อมูลไม่พอ 🔒 | C |
| f4/01 | Chat UI + ประวัติ | C |
| f4/02 | Context assembly | C |
| f4/03 | Guided flow ตั้งเป้า | C |
| f4/04 | Escalation 🔒 | C |
| f4/05 | ลบประวัติแชท | C |
| f5/01 | Goal recommendation + validation 🔒 | C |
| f5/02 | Goals UI | B |
| f2/03 | Disruptor overlay | B |
| f2/04 | Pattern table | B |
| infra/06 | Seed script demo account | D |

## Sprint 3 (23–28 ก.ค.) — Reflection + Polish + Pitch

| Issue | งาน | Owner |
|---|---|---|
| f6/01 | Reflection generation | C |
| f6/02 | Reflection UI | B |
| f2/05 | Streak (ทำเมื่อว่างเท่านั้น) | B |
| qa/01 | AI safety checklist 10 ข้อ 🔒 | C + D |
| qa/02 | QA เต็มรอบ | D + ทุกคน |
| qa/03 | Pitch deck + demo script | A |
| qa/04 | Limitations & future doc | A |

## สัญลักษณ์

- ⚠️ = อยู่บนเส้นตาย dogfooding 12 ก.ค. — เลื่อนไม่ได้
- 🔒 = ห้ามตัดออกแม้เวลาไม่พอ (เกณฑ์ Safety/Privacy — ดูท้าย docs/04)

## สรุปโหลดต่อคน

| คน | Sprint 0 | Sprint 1 | Sprint 2 | Sprint 3 | รวม |
|---|---|---|---|---|---|
| A (PM) | 0.5 | 6 | 0 | 2 | 8.5 |
| B | 0.5 | 2 | 3 | 2.5 | 8 |
| C | 1 | 2 | 8 | 1.5 | 12.5 |
| D | 3 | 3 | 1 | 1.5 | 8.5 |

C โหลดหนักสุดใน Sprint 2 — ถ้า C ติดขัด งานที่โอนง่ายสุดคือ f4/01 (Chat UI) และ f4/05 ให้ B หรือ D ช่วย
