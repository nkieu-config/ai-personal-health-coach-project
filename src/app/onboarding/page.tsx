import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasCompletedOnboarding } from "@/lib/auth/onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (await hasCompletedOnboarding(supabase, user.id)) redirect("/");

  async function completeOnboarding() {
    "use server";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");
    await supabase.from("profiles").upsert({
      user_id: user.id,
      display_name: user.email?.split("@")[0] ?? "ผู้ใช้",
      status: "student",
      disclaimer_accepted_at: new Date().toISOString(),
    });
    revalidatePath("/", "layout");
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ยินดีต้อนรับสู่ HealthCoach</CardTitle>
          <CardDescription>
            หน้านี้เป็น placeholder ชั่วคราวของ F0-01 — จะถูกแทนด้วย onboarding จริง (F0-02) และ safety
            disclaimer (F0-03) โดย A
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            กดปุ่มเพื่อสร้างโปรไฟล์เริ่มต้นและเข้าใช้งาน — ของจริงจะเก็บสถานะ (นักศึกษา/first jobber),
            วันเรียนเช้า, ข้อจำกัด และให้กดรับทราบ disclaimer ก่อน
          </p>
          <form action={completeOnboarding}>
            <Button type="submit" className="w-full">
              รับทราบและเริ่มใช้งาน
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
