# INFRA-24: goal ของ demo account เน่าเมื่อข้ามสัปดาห์

Status: done
Owner: A
Sprint: 3
Priority: M — กระทบ demo วัน pitch โดยตรง (Prototype Quality)
Refs: scripts/seed.ts, src/components/goals/current-goal-card.tsx, src/lib/goals/week.ts

## อาการ

Dashboard ของปาล์มขึ้นการ์ด "เป้าหมายสัปดาห์นี้" เป็น empty state **"ยังไม่ได้ตั้งเป้าหมายสัปดาห์นี้"** เมื่อวันปัจจุบันข้ามไปสัปดาห์ ISO ใหม่หลังรัน seed

จับได้จาก e2e (`routes.spec.ts:164`) พังวันที่ 20 ก.ค. (จันทร์ = สัปดาห์ใหม่) ทั้งที่ 19 ก.ค. ยังเขียว

## Root cause

- `seed.ts` insert goal ด้วย `week_start: weekStart()` = สัปดาห์ที่รัน seed (ค่าคงที่)
- `getActiveGoals()` ดึงเฉพาะ goal ของสัปดาห์ปัจจุบัน (`weekStart()` ตอน query)
- พอข้ามสัปดาห์ → goal เดิม inactive → การ์ดขึ้น empty state

## ผลกระทบ

1. **Demo วัน pitch** — ถ้าไม่ re-seed ในสัปดาห์เดียวกับ pitch dashboard โชว์ "ยังไม่ได้ตั้งเป้าหมาย" กลางเวที (เสีย Prototype Quality)
2. e2e เปราะ — เคยพังเพราะ locator กำกวมด้วย (แก้แล้วใน QA-05: ใส่ `{ exact: true }`)

## ทางแก้ (ทำครบแล้ว)

1. **e2e locator** — ใส่ `{ exact: true }` ที่ `routes.spec.ts:169` (QA-05) → กัน strict-mode violation ไม่ว่าจะมี goal หรือไม่ · ทนความแปรปรวนของข้อมูล production ที่ mutable
2. **`npm run refresh:demo-week`** ([scripts/refresh-demo-week.ts](../../../scripts/refresh-demo-week.ts)) — เติม goal ของสัปดาห์ปัจจุบันให้ปาล์มถ้ายังไม่มี · idempotent (มี active goal อยู่แล้ว = ไม่ทำอะไร) · **แตะเฉพาะตาราง goals** ไม่ล้าง check-in/ai_outputs/chat ที่ warm cache ไว้ (ต่างจาก `npm run seed`)
3. **checklist ก่อน pitch** ใน docs/pitch/README ชี้ไป script นี้

## เจอเพิ่มตอนทดสอบ (20 ก.ค.)

ปาล์มมี **stray goal** "วางมือถือก่อนนอน 15 นาที" active สัปดาห์นี้ — ไม่ใช่ seed goal (เตรียมมื้อเช้า) · มาจากคน dogfood guided-flow บนบัญชีปาล์ม ผิดกติกาใน BOARD "อย่าเทสบนปาล์ม" · **การเลือกว่า goal ไหนควรโชว์วัน demo = งาน QA-03** (refresh-demo-week ตั้งใจไม่ทำลายของเดิม จึงไม่ลบ stray ให้อัตโนมัติ)

## หมายเหตุ

ข้อมูล check-in ของปาล์มไม่เน่าแบบนี้ (ผูกกับ "กี่วันก่อน" ไม่ใช่ absolute week) — เฉพาะ goal ที่ผูก week_start
