import { Badge } from "@/components/ui/badge";

const statusMap = {
  pending_payment: { label: "Pending Payment", tone: "warning" },
  waiting_verification: { label: "Waiting Verification", tone: "info" },
  confirmed: { label: "Confirmed", tone: "success" },
  completed: { label: "Completed", tone: "success" },
  cancelled: { label: "Cancelled", tone: "danger" },
  expired: { label: "Expired", tone: "muted" },
} as const;

type Status = keyof typeof statusMap;

export function StatusBadge({ status }: { status: Status }) {
  const item = statusMap[status];

  return <Badge tone={item.tone}>{item.label}</Badge>;
}
