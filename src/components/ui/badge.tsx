import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "primary" | "info" | "warning" | "success" | "danger" | "muted";

const toneClasses: Record<BadgeTone, string> = {
  primary: "border-primary/30 bg-primary/10 text-primary",
  info: "border-info/30 bg-info/10 text-info",
  warning: "border-warning/30 bg-warning/10 text-warning",
  success: "border-success/30 bg-success/10 text-success",
  danger: "border-danger/30 bg-danger/10 text-danger",
  muted: "border-border bg-surface-soft text-text-secondary",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
