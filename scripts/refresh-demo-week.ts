import { today } from "../src/lib/checkins/date";
import { weekDates, weekStart } from "../src/lib/goals/week";
import { createAdminClient } from "../src/lib/supabase/admin";

const EMAIL = process.env.DEMO_EMAIL ?? "palm@example.com";

const DEMO_GOAL = {
  title: "เตรียมมื้อเช้าง่าย ๆ ไว้ล่วงหน้า สำหรับวันจันทร์กับพุธที่เรียนเช้า",
  situation_tag: "early_class",
};

type Admin = ReturnType<typeof createAdminClient>;

async function findUserId(admin: Admin): Promise<string> {
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;
  const user = data.users.find((u) => u.email === EMAIL);
  if (!user) throw new Error(`หาบัญชี demo ไม่เจอ: ${EMAIL} — รัน npm run seed ก่อน`);
  return user.id;
}

function elapsedWeekdaysThisWeek(): string[] {
  const now = today();
  return weekDates().filter((date) => {
    if (date > now) return false;
    const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
    return weekday >= 1 && weekday <= 5;
  });
}

async function run() {
  const admin = createAdminClient();
  const week = weekStart();

  console.log(`บัญชี demo: ${EMAIL}`);
  const userId = await findUserId(admin);
  console.log(`สัปดาห์ปัจจุบัน: ${week}`);

  const { data: existing, error: readError } = await admin
    .from("goals")
    .select("id, title, status")
    .eq("user_id", userId)
    .eq("week_start", week)
    .eq("status", "active");
  if (readError) throw new Error(`อ่าน goals ไม่ได้: ${readError.message}`);

  if (existing && existing.length > 0) {
    console.log(`\nมี goal active ของสัปดาห์นี้อยู่แล้ว ${existing.length} ข้อ — ไม่ต้องทำอะไร`);
    for (const goal of existing) console.log(`  • ${goal.title}`);
    return;
  }

  const progress = elapsedWeekdaysThisWeek();
  const { error: insertError } = await admin.from("goals").insert({
    user_id: userId,
    week_start: week,
    title: DEMO_GOAL.title,
    situation_tag: DEMO_GOAL.situation_tag,
    status: "active",
    progress_dates: progress,
  });
  if (insertError) throw new Error(`insert goal ไม่ได้: ${insertError.message}`);

  console.log(`\nเพิ่ม goal ของสัปดาห์นี้แล้ว: "${DEMO_GOAL.title}"`);
  console.log(`ความคืบหน้า: ${progress.length} วัน (${progress.join(", ") || "ยังไม่มี"})`);
  console.log(`\nแตะเฉพาะตาราง goals — check-in / reflection / แชท ที่ cache ไว้ยังอยู่ครบ`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
