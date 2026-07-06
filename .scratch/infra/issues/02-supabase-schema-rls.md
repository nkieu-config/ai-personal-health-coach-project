# INFRA-02: Supabase project + schema + RLS

Status: ready-for-human
Owner: D
Sprint: 0
Priority: M
Refs: docs/05 (schema เต็ม), docs/08 Part 2

## งาน

- [ ] สร้าง Supabase project (free tier) + แชร์ access ให้ทีม
- [ ] รัน schema จาก docs/05: `profiles`, `checkins`, `goals`, `chat_messages`, `ai_outputs`
- [ ] เปิด RLS ทุกตาราง: select/insert/update/delete เฉพาะ `user_id = auth.uid()`
- [x] ตั้ง Supabase client ใน `lib/supabase` (server + browser)
- [ ] ทดสอบ RLS: user A ต้อง query ข้อมูล user B ไม่ได้

## Acceptance criteria

- ตารางครบ 5 ตาราง ตรง docs/05 ทุกฟิลด์
- มีหลักฐานทดสอบ RLS (บันทึกผลใน Comments)

## Comments

2026-07-06 (AI scaffold): SQL พร้อมรันอยู่ที่ `supabase/migrations/0001_init.sql` — ครบ 5 ตาราง + check constraints + indexes + trigger updated_at + RLS policy ทุกตาราง; clients อยู่ที่ `src/lib/supabase/` (client/server/admin)
เหลือ: สร้าง Supabase project จริง, รัน SQL ใน SQL Editor, เติมค่าใน `.env.local`, ทดสอบ RLS ด้วย user 2 คน
