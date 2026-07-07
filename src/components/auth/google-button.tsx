import { signInWithGoogle } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit" variant="outline" className="w-full">
        ดำเนินการต่อด้วย Google
      </Button>
    </form>
  );
}
