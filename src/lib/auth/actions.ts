"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasCompletedOnboarding } from "@/lib/auth/onboarding";

export type AuthState = { error: string } | undefined;

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

function describeSignUpError(message: string) {
  if (/already registered|already exists|already been registered/i.test(message)) {
    return "อีเมลนี้ถูกใช้สมัครแล้ว ลองเข้าสู่ระบบแทน";
  }
  return "สมัครไม่สำเร็จ ลองใหม่อีกครั้ง";
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) {
    return { error: "กรอกอีเมลและรหัสผ่านให้ครบ" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const onboarded = user ? await hasCompletedOnboarding(supabase, user.id) : false;

  revalidatePath("/", "layout");
  redirect(onboarded ? "/" : "/onboarding");
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) {
    return { error: "กรอกอีเมลและรหัสผ่านให้ครบ" };
  }
  if (password.length < 6) {
    return { error: "รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { error: describeSignUpError(error.message) };
  }
  if (!data.session) {
    return {
      error: "สมัครสำเร็จ แต่ต้องยืนยันอีเมลก่อนเข้าใช้งาน — ปิด Confirm email ใน Supabase สำหรับ prototype",
    };
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
