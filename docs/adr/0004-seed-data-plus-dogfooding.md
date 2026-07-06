# ADR-0004: Demo Data = Seed Data + Dogfooding

- **Status:** Accepted
- **Date:** 2026-07-06

## Context

Pattern analysis และ weekly reflection ต้องมีข้อมูลหลายสัปดาห์ถึงจะเห็น pattern จริง แต่เหลือเวลาแค่ 3.5 สัปดาห์ ถ้าพึ่งข้อมูลจริงอย่างเดียวเสี่ยง demo ไม่โผล่ pattern ถ้าใช้ seed อย่างเดียวจะไม่เจอปัญหา UX จริง

## Decision

ใช้สองทางคู่กัน:

1. **Seed data** — สคริปต์สร้างข้อมูล check-in ย้อนหลัง 4 สัปดาห์ของ **demo account** (persona "ปาล์ม") ฝัง pattern ไว้ชัดเจน 3 เรื่อง: นอนดึกคืนก่อน deadline, ข้ามมื้อเช้าวันเรียนเช้า, เดินน้อยวันเรียน online
2. **Dogfooding** — ทีม 4 คนใช้บัญชีตัวเองบันทึกจริงทุกวัน เริ่มเป้าหมาย **13 ก.ค. 2026** (ทันทีที่ check-in ใช้ได้)

ตอน pitch ใช้ demo account เป็นหลัก และเล่าประสบการณ์ dogfooding ประกอบ

## Consequences

- Demo ควบคุมได้ 100% — pattern โผล่แน่นอน ไม่พึ่งดวง
- ได้ feedback UX จริงจากการใช้เองก่อน pitch ~2.5 สัปดาห์ ตอบเกณฑ์ Low Burden Design ได้จากประสบการณ์จริง
- บังคับให้ check-in ต้องเสร็จเร็ว (12 ก.ค.) — เป็น forcing function ที่ดีของแผน
- ต้องแยก demo account ออกจากข้อมูลจริงของทีมให้ชัด และแจ้งใน pitch ว่าข้อมูล demo คือข้อมูลจำลอง
