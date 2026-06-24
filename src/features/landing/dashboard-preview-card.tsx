import { CalendarDays, CheckCircle2, Clock, CreditCard, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  adminPreviewRows,
  bookingPreviewRows,
  heroStats,
} from "@/features/landing/landing-content";

export function PublicBookingPreviewCard() {
  return (
    <Card className="relative overflow-hidden p-0">
      <div className="absolute inset-x-10 top-0 h-20 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative border-b border-border bg-surface-soft/70 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary">Halaman booking publik</p>
            <h3 className="mt-1 text-lg font-bold text-text-primary">Booking di Arena Sport Center</h3>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary">
            <CalendarDays className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="relative space-y-5 p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-border bg-background/50">
          <div className="h-36 bg-[linear-gradient(135deg,rgba(57,255,136,0.35),rgba(77,163,255,0.18)),radial-gradient(circle_at_70%_20%,rgba(248,250,252,0.18),transparent_24%)] p-4">
            <Badge tone="muted" className="border-white/15 bg-background/40 text-text-primary">
              <MapPin className="h-4 w-4 text-primary" />
              Jakarta Selatan
            </Badge>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-xl font-extrabold text-text-primary">Arena Sport Center</h4>
                <p className="mt-1 text-sm text-text-secondary">Futsal · Badminton · Basket</p>
              </div>
              <Badge>Open 08:00 - 23:00</Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/40">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">Alur booking customer</p>
              <p className="text-xs text-text-secondary">Pilih venue, slot, lalu konfirmasi</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>

          <div className="divide-y divide-border">
            {bookingPreviewRows.map((row) => (
              <div key={row.label} className="grid gap-3 p-4 text-sm sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-text-primary">{row.value}</p>
                    <StatusBadge status={row.status} />
                  </div>
                  <p className="mt-2 text-text-secondary">{row.note}</p>
                </div>
                <p className="font-semibold text-primary">{row.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function DashboardPreviewCard() {
  return (
    <Card className="relative overflow-hidden p-0">
      <div className="absolute inset-x-10 top-0 h-20 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative border-b border-border bg-surface-soft/70 p-4">
        <div>
          <p className="text-xs font-semibold text-primary">Setelah customer booking</p>
          <h3 className="mt-1 text-lg font-bold text-text-primary">Operasional venue lebih rapi</h3>
        </div>
      </div>

      <div className="relative space-y-5 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {heroStats.map((stat, index) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-background/50 p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-surface-soft text-primary">
                {index === 0 ? (
                  <CalendarDays className="h-4 w-4" />
                ) : index === 1 ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
              </div>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-background/40">
          <div className="divide-y divide-border">
            {adminPreviewRows.map((row) => (
              <div key={row.code} className="grid gap-3 p-4 text-sm sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-text-primary">{row.code}</p>
                    <StatusBadge status={row.status} />
                  </div>
                  <p className="mt-2 text-text-secondary">
                    {row.customer} · {row.court} · {row.time}
                  </p>
                </div>
                <p className="font-semibold text-primary">{row.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
