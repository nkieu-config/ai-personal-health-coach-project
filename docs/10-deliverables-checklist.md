# 10 — Deliverables Checklist & Evaluation Mapping

## Expected Deliverables 14 รายการ (Mission ข้อ 10)

| # | Deliverable | อยู่ที่ไหน | เจ้าของ | สถานะ |
|---|---|---|---|---|
| 1 | Problem analysis | [02-problem-analysis.md](02-problem-analysis.md) | A | ✅ ร่างแรกเสร็จ |
| 2 | User persona | [03-user-persona.md](03-user-persona.md) | A | ✅ ร่างแรกเสร็จ |
| 3 | Health behavior data design | [05-data-design.md](05-data-design.md) | A + D | ✅ ร่างแรกเสร็จ |
| 4 | System workflow | [06-system-architecture.md](06-system-architecture.md) | A | ✅ ร่างแรกเสร็จ |
| 5 | Prototype / demo | Web app บน Vercel | ทุกคน | ⬜ Sprint 1–3 |
| 6 | ตัวอย่าง daily check-in | ในแอป + screenshot ใน pitch deck | A | ⬜ Sprint 1 |
| 7 | ตัวอย่าง dashboard | ในแอป (demo account) + screenshot | B | ⬜ Sprint 2 |
| 8 | ตัวอย่าง pattern analysis | ในแอป + ตัวอย่าง output ใน pitch deck | C | ⬜ Sprint 2 |
| 9 | ตัวอย่าง AI coaching conversation | ในแอป (guided flow) + transcript ตัวอย่าง | C | ⬜ Sprint 2 |
| 10 | ตัวอย่าง micro goal recommendation | ในแอป + ตัวอย่างใน pitch deck | C | ⬜ Sprint 2 |
| 11 | ตัวอย่าง weekly reflection | ในแอป + ตัวอย่างเต็ม 1 ฉบับ | C + B | ⬜ Sprint 3 |
| 12 | Safety guardrail | [08-safety-privacy.md](08-safety-privacy.md) Part 1 + ผลทดสอบ 10 ข้อ | C | ✅ design เสร็จ / ⬜ ผลทดสอบ Sprint 3 |
| 13 | Privacy design | [08-safety-privacy.md](08-safety-privacy.md) Part 2 + หน้า privacy ในแอป | D | ✅ design เสร็จ / ⬜ ในแอป Sprint 1 |
| 14 | Limitations & future improvement plan | เขียน Sprint 3 → `docs/11-limitations-future.md` | A | ⬜ Sprint 3 |

## Mapping กับ Evaluation Criteria 9 ข้อ (Mission ข้อ 11)

| เกณฑ์ | เราตอบด้วยอะไร | หลักฐานตอน pitch |
|---|---|---|
| Target User Fit | Persona ปาล์มลงลึกระดับตารางชีวิต + disruptor design | เดินเรื่อง demo ด้วย scenario ปาล์ม + เล่า dogfooding |
| Completeness | ครบ 3 pillars ทุก feature ตั้งแต่ data model ถึง reflection | โชว์ check-in/dashboard ครบ 3 ด้าน |
| Low Burden Design | Check-in ปุ่มล้วน ≤ 3 นาที ทดสอบจริงจาก dogfooding | จับเวลากรอกสดตอน demo |
| AI Usefulness | Pattern จากสถิติจริง + insight + next step | โชว์ตาราง pattern ของ demo account |
| Personalization | ทุกคำแนะนำผูก disruptor/ตาราง/ข้อจำกัดของผู้ใช้ | เทียบ goal ที่ระบบเสนอวันมี deadline vs วันปกติ |
| Safety | Guardrail 3 ชั้น + escalation 1323 + ผลทดสอบ 10 ข้อ | โชว์ตัวอย่าง AI ปฏิเสธคำถามวินิจฉัยโรคสด ๆ |
| Privacy | RLS, data minimization, ลบ/แก้ได้เอง | โชว์หน้า privacy + ปุ่มลบข้อมูล |
| Prototype Quality | Workflow หลักครบบน production จริง ผ่าน QA + freeze | Demo สดตาม script ที่ซ้อมแล้ว |
| Reflection and Improvement | Weekly reflection + goal ปรับต่อรายสัปดาห์ | โชว์ reflection 2 สัปดาห์ติดของ demo account |

## เอกสารที่ต้องสร้างเพิ่มระหว่างทาง

- `docs/11-limitations-future.md` — Sprint 3 (deliverable 14)
- `.scratch/ai-safety-test/` — ผลรันทดสอบ 10 ข้อจาก docs/07
- Pitch deck — Sprint 3 (แนะนำเดินเรื่อง: ปัญหา → ปาล์ม → demo สด → safety/privacy → ที่เรียนรู้จาก dogfooding → future)
