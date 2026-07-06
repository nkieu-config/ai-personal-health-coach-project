# 05 — Health Behavior Data Design

หลักออกแบบ: **low burden** (คำถามน้อย ตอบเป็นปุ่ม), **data minimization** (ไม่เก็บสิ่งที่ไม่ใช้ ไม่เก็บน้ำหนัก/รูปร่าง), และทุกจุดข้อมูลต้องถูกใช้ใน pattern analysis หรือ dashboard จริง

## แบบจำลองข้อมูล check-in (1 รายการ/วัน)

### กิน (eating)

| ฟิลด์ | ชนิด | ค่า | ใช้ทำอะไร |
|---|---|---|---|
| `meals_count` | int | 0–4 | ความสม่ำเสมอการกิน |
| `skipped_meals` | text[] | `breakfast` `lunch` `dinner` | pattern ข้ามมื้อ × วันเรียนเช้า |
| `sweet_drinks` | int | 0–3+ แก้ว | pattern เครื่องดื่มหวาน × นอนน้อย |
| `meal_feeling` | text? | `just_right` `sleepy` `hungry_fast` `energized` | เสริม ข้ามได้ |

### นอน (sleep)

| ฟิลด์ | ชนิด | ค่า | ใช้ทำอะไร |
|---|---|---|---|
| `sleep_hours` | numeric | 0–14 (step 0.5) | แกนหลักของ pattern ทุกตัว |
| `bed_time_bucket` | text | `before_23` `23_00` `00_01` `01_02` `after_02` | ความคงที่ของเวลานอน (บัคเก็ตพอ ไม่ต้องเวลาเป๊ะ) |
| `sleep_quality` | int | 1–5 | คุณภาพที่ประเมินเอง |
| `late_reason` | text? | `work` `exam` `phone` `commute` `other` | สาเหตุนอนดึก (ถามเฉพาะเมื่อ bed_time ดึก) |

### เคลื่อนไหว (movement)

| ฟิลด์ | ชนิด | ค่า | ใช้ทำอะไร |
|---|---|---|---|
| `movement_types` | text[] | `walk` `stretch` `stairs` `bike` `sport` `none` | ชนิดกิจกรรม |
| `movement_minutes` | int | 0–120+ | ปริมาณ × energy วันถัดไป |
| `movement_blocker` | text? | `no_time` `rain` `tired` `long_sitting` | ข้อจำกัด ใช้เลือก micro goal |

### บริบทวัน (context)

| ฟิลด์ | ชนิด | ค่า | ใช้ทำอะไร |
|---|---|---|---|
| `energy_level` | text | `low` `medium` `high` | ตัวแปรผลลัพธ์หลักของ pattern analysis |
| `disruptors` | text[] | `deadline` `long_meeting` `early_class` `commute` `exam` `none` | เชื่อมพฤติกรรมกับตารางชีวิต — หัวใจของ personalization |
| `note` | text? | อิสระ ≤ 200 ตัวอักษร | ให้ AI ใช้เป็นบริบท เช่น "ประชุมยาวเลยกินช้า" |

## Supabase Schema

```sql
create table profiles (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  status text not null check (status in ('student', 'first_jobber')),
  early_days text[] default '{}',
  typical_constraints text[] default '{}',
  disclaimer_accepted_at timestamptz,
  created_at timestamptz default now()
);

create table checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  checkin_date date not null,
  meals_count int not null,
  skipped_meals text[] default '{}',
  sweet_drinks int default 0,
  meal_feeling text,
  sleep_hours numeric(3,1) not null,
  bed_time_bucket text not null,
  sleep_quality int not null check (sleep_quality between 1 and 5),
  late_reason text,
  movement_types text[] default '{}',
  movement_minutes int default 0,
  movement_blocker text,
  energy_level text not null check (energy_level in ('low','medium','high')),
  disruptors text[] default '{}',
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, checkin_date)
);

create table goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  week_start date not null,
  title text not null,
  situation_tag text,
  status text not null default 'active' check (status in ('active','done','dropped')),
  progress_dates date[] default '{}',
  created_at timestamptz default now()
);

create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  role text not null check (role in ('user','coach')),
  content text not null,
  created_at timestamptz default now()
);

create table ai_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  kind text not null check (kind in ('pattern_analysis','weekly_reflection')),
  period_start date not null,
  period_end date not null,
  content jsonb not null,
  created_at timestamptz default now()
);
```

ทุกตารางเปิด RLS: `user_id = auth.uid()` สำหรับ select/insert/update/delete (รายละเอียด policy ใน docs/08)

## การจำแนกชั้นข้อมูล

| ชั้น | ข้อมูล | การปฏิบัติ |
|---|---|---|
| ข้อมูลสุขภาพ (อ่อนไหว) | checkins ทุกฟิลด์, chat_messages, ai_outputs | RLS เข้มงวด, ลบได้ทั้งหมด, ไม่ส่งให้ third party นอกจาก Gemini ตอน generate (ไม่แนบชื่อ) |
| ข้อมูลส่วนบุคคล | email (auth), display_name | ลบพร้อมบัญชี |
| ข้อมูลบริบท | status, early_days, constraints | ใช้ personalize เท่านั้น |

## สิ่งที่จงใจไม่เก็บ

น้ำหนัก, ส่วนสูง, BMI, แคลอรี, รูปถ่ายอาหาร/ร่างกาย, ตำแหน่งที่อยู่, เวลานอนแบบนาทีเป๊ะ — ตัดตาม guardrail (ไม่โฟกัสรูปร่าง) และ data minimization
