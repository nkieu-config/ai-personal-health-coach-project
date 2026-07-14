# F2-02: กราฟ 3 pillars + energy

Status: ready-for-human
Owner: 🟦 กราฟ
Sprint: 1
Priority: M
Refs: FR-2.1, docs/05
Blocked by: 01

## งาน

- [ ] นอน: กราฟแท่งชั่วโมงนอนรายวัน + เส้นอ้างอิง 6 ชม. (จุดสังเกต ไม่ใช่เกณฑ์ตัดสิน)
- [ ] กิน: มื้อที่กิน/ข้ามรายวัน + จำนวนเครื่องดื่มหวาน
- [ ] เคลื่อนไหว: นาทีเคลื่อนไหวรายวัน แยกสีตามชนิด
- [ ] Energy: แถบ low/medium/high รายวัน วางให้เทียบสายตากับกราฟอื่นได้
- [ ] วันที่ไม่มีบันทึกแสดงเป็นช่องว่าง ไม่ใช่ศูนย์ (กันกราฟโกหก)

## Acceptance criteria

- ดูกราฟนอน + energy คู่กันแล้ว "เห็น" ความสัมพันธ์ได้ด้วยตาจาก seed data
- ไม่มีการให้คะแนน/เกรดสุขภาพที่ไหนเลย

## Comments

---

2026-07-14 (kickoff → สาย 🟦 กราฟ): **เริ่มได้เดี๋ยวนี้ ไม่ต้องรอใคร**

**โซนของคุณ (ไม่มีใครแตะ):** `src/components/dashboard/` · `src/app/(app)/dashboard/page.tsx`

**⚠️ อ่านก่อนเขียนโค้ดกราฟบรรทัดแรก** — โปรเจกต์มี skill ชื่อ `dataviz` ที่บอกกฎการทำกราฟไว้ครบ (สี, dark mode, วันขาดข้อมูล) **ขอให้ A รันให้ก่อน** จะได้ไม่ต้องรื้อทำใหม่

**ดึงข้อมูล — มีให้แล้ว ไม่ต้องแตะ Supabase เลย:**

```tsx
import { getCheckins } from "@/lib/checkins/queries";
import { MOVEMENT_TYPE_LABELS, DISRUPTOR_LABELS } from "@/lib/checkins/labels";

const checkins = await getCheckins(days);   // Checkin[] เรียงจากเก่าไปใหม่
```

**หน้า dashboard เป็น Server Component แล้ว** — รับ `?days=` จาก URL ให้เรียบร้อย ส่ง `Checkin[]` ลงมาให้เลย
คุณเขียนแค่ component กราฟที่รับ `checkins` เข้าไปวาด

**กฎที่ห้ามพลาด (มีในโจทย์):**

- **วันที่ไม่มีบันทึกต้องเป็นช่องว่าง ไม่ใช่ 0** — ไม่งั้นกราฟโกหก (วันที่ลืมกรอกจะดูเหมือนวันที่นอน 0 ชม.)
- **สีใช้ `--chart-1` ถึง `--chart-5` เท่านั้น** (นอน=1, กิน=2, เคลื่อนไหว=3) — ผูกกับ dark mode ให้แล้ว **ห้าม hardcode สี**
- **ห้ามให้คะแนน/เกรดสุขภาพที่ไหนเลย**
- ชื่อไทยของค่าต่าง ๆ ใช้จาก `labels.ts` **อย่าพิมพ์เอง**

**ความกว้างที่ต้องรองรับ 2 ขนาด:** มือถือ ~400px · เดสก์ท็อป ~640px (dashboard เป็น grid บนจอใหญ่แล้ว)

**งานถัดไปในสายคุณ:** F2-02 → F2-03 (disruptor overlay) → **F2-04 (ตาราง pattern)**

**F2-04 พร้อมให้ทำแล้ว** — ข้อมูลมีครบ:

```tsx
import { getLatestInsight } from "@/lib/ai-outputs/queries";
import { generateInsight } from "@/lib/ai-outputs/actions";
import { formatMetric } from "@/lib/ai-outputs/format";

const insight = await getLatestInsight(days);   // อ่าน cache เร็ว ไม่เรียก AI
// ถ้า null → โชว์ปุ่ม "วิเคราะห์" → กดแล้วเรียก generateInsight(days) (~10 วิ มี loading)
```

`insight.patterns[]` แต่ละตัวมี:

| ฟิลด์ | ใช้ทำอะไร |
| --- | --- |
| `pillars` | คอลัมน์ "ด้าน" |
| `observation` | คอลัมน์ "Pattern ที่พบ" |
| `meaning` | คอลัมน์ "ความหมาย" |
| `nextStep` | คอลัมน์ "Next Step" |
| `evidence.groupA / groupB` | **โชว์หลักฐาน** — `{label, days, value}` เช่น "นอนน้อยกว่า 6 ชม. (5 วัน)" |

**`evidence` สำคัญมาก** — โชว์ให้ผู้ใช้เห็นว่าตัวเลขมาจากไหน (`formatMetric(metric, value)` แปลงเป็นข้อความให้แล้ว) นี่คือสิ่งที่พิสูจน์ว่า AI ไม่ได้มโน
