# INFRA-06: Seed script — demo account "ปาล์ม"

Status: ready-for-human
Owner: A
Sprint: 2
Priority: M
Refs: ADR-0004, docs/03, docs/05
Blocked by: 02

## งาน

- [ ] `scripts/seed.ts` สร้าง demo account + check-in ย้อนหลัง 4 สัปดาห์
- [ ] ฝัง pattern 3 เรื่องให้ชัด: นอนดึกคืนก่อน deadline, ข้ามมื้อเช้าวันเรียนเช้า (จันทร์/พุธ), เดินน้อยวันเรียน online
- [ ] ข้อมูลต้องสมจริง: มีวันขาดบันทึก ~2 วัน/สัปดาห์, มี note ภาษาไทยแบบปาล์มพิมพ์เอง
- [ ] รันซ้ำได้ (ลบของเก่าก่อน insert)

## Acceptance criteria

- รัน seed แล้วเปิด dashboard เห็น pattern ทั้ง 3 เรื่องใน pattern table
- Weekly reflection generate ได้อย่างน้อย 2 สัปดาห์

## Comments
