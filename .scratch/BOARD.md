# Board — HealthCoach (อัปเดต 15 ก.ค. 2026)

## Pitch 30 ก.ค. · Code freeze 29 ก.ค. · เหลือ 15 วัน

> 🎯 **หลักการจัดงาน: A สร้าง "เครื่องยนต์" · 3 สายสร้าง "หน้าจอ"**
> ทุกอย่างที่แตะ **Supabase / Gemini / service role / Safety 🔒** เป็นของ A
> **3 สายเรียกฟังก์ชันที่มีอยู่แล้ว → วาด UI → จบ** ไม่ต้องแตะ DB ไม่ต้องแตะ AI ไม่มีไฟล์ทับกัน

## สถานะ: เสร็จ 27 / 48 งาน (ยกเลิก 1)

- ✅ **Sprint 0** — repo · Supabase + RLS · Vercel · Gemini
- ✅ **F0** — สมัคร/ล็อกอิน (Google + รหัสผ่าน) · onboarding · disclaimer
- ✅ **F1** — เช็คอิน · บันทึก · แก้/ลบย้อนหลัง · สรุปหลังบันทึก · **F1-05 ปิดช่องโหว่โจทย์ข้อ 5**
- ✅ **F2-01** dashboard layout · **F3-01 / F3-05** lib/patterns (ตาราง Feature 2 ครบ 3 แถว) · **F7-01** หน้า privacy
- ✅ **Data layer ครบ** — `checkins` · `account` · `chat` · `ai-outputs` · `goals`
- ✅ **F3-02 guardrail 🔒** — รัน checklist 10 เคสจริง เจอรูรั่ว 4 จุด แก้หมด · หลักฐาน `.scratch/ai-safety-test/`
- ✅ **INFRA-07 โควตา** — cache-first + จำกัดแชท 5 ข้อความ/คน/วัน + ข้อความโควตาหมดเป็นมิตร
- ✅ **INFRA-06 seed "ปาล์ม"** — 24 วันบน production · pattern ครบ 3 แถว · **`palm@example.com / PalmDemo2026!`**
- ✅ **INFRA-08→15 ก่อนเปิดสาย (PR #22)** — DESIGN.md ขึ้นกฎแอปก่อน · loading/nav feedback · Suspense กันการ์ดบล็อก · แยกฟอร์มแทน boolean prop · RLS เร็วขึ้น + CHECK กันข้อมูลขยะ · type ปิดบั๊ก pattern เงียบ · กราฟไม่หายใน dark mode · **e2e เปิดทุกหน้าจริง + CI ตรวจ main + บังคับเป็น required check แล้ว**
- ⛔ **INFRA-05 wireframe — ยกเลิก** (DESIGN.md + UI จริงแทนไปแล้ว)

> 🔒 **CI ใหม่บังคับแล้ว** — ทุก PR ต้องผ่าน `verify` (format/lint/tsc/test/build) + `e2e (เปิดแอปจริง)` ก่อน merge · **PR ที่ทำ layout พังหรือ dashboard ขาวจะ merge ไม่ได้** (ก่อนหน้านี้ผ่านเขียวหมด)

---

## 👥 3 สาย — เดินขนานกัน มีจุดรอ A แค่จุดเดียว (F4-03)

| สาย | โซนไฟล์ (ไม่ทับกันเลย) | งานตามลำดับ |
| --- | --- | --- |
| 🟦 **กราฟ** | `components/dashboard/` · `app/(app)/dashboard/page.tsx` | **F2-02 กราฟ** → F2-03 overlay → F2-04 ตาราง → F2-05 streak *(ตัดได้)* |
| 🟩 **โค้ช** | `app/(app)/coach/` · `components/coach/` | **F4-01 Chat UI** → F4-05 ลบประวัติ → ⛔ F4-03 guided flow *(รอ A)* |
| 🟨 **สิทธิ์+เป้าหมาย** | `app/(app)/settings/` `goals/` `reflection/` · `components/goals/` `components/reflection/` | **F7-02 ลบข้อมูล** → F5-02 goals → F6-02 reflection |

**ตัวแรกของทุกสายเริ่มได้เดี๋ยวนี้** (F2-02 · F4-01 · F7-02) — ตัวที่เหลือต่อคิวในสายตัวเอง · **ยกเว้น F4-03 อย่าเพิ่งแตะ** (ดูจุดรอด้านล่าง) · kickoff อยู่ในคอมเม้นของแต่ละ issue

### 🔧 คิวงาน A

~~F3-02~~ ✅ ~~INFRA-07~~ ✅ ~~F3-05~~ ✅ ~~INFRA-06~~ ✅ ~~INFRA-08→15~~ ✅ → **F3-03 insight** → F3-04 🔒 → **F4-02 → F5-01** → F4-04 🔒 → F6-01 → QA-01 🔒 · QA-03 pitch · QA-04

> **F4-02 + F5-01 ดันมาคู่กันโดยตั้งใจ** — สองตัวนี้คือประตูปลดล็อก F4-03 ของสาย 🟩 (flow ที่โจทย์บังคับ + เป็น demo หลัก) · ต้องเสร็จก่อน 🟩 ทำ F4-05 จบ ไม่งั้นเขาจะมาจอดรอ
> **AI ที่เหลืออัปเกรดอยู่ "ข้างหลัง" ฟังก์ชันเดิม** — signature ไม่เปลี่ยน 3 สายไม่ต้องแก้โค้ด (F4-03 เป็นข้อยกเว้น: มันเรียกของใหม่ เลยเริ่มไม่ได้จนกว่า A เสร็จ)

---

## 📞 ฟังก์ชันที่แต่ละสายเรียกใช้ (ไม่ต้องแตะ Supabase/Gemini เลย)

```tsx
// 🟦 กราฟ
getCheckins(days)                      // @/lib/checkins/queries
getLatestInsight(days)                 // @/lib/ai-outputs/queries   ← อ่าน cache เร็ว
generateInsight(days)                  // @/lib/ai-outputs/actions   ← กดปุ่ม ~10 วิ
formatMetric(metric, value)            // @/lib/ai-outputs/format

// 🟩 โค้ช
getChatHistory() · needsReply(history) // @/lib/chat/queries
messagesLeftToday()                    // @/lib/chat/queries   ← 0 = โชว์ QuotaReachedNotice
sendCoachMessage(text)                 // @/lib/chat/actions
retryCoachReply()                      // ⚠️ ปุ่ม "ลองใหม่" ต้องเรียกตัวนี้ ไม่ใช่ send ซ้ำ
clearChatHistory()                     // = F4-05 เกือบเสร็จเลย

// 🟨 สิทธิ์+เป้าหมาย
deleteAllData() · deleteAccount()      // @/lib/account/actions
getGoals() · getActiveGoals()          // @/lib/goals/queries
recommendGoals() · acceptGoal() · toggleGoalDay() · updateGoalStatus()  // @/lib/goals/actions
getLatestReflection() · getReflections() · generateReflection()  // @/lib/ai-outputs/*
```

---

## กติกา 7 ข้อ

1. **เปิด issue ก่อนเขียนโค้ดเสมอ** · 1 issue = 1 branch = 1 PR → `feat/<เลข issue>-<คำสั้น>` เช่น `feat/f2-02-charts`
2. **อัปเดตโค้ด 3 จังหวะ:** ก่อนเริ่มงาน · **ก่อน push/เปิด PR** ⭐ · เมื่อมีคนประกาศว่า merge

   ```bash
   git checkout main && git pull
   git checkout <branch ตัวเอง> && git merge main
   ```

3. **ก่อนเปิด PR รัน `npm run format` เสมอ** · ถ้าแตะ UI รัน `npm run e2e` ด้วย (~40 วิ) — **CI บังคับ 2 ด่านนี้ ไม่ผ่าน = merge ไม่ได้**
4. **อยู่ในโซนของสายตัวเอง** — ถ้าต้องแตะไฟล์นอกโซน **แจ้งกลุ่มก่อน**
   **ห้ามลง npm package เอง** (จะทำ `package-lock.json` ชนกัน) → แจ้งกลุ่ม → A ลงบน main
5. **ห้ามแตะ DB / Supabase / Gemini ตรง ๆ** — เรียกฟังก์ชันจาก `src/lib/` เท่านั้น
   ⚠️ **โควตา Gemini ฟรี = 20 ครั้ง/วัน ทั้งแอปรวมกัน** → **อย่ากดปุ่มวิเคราะห์/แชทรัว ๆ เล่น** (มี cache กันให้แล้ว แต่รู้ไว้)
   ห้ามหาวันที่ด้วย `new Date()` → ใช้ `today()` / `daysAgo()` จาก `lib/checkins/date.ts`
   ชื่อไทยของค่าต่าง ๆ → `lib/checkins/labels.ts` · คำต้องห้าม → `lib/safety/language.ts`
6. **UI: อ่านส่วนแรกของ `DESIGN.md` (ถึงเส้น `---` แรก)** — `<PageContainer>` · ห้ามใส่ `<main>` เอง · ทุกหน้ามี `<h1>` 1 อัน · ทุกหน้าใหม่มี `loading.tsx` · การ์ดที่ดึงข้อมูลเองครอบ `<Suspense>` · **ทุกอย่างที่กดได้สูง ≥ 44px** · **ห้าม hardcode สี** · **ไม่มี boolean prop คุมพฤติกรรม**
7. **เช็ค git config ก่อน commit แรก** — `git config user.email` ต้องตรงกับอีเมลที่ Verified บน GitHub ไม่งั้น**ผลงานไม่ถูกนับ**

---

## รายการงานที่เหลือ (20 issues)

| Issue | งาน | สาย | หมายเหตุ |
| --- | --- | --- | --- |
| f2/02 | กราฟ 3 ด้าน + energy | 🟦 | **อ่าน skill `dataviz` ก่อนเขียน** |
| f2/03 | Disruptor overlay | 🟦 | |
| f2/04 | ตาราง Pattern | 🟦 | stub-OK — วาด UI ได้เลย ไม่ต้องรอ F3-03 |
| f2/05 | Streak | 🟦 | **ตัดได้ถ้าไม่ทัน** (Priority C) |
| f4/01 | Chat UI + ประวัติ | 🟩 | UI ยากสุดในแอป — ติดขัดบอกทันที |
| f4/05 | ลบประวัติแชท | 🟩 | เรียก `clearChatHistory()` เกือบเสร็จ |
| f4/03 | Guided goal flow | 🟩 | ⛔ **รอ A (F4-02 + F5-01)** — flow ที่โจทย์บังคับ |
| f7/02 | ลบข้อมูล/บัญชี 🔒 | 🟨 | โค้ดลบเขียนให้แล้ว ทำแค่ UI + confirm |
| f5/02 | หน้า goals | 🟨 | stub-OK — `recommendGoals()` ใช้ได้แล้ว |
| f6/02 | หน้า reflection | 🟨 | stub-OK — AC "≥2 สัปดาห์" รอ A gen ข้อมูล |
| f3/03 · f3/04 🔒 | AI insight + ข้อมูลไม่พอ | A | |
| f4/02 · f4/04 🔒 | AI coach context + escalation | A | f4/02 = ประตู F4-03 |
| f5/01 🔒 · f6/01 | AI goal + reflection | A | f5/01 = ประตู F4-03 |
| qa/01 🔒 · qa/02 · qa/03 · qa/04 | Safety checklist · QA · Pitch · Limitations | A + ทุกคน | 27–29 ก.ค. · **qa/02 ต้องจับเวลา check-in จริง** |

**🔒 = ห้ามตัดทิ้งแม้เวลาไม่พอ** (เกณฑ์ Safety / Privacy โดยตรง) — **อยู่ในมือ A ทั้งหมด**

## จุดที่ต้องรอกัน (เหลือจุดเดียว)

**F4-03 (สาย 🟩) รอ A ทำ F4-02 + F5-01 ให้เสร็จก่อน** — มันเป็นบทสนทนา guided ที่เรียกทั้ง coach context (F4-02) และ goal validation (F5-01) ของ A จริง ๆ stub ไม่ได้เหมือน UI อื่น
→ 🟩 ทำ F4-01 → F4-05 ไปก่อน · A ดัน F4-02 + F5-01 ให้ทัน · **เสร็จแล้ว A ไปคอมเม้นปลดล็อกในไฟล์ issue F4-03**

> F2-04 / F5-02 / F6-02 **ไม่ใช่จุดรอ** — เป็น stub-OK ทั้งหมด (วาด UI ได้เลยวันนี้ ข้อมูล AI จริงมาเสียบข้างหลัง signature เดิม) · F6-02 มีหางเดียวคือ AC "เห็น reflection ≥ 2 สัปดาห์" ที่รอ A gen ข้อมูลให้ปาล์ม แต่ UI จบก่อนได้
