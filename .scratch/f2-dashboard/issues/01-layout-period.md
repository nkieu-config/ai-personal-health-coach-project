# F2-01: Dashboard layout + ตัวเลือกช่วง 7/14/30 วัน

Status: ready-for-human
Owner: B
Sprint: 1
Priority: M
Refs: FR-2.1, wireframe (INFRA-05)

## งาน

- [ ] โครงหน้า dashboard: การ์ดสรุปวันนี้, ส่วนกราฟ 3 pillars, ส่วน pattern table (placeholder ก่อน)
- [ ] Toggle ช่วงเวลา 7/14/30 วัน มีผลกับทุกส่วน
- [ ] Empty state เมื่อยังไม่มีข้อมูล → ชวนไป check-in
- [ ] ข้อความกำกับ safety ถาวรท้ายหน้า (ประสาน F0-03)

## Acceptance criteria

- Responsive ทั้งมือถือ/desktop
- ผู้ใช้ใหม่ไม่เจอหน้าว่างเปล่า — เจอคำชวนที่เป็นมิตร

## Comments

2026-07-12 (kickoff → B): **สาย Dashboard — ทำขนานได้เลย ไม่ต้องรอ F1 check-in ของ A**

**โซนไฟล์ของคุณ:** `src/app/dashboard/`, `src/components/charts/`
อย่าแตะโซนคนอื่น: `lib/patterns` + `lib/ai` = C · `app/settings` + `scripts/seed.ts` = D · `app/checkin` = A
**Branch:** `feat/f2-dashboard`

**ปลดล็อกตัวเองยังไง (ตาราง `checkins` ยังว่าง):**
เข้า Supabase → Table Editor → ตาราง `checkins` → **Insert row มือสัก 10–14 แถว** (ใส่ `user_id` ของตัวเอง, `checkin_date` ไล่ย้อนหลัง, สลับค่า `sleep_hours` / `energy_level` / `meals_count` ให้หลากหลาย) → มีข้อมูลปั้นกราฟได้ทันที — พอ D ทำ seed script (INFRA-06) เสร็จ (~15 ก.ค.) ค่อยสลับมาใช้ชุดนั้น

**ของที่มีให้แล้ว — อย่าเขียนใหม่:**

- **Auth guard:** ก๊อป pattern จาก `src/app/page.tsx` (getUser → `hasCompletedOnboarding` → redirect)
- **`src/components/safety-notice.tsx`** — task ข้อ 4 คือ **import ตัวนี้** ไม่ต้องเขียนข้อความเอง
- **`src/lib/supabase/server.ts`** — query ได้เลย **ไม่ต้องใส่ `.eq("user_id", ...)`** เพราะ RLS กรองให้อัตโนมัติ (verify แล้วใน INFRA-02)
- **type `Checkin`** มีแล้วที่ `src/lib/patterns/types.ts` — import มาใช้ อย่านิยามซ้ำ
- shadcn: Card / Button / Badge / Input / Label พร้อม

**ยังไม่มี chart library** — เลือกเองได้ (แนะนำ Recharts) `npm i recharts` แล้ว **แจ้งในกลุ่ม** ว่าเพิ่ม dependency

**Starter step:** ทำ `/dashboard` ให้เปิดได้ก่อน (guard + empty state + toggle 7/14/30) → เปิด PR เล็ก merge เลย → ค่อยต่อกราฟใน F2-02 เป็น PR ถัดไป

**ก่อนลงงานจริง:** เปิด PR จิ๋ว 1 อันลองระบบก่อน (ดูกติกาใน `.scratch/BOARD.md`) — ยังไม่มีใครในทีมเคย push เลย
