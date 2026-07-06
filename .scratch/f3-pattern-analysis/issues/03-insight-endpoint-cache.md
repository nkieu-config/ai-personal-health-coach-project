# F3-03: Insight generation endpoint + cache

Status: ready-for-human
Owner: C
Sprint: 2
Priority: M
Refs: FR-3.2, FR-3.4, docs/06 workflow 2
Blocked by: 01, 02

## งาน

- [ ] Endpoint: ดึง checkins → `lib/patterns` → ส่ง candidates + โปรไฟล์ให้ Gemini → JSON `{patterns: [{pillars, observation, meaning, next_step}]}`
- [ ] Prompt บังคับ: เขียนแบบ "สัญญาณที่น่าติดตาม" ห้ามสรุปเหตุผล, next_step เล็กและผูกบริบท
- [ ] Validate JSON ตรง schema — ไม่ตรง retry 1 ครั้ง แล้ว fallback ข้อความธรรมดา
- [ ] Cache ลง `ai_outputs`, invalidate เมื่อมี check-in ใหม่

## Acceptance criteria

- Seed data ปาล์ม → ได้ pattern ตรงกับ 3 เรื่องที่ฝังไว้ (INFRA-06)
- เรียกซ้ำโดยไม่มีข้อมูลใหม่ → ตอบจาก cache ไม่ยิง Gemini

## Comments
