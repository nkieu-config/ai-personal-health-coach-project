# F1-02: Check-in API — upsert รายวัน

Status: ready-for-human
Owner: A
Sprint: 1
Priority: M — เส้นตาย 12 ก.ค.
Refs: FR-1.1, docs/05 (unique user_id + checkin_date)
Blocked by: 01

## งาน

- [ ] Server action/route บันทึก check-in — upsert ด้วย unique (user_id, checkin_date)
- [ ] Validation ฝั่ง server ตาม check constraints ใน docs/05
- [ ] วันนี้บันทึกแล้ว → เปิดหน้า check-in เห็นค่าเดิม แก้ได้ (ไม่สร้างซ้ำ)

## Acceptance criteria

- กดบันทึกซ้ำหลายครั้งในวันเดียว → มีแถวเดียวใน DB
- ค่านอกช่วง (เช่น sleep_quality 9) ถูก reject

## Comments
