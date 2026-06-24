import { cn } from "@/lib/utils";

const toneClasses = {
  green:
    "bg-[linear-gradient(135deg,rgba(57,255,136,0.34),rgba(16,24,32,0.94)),radial-gradient(circle_at_75%_20%,rgba(182,255,77,0.24),transparent_28%)]",
  blue:
    "bg-[linear-gradient(135deg,rgba(77,163,255,0.34),rgba(16,24,32,0.94)),radial-gradient(circle_at_75%_20%,rgba(57,255,136,0.18),transparent_28%)]",
  lime:
    "bg-[linear-gradient(135deg,rgba(182,255,77,0.3),rgba(16,24,32,0.94)),radial-gradient(circle_at_75%_20%,rgba(57,255,136,0.18),transparent_28%)]",
};

type CourtVisualProps = {
  tone: keyof typeof toneClasses;
  label: string;
  className?: string;
};

export function CourtVisual({ tone, label, className }: CourtVisualProps) {
  return (
    <div
      className={cn(
        "relative h-40 overflow-hidden rounded-3xl border border-border",
        toneClasses[tone],
        className,
      )}
    >
      <div className="absolute inset-x-8 top-8 h-px bg-white/20" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-white/20" />
      <div className="absolute inset-y-8 left-8 w-px bg-white/20" />
      <div className="absolute inset-y-8 right-8 w-px bg-white/20" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
      <div className="absolute bottom-4 left-4 rounded-xl bg-background/55 px-3 py-2 text-xs font-semibold text-text-primary backdrop-blur">
        {label}
      </div>
    </div>
  );
}
