"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { USER_DATA_TABLES } from "./tables";

export type AccountActionResult = { ok: true } | { error: string };

export async function deleteAllData(): Promise<AccountActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่" };
  }

  for (const table of USER_DATA_TABLES) {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id);
    if (error) {
      return { error: `ลบข้อมูลไม่สำเร็จ (${table}) — ลองใหม่อีกครั้ง` };
    }
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteAccount(): Promise<AccountActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่" };
  }

  const { error } = await createAdminClient().auth.admin.deleteUser(user.id);
  if (error) {
    return { error: "ลบบัญชีไม่สำเร็จ — ลองใหม่อีกครั้ง" };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login?deleted=1");
}
