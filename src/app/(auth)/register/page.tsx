import { RegisterForm } from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>สมัครสมาชิก</CardTitle>
        <CardDescription>เริ่มดูแลสุขภาพประจำวันกับ HealthCoach</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
