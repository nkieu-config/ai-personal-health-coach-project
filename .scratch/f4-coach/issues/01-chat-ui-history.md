# F4-01: Chat UI + เก็บประวัติ

Status: ready-for-human
Owner: 🟩 โค้ช
Sprint: 2
Priority: M
Refs: FR-4.1, FR-4.5

## งาน

- [ ] หน้าแชท: ประวัติจาก `chat_messages`, กล่องพิมพ์, loading ระหว่างรอ (NFR-2 ~10 วิ)
- [ ] บันทึกทั้ง user และ coach message ลง DB
- [ ] ปุ่มเริ่มบทสนทนา (chip): "ช่วยดู pattern สัปดาห์นี้", "อยากตั้งเป้าสัปดาห์หน้า" — ลดกำแพงไม่รู้จะพิมพ์อะไร
- [ ] ข้อความกำกับ safety ถาวรท้ายหน้า (F0-03)

## Acceptance criteria

- ปิดหน้าแล้วกลับมา ประวัติยังอยู่
- Gemini ล่ม → ข้อความสุภาพ + ปุ่ม retry ไม่ crash

## Comments

---

2026-07-14 (kickoff → สาย 🟩 โค้ช): **เริ่มได้เดี๋ยวนี้ — `lib/chat/` พร้อมแล้ว**

**โซนของคุณ (ไม่มีใครแตะ):** `src/app/(app)/coach/` · `src/components/coach/`
**หน้ามี placeholder รออยู่แล้ว** ที่ `src/app/(app)/coach/page.tsx` → **แทนที่เนื้อหาในไฟล์นี้**

## 🎁 คุณไม่ต้องรู้จัก Gemini เลย — เรียก 4 ฟังก์ชันนี้พอ

```tsx
import { getChatHistory, needsReply } from "@/lib/chat/queries";
import { sendCoachMessage, retryCoachReply, clearChatHistory } from "@/lib/chat/actions";
import { MESSAGE_MAX_LENGTH } from "@/lib/chat/actions";

const history = await getChatHistory();   // ChatMessage[] เรียงเก่า → ใหม่
// ChatMessage = { id, role: "user" | "coach", content, createdAt }
```

| ฟังก์ชัน | ทำอะไร | คืนอะไร |
| --- | --- | --- |
| `sendCoachMessage(text)` | ส่งข้อความ + ให้โค้ชตอบ (~10 วิ) | `{ok, message}` หรือ `{error}` |
| `retryCoachReply()` | **ให้โค้ชตอบข้อความล่าสุดที่ยังไม่มีคำตอบ** | `{ok, message}` หรือ `{error}` |
| `clearChatHistory()` | ลบประวัติทั้งหมด (= F4-05 เสร็จเลย) | `{ok}` หรือ `{error}` |
| `needsReply(history)` | `true` ถ้าข้อความสุดท้ายเป็นของ user ที่ยังไม่มีคนตอบ | `boolean` |

## ⚠️ จุดสำคัญที่สุด — ปุ่ม "ลองใหม่" ต้องเรียก `retryCoachReply()` **ไม่ใช่** `sendCoachMessage()` ซ้ำ

**`sendCoachMessage()` บันทึกข้อความ user ลง DB ก่อนเสมอ** แล้วค่อยลองเรียก AI
→ ถ้า Gemini ล่ม **ข้อความของผู้ใช้ไม่หาย** มันอยู่ในประวัติแล้ว แค่ยังไม่มีคำตอบ

```tsx
// ❌ ผิด — จะได้ข้อความ user ซ้ำ 2 อันในประวัติ
if (error) <Button onClick={() => sendCoachMessage(text)}>ลองใหม่</Button>

// ✅ ถูก
if (needsReply(history)) <Button onClick={retryCoachReply}>ลองใหม่</Button>
```

## Flow ที่ต้องทำ

```
1. แสดงประวัติ (ฟองข้อความ user ขวา / coach ซ้าย)
2. กล่องพิมพ์ (จำกัด MESSAGE_MAX_LENGTH = 500 ตัวอักษร)
3. กดส่ง → โชว์ข้อความ user ทันที + "กำลังคิด…" → รอ ~10 วิ → คำตอบโค้ช
4. ถ้า error → ข้อความสุภาพ + ปุ่ม "ลองใหม่" (เรียก retryCoachReply)
5. ปุ่มเริ่มบทสนทนา (chip): "ช่วยดู pattern สัปดาห์นี้" / "อยากตั้งเป้าสัปดาห์หน้า"
6. เปิดหน้าใหม่ ประวัติต้องยังอยู่
```

**ก๊อปแม่แบบได้:** `src/components/checkin/checkin-form.tsx` มี `useTransition` + error state + pending state ครบ

**Safety notice ท้ายหน้า:** layout ใส่ให้แล้ว ไม่ต้องทำเอง

**งานถัดไปในสายคุณ:** F4-01 → **F4-05 (ลบประวัติแชท — เรียก `clearChatHistory()` เกือบเสร็จอยู่แล้ว)** → F4-03

**หมายเหตุ:** ตอนนี้โค้ชยังไม่รู้จักข้อมูล check-in ของผู้ใช้ (F4-02 ของ A จะเพิ่มให้) — **คุณไม่ต้องแก้อะไรตอนนั้น** ฟังก์ชันหน้าตาเหมือนเดิม
