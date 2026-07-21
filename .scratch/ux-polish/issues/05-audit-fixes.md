# UX-05 — เก็บงานจาก UX audit รอบ 21 ก.ค. (R1/R3/R4/R5 + ป้ายพลังงาน)

Status: done
Owner: A (ได้รับมอบหมายจากคีนให้แตะโซน dashboard/goals ได้ — แจ้งแพรรี่/ไม้ใน PR)
Refs: src/components/goals/current-goal-card.tsx, src/components/dashboard/pattern-table.tsx, src/app/(app)/goals/page.tsx, docs/11-limitations-future.md

จาก audit 6 มิติ (เดินแอปจริง 6 หน้าจอ + เช็คโค้ดทุกข้อ) เหลืองานที่ตกลงทำ:

## R1 — ถอดตัวหาร `x/7` บนการ์ดเป้าหมายใน dashboard

`current-goal-card.tsx:41` โชว์ `{progressDates.length}/{week.length}` — ขัด 2 ชั้น:

1. ขัดกฎ UX-02 (ห้ามคะแนน/ตัวหารที่สื่อว่า "ยังไม่ครบ") ที่หน้าอื่นทำตามหมดแล้ว —
   หน้า `/goals` เองเขียน "ทำได้แล้ว 1 วันในสัปดาห์นี้" ไม่มีตัวหาร → สองหน้าขัดกันเอง
2. ตัวหาร 7 ไม่ใช่เป้าจริงด้วยซ้ำ — เป้าตัวอย่างคือ "เตรียมมื้อเช้าจันทร์กับพุธ" = 2 วัน
   ทำครบเป้าก็ยังขึ้น 2/7 เหมือนสอบตก · ขัด brief §Feature 5 "ไม่ทำให้ผู้ใช้รู้สึกล้มเหลวง่าย"

## R3 — dashboard มือถือยาว ~6 จอ เพราะการ์ด pattern 5 ใบ

วัดจาก screenshot จริง: 9762px @2x ≈ 4,880 CSS px · การ์ด pattern กินราวครึ่ง
→ มือถือโชว์ 3 ใบแรก + `<details>` เปิดดูที่เหลือ (native ไม่ต้องมี JS ยังเป็น Server
Component ได้ · summary ต้อง min-h-11 + focus ring เพราะ e2e วัด touch target จริง)
→ เดสก์ท็อปตารางเดิม 5 แถว — พื้นที่ไม่ใช่ปัญหา
→ ข้อความ "พบ 5 รูปแบบ" ยังจริง เพราะทั้ง 5 ยังอยู่ในหน้า แค่ 2 ใบหลังพับไว้

## R4 — /reflection เข้าถึงได้ทางเดียวจากการ์ดกลาง dashboard

ฟีเจอร์ที่กินเกณฑ์ Reflection & Improvement (5%) discover ยากสุดในแอป
→ เพิ่มลิงก์ "ดูสรุปสัปดาห์" ท้ายหน้า /goals (หน้านั้นจบห้วน มีพื้นที่ว่าง)
ตาม pattern เดียวกับลิงก์ "ดูบันทึกย้อนหลัง" ท้ายหน้า /checkin

## ป้ายพลังงาน — น้ำหนักตาไม่เท่ากัน

`ENERGY_BADGE` ใน history + today-summary: สูง=solid เขียว · ต่ำ=outline จาง
→ น้ำหนักตาชวนอ่านว่า สูง=รางวัล ซึ่งเฉียดการตัดสินพฤติกรรม (§8)
→ ทุกระดับใช้ `secondary` เท่ากัน ข้อความเป็นตัวแยก · "ยังไม่ได้บันทึก" คง outline
(เป็นสถานะ ไม่ใช่ระดับ)

## R5 — Limitations doc ขาด 2 ข้อที่ audit เจอ

`docs/11-limitations-future.md` §11.4: ยังไม่มี offline handling · ยังไม่เคยทดสอบ
Dynamic Type — เปลี่ยนช่องว่างเป็นข้อจำกัดที่ประกาศ (deliverable #14 ตามฟอร์แมตเอกสาร:
ข้อจำกัด + ทำแล้ว + ถ้าไปต่อ)

## Definition of done

- [x] ไม่มีตัวหารบนการ์ดเป้าหมาย dashboard · คำตรงกับหน้า /goals
- [x] มือถือเห็น pattern 3 ใบ + เปิดดูครบ 5 ได้ · เดสก์ท็อปเหมือนเดิม
- [x] /goals มีทางไป /reflection
- [x] ป้ายพลังงานทุกระดับน้ำหนักเท่ากัน
- [x] ด่าน CI ครบ 5 + `npm run e2e`

## Comments

### 21 ก.ค. 2026 — A

ทำครบ 5 ข้อ ยืนยันทุกข้อด้วย probe ในเบราว์เซอร์จริง (prod build + บัญชีปาล์ม):

| ข้อ | ผลวัดจริง |
| --- | --- |
| R1 | `getByText(/\d+\/7/)` = 0 จุดบน dashboard · การ์ดเขียน "ทำได้ X วัน" ตรงกับหน้า /goals |
| R3 | dashboard มือถือ 4881 → **4091px (−16%)** · ปุ่มพับสูง 44px พอดีเกณฑ์ · การ์ดมองเห็น 3 → กด → 5 |
| R4 | ลิงก์ "ดูสรุปสัปดาห์" กดจาก /goals แล้วถึง /reflection จริง |
| Badge | สีพื้นป้ายพลังงานใน history เหลือ 1 สี (เดิม 3 น้ำหนักต่างกัน) |
| R5 | เพิ่ม offline + Dynamic Type ลง §11.4 ตามฟอร์แมต ข้อจำกัด/ทำแล้ว/ถ้าไปต่อ |

หมายเหตุเชิงเทคนิค:

- `<details>` เป็น native element → PatternTable ยังเป็น Server Component เหมือนเดิม
  ไม่เพิ่ม client JS แม้แต่ไบต์เดียว · keyboard ใช้ได้ในตัว · summary มี focus ring 3px ตามระบบ
- ลบ `weekDates()` ที่ไม่ถูกใช้แล้วออกจาก current-goal-card ด้วย (เหลือแค่ import ที่ใช้จริง)
- แตะโซน dashboard (แพรรี่) + goals (ไม้) ตามที่คีนอนุมัติ — ต้องชี้ให้สองคนดูใน PR

ด่าน: format ✓ · lint ✓ (warning เดิม 1) · tsc ✓ · unit 135 ✓ · build ✓ · **e2e 61 ผ่าน 0 พัง**
