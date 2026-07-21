"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

function SignOutConfirm({ onCancel }: { onCancel: () => void }) {
  return (
    <form action={signOut} className="flex items-center gap-2">
      <Button type="submit" size="sm">
        ออกเลย
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
        ยกเลิก
      </Button>
    </form>
  );
}

function useSignOutConfirm() {
  const [confirming, setConfirming] = useState(false);
  return {
    confirming,
    ask: () => setConfirming(true),
    cancel: () => setConfirming(false),
  };
}

export function SignOutIconButton() {
  const { confirming, ask, cancel } = useSignOutConfirm();

  if (confirming) return <SignOutConfirm onCancel={cancel} />;

  return (
    <Button variant="ghost" size="icon" aria-label="ออกจากระบบ" onClick={ask}>
      <LogOut className="size-5" />
    </Button>
  );
}

export function SignOutMenuItem() {
  const { confirming, ask, cancel } = useSignOutConfirm();

  if (confirming) return <SignOutConfirm onCancel={cancel} />;

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 px-4 text-muted-foreground"
      onClick={ask}
    >
      <LogOut className="size-5 shrink-0" />
      ออกจากระบบ
    </Button>
  );
}
