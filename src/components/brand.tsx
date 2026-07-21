import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("shrink-0", className)}>
      <rect x="5" y="19" width="10" height="24" rx="5" fill="var(--chart-2)" />
      <rect x="19" y="7" width="10" height="36" rx="5" fill="var(--chart-1)" />
      <rect x="33" y="26" width="10" height="17" rx="5" fill="var(--chart-3)" />
    </svg>
  );
}

export function BrandLockup({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <BrandMark className={cn("size-6", markClassName)} />
      <span className={cn("font-semibold", wordClassName)}>Cadence</span>
    </span>
  );
}
