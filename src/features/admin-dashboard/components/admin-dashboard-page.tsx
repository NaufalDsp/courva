"use client";

import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  createWhatsAppUrl,
  formatRupiah,
  getAdminChartData,
  getAdminDashboardSummary,
  getAllAdminBookings,
  getCourtById,
  getPaymentInstructions,
  getSportById,
} from "@/domain/booking/queries";
import { courts, slotDates, slots, venues } from "@/domain/booking/mock-data";
import type { Booking } from "@/domain/booking/types";
import { cn } from "@/lib/utils";

type AdminTab = "summary" | "venues" | "courts" | "schedules" | "bookings" | "payments";

const navItems: Array<{ id: AdminTab; label: string; icon: React.ElementType }> = [
  { id: "summary", label: "Dashboard", icon: LayoutDashboard },
  { id: "venues", label: "Venue", icon: MapPin },
  { id: "courts", label: "Lapangan", icon: ShieldCheck },
  { id: "schedules", label: "Jadwal", icon: CalendarClock },
  { id: "bookings", label: "Booking", icon: BarChart3 },
  { id: "payments", label: "Pembayaran", icon: WalletCards },
];

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("summary");
  const summary = getAdminDashboardSummary();
  const chartData = getAdminChartData();
  const bookings = getAllAdminBookings();
  const waitingPayments = bookings.filter((booking) => booking.status === "waiting_verification");

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-border bg-surface/80 p-5 lg:block">
          <DashboardBrand />
          <DashboardNav activeTab={activeTab} onChange={setActiveTab} />
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">Admin Tenant</p>
                <h1 className="text-2xl font-extrabold tracking-normal">
                  {navItems.find((item) => item.id === activeTab)?.label}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <ButtonLink href="/venue/arena-sport-center" variant="secondary" size="sm">
                  Lihat Venue Publik
                </ButtonLink>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary lg:hidden">
                  <Menu className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold",
                    activeTab === item.id
                      ? "border-primary bg-primary text-background"
                      : "border-border bg-surface text-text-secondary",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="px-5 py-6 sm:px-6 lg:px-8">
            {activeTab === "summary" && (
              <SummaryView
                summary={summary}
                chartData={chartData}
                bookings={bookings}
                waitingPayments={waitingPayments}
                onOpenBookings={() => setActiveTab("bookings")}
                onOpenPayments={() => setActiveTab("payments")}
              />
            )}
            {activeTab === "venues" && <VenueManagementView />}
            {activeTab === "courts" && <CourtManagementView />}
            {activeTab === "schedules" && <ScheduleManagementView />}
            {activeTab === "bookings" && <BookingManagementView bookings={bookings} />}
            {activeTab === "payments" && <PaymentVerificationView bookings={waitingPayments} />}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardBrand() {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-background">
        <LayoutDashboard className="h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-extrabold">Courva</p>
        <p className="text-xs text-text-secondary">Arena Sport Center</p>
      </div>
    </div>
  );
}

function DashboardNav({
  activeTab,
  onChange,
}: {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
}) {
  return (
    <nav className="grid gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
              activeTab === item.id
                ? "bg-primary text-background shadow-[0_0_24px_rgba(57,255,136,0.22)]"
                : "text-text-secondary hover:bg-surface-soft hover:text-text-primary",
            )}
            onClick={() => onChange(item.id)}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function SummaryView({
  summary,
  chartData,
  bookings,
  waitingPayments,
  onOpenBookings,
  onOpenPayments,
}: {
  summary: ReturnType<typeof getAdminDashboardSummary>;
  chartData: ReturnType<typeof getAdminChartData>;
  bookings: Booking[];
  waitingPayments: Booking[];
  onOpenBookings: () => void;
  onOpenPayments: () => void;
}) {
  const cards = [
    { label: "Booking Hari Ini", value: summary.todayBookings, note: "Perlu dipantau" },
    { label: "Pending Payment", value: summary.pendingPayment, note: "Menunggu customer" },
    { label: "Waiting Verification", value: summary.waitingVerification, note: "Perlu verifikasi" },
    { label: "Confirmed", value: summary.confirmed, note: "Sudah aman" },
    { label: "Pendapatan Bulan Ini", value: formatRupiah(summary.monthlyRevenue), note: "Estimasi" },
    { label: "Lapangan Aktif", value: summary.activeCourts, note: `${summary.activeVenues} venue aktif` },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm font-semibold text-text-secondary">{card.label}</p>
            <p className="mt-3 text-3xl font-extrabold text-text-primary">{card.value}</p>
            <Badge className="mt-4" tone="muted">
              {card.note}
            </Badge>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <RevenueChartCard data={chartData} />

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Kesehatan operasional</h2>
              <p className="mt-1 text-sm text-text-secondary">Snapshot performa venue minggu ini.</p>
            </div>
            <Badge>Live mock</Badge>
          </div>
          <div className="mt-6 grid gap-4">
            <ProgressMetric label="Okupansi slot" value={78} tone="primary" />
            <ProgressMetric label="Pembayaran terverifikasi" value={64} tone="success" />
            <ProgressMetric label="Slot prime time terisi" value={86} tone="info" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Booking terbaru</h2>
              <p className="mt-1 text-sm text-text-secondary">Ringkasan operasional customer.</p>
            </div>
            <button className="text-sm font-semibold text-primary" onClick={onOpenBookings}>
              Lihat semua
            </button>
          </div>
          <BookingTable bookings={bookings.slice(0, 4)} compact />
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Perlu verifikasi</h2>
              <p className="mt-1 text-sm text-text-secondary">Bukti pembayaran masuk.</p>
            </div>
            <button className="text-sm font-semibold text-primary" onClick={onOpenPayments}>
              Buka
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {waitingPayments.map((booking) => (
              <PaymentReviewCard key={booking.id} booking={booking} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

type ChartMetric = "bookings" | "revenue" | "occupancy";

const chartMetricConfig: Record<
  ChartMetric,
  { label: string; suffix?: string; formatter: (value: number) => string }
> = {
  bookings: {
    label: "Booking",
    formatter: (value) => `${value} booking`,
  },
  revenue: {
    label: "Pendapatan",
    formatter: formatRupiah,
  },
  occupancy: {
    label: "Okupansi",
    suffix: "%",
    formatter: (value) => `${value}%`,
  },
};

function RevenueChartCard({ data }: { data: ReturnType<typeof getAdminChartData> }) {
  const [metric, setMetric] = useState<ChartMetric>("revenue");
  const [activeIndex, setActiveIndex] = useState(data.length - 1);
  const config = chartMetricConfig[metric];
  const values = data.map((item) => item[metric]);
  const maxValue = Math.max(...values);
  const activePoint = data[activeIndex];
  const chartWidth = 640;
  const chartHeight = 220;
  const paddingX = 34;
  const paddingY = 26;
  const points = data.map((item, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (data.length - 1);
    const value = item[metric];
    const y =
      chartHeight -
      paddingY -
      (value / maxValue) * (chartHeight - paddingY * 2);

    return { x, y, value, item };
  });
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${
    chartHeight - paddingY
  } Z`;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Performa mingguan</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Pantau tren booking, pendapatan, dan okupansi venue.
          </p>
        </div>
        <div className="flex rounded-xl border border-border bg-surface-soft p-1">
          {(Object.keys(chartMetricConfig) as ChartMetric[]).map((item) => (
            <button
              key={item}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-bold transition",
                metric === item ? "bg-primary text-background" : "text-text-secondary hover:text-text-primary",
              )}
              onClick={() => setMetric(item)}
            >
              {chartMetricConfig[item].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_180px]">
        <div className="rounded-3xl border border-border bg-background/45 p-4">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-72 w-full overflow-visible">
            <defs>
              <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#39FF88" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#39FF88" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((line) => {
              const y = paddingY + (line * (chartHeight - paddingY * 2)) / 3;

              return (
                <line
                  key={line}
                  x1={paddingX}
                  x2={chartWidth - paddingX}
                  y1={y}
                  y2={y}
                  stroke="#27313D"
                  strokeDasharray="6 8"
                />
              );
            })}
            <path d={areaPath} fill="url(#chartArea)" />
            <path d={linePath} fill="none" stroke="#39FF88" strokeLinecap="round" strokeWidth="4" />
            {points.map((point, index) => (
              <g key={point.item.label}>
                <button
                  type="button"
                  aria-label={`Pilih data ${point.item.date}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={activeIndex === index ? 9 : 6}
                    fill={activeIndex === index ? "#39FF88" : "#070A0F"}
                    stroke="#39FF88"
                    strokeWidth="3"
                    className="cursor-pointer transition"
                  />
                </button>
                <text
                  x={point.x}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  className="fill-[#A7B0BC] text-[13px] font-semibold"
                >
                  {point.item.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-3xl border border-primary/25 bg-primary/10 p-5">
          <p className="text-sm font-semibold text-primary">{activePoint.date}</p>
          <p className="mt-2 text-3xl font-extrabold text-text-primary">
            {config.formatter(activePoint[metric])}
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            <ChartStat label="Booking" value={`${activePoint.bookings} booking`} />
            <ChartStat label="Pendapatan" value={formatRupiah(activePoint.revenue)} />
            <ChartStat label="Okupansi" value={`${activePoint.occupancy}%`} />
          </div>
        </div>
      </div>
    </Card>
  );
}

function ChartStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/45 px-3 py-2">
      <span className="text-text-secondary">{label}</span>
      <span className="font-bold text-text-primary">{value}</span>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "primary" | "success" | "info";
}) {
  const colorClass = {
    primary: "bg-primary",
    success: "bg-success",
    info: "bg-info",
  }[tone];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-text-secondary">{label}</span>
        <span className="font-extrabold text-text-primary">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-surface-soft">
        <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function VenueManagementView() {
  return (
    <div className="grid gap-5">
      {venues.map((venue) => (
        <Card key={venue.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge>Active</Badge>
              <h2 className="mt-3 text-2xl font-extrabold">{venue.name}</h2>
              <p className="mt-2 max-w-3xl leading-7 text-text-secondary">{venue.description}</p>
              <p className="mt-4 text-sm text-text-secondary">
                {venue.address}, {venue.city} · {venue.openTime} - {venue.closeTime}
              </p>
            </div>
            <ButtonLink href={`/venue/${venue.slug}`} variant="secondary">
              Preview Publik
            </ButtonLink>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {venue.facilities.map((facility) => (
              <Badge key={facility} tone="muted">
                {facility}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function CourtManagementView() {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Daftar lapangan</h2>
          <p className="mt-1 text-sm text-text-secondary">Kelola jenis olahraga, harga, dan status.</p>
        </div>
        <Badge>Tambah Lapangan</Badge>
      </div>
      <div className="mt-5 grid gap-3">
        {courts.map((court) => {
          const sport = getSportById(court.sportId);
          const venue = venues.find((item) => item.id === court.venueId);

          return (
            <div
              key={court.id}
              className="grid gap-3 rounded-2xl border border-border bg-surface-soft p-4 md:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-text-primary">{court.name}</h3>
                  <Badge>{sport?.name ?? "Olahraga"}</Badge>
                  <Badge tone={court.isActive ? "success" : "muted"}>
                    {court.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  {venue?.name} · {court.description}
                </p>
              </div>
              <p className="font-extrabold text-primary">{formatRupiah(court.pricePerHour)}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ScheduleManagementView() {
  const groupedSlots = slotDates.map((date) => ({
    date,
    total: slots.filter((slot) => slot.date === date.value).length,
    available: slots.filter((slot) => slot.date === date.value && slot.status === "available").length,
    blocked: slots.filter((slot) => slot.date === date.value && slot.status !== "available").length,
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <h2 className="text-xl font-bold">Aturan jadwal</h2>
        <div className="mt-5 grid gap-4">
          <ScheduleRule label="Hari aktif" value="Senin - Minggu" />
          <ScheduleRule label="Jam operasional" value="08:00 - 23:00" />
          <ScheduleRule label="Durasi slot" value="60 menit" />
          <ScheduleRule label="Maintenance" value="Manual per slot" />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold">Preview slot</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {groupedSlots.map((item) => (
            <div key={item.date.value} className="rounded-2xl border border-border bg-surface-soft p-4">
              <p className="font-bold">{item.date.label}</p>
              <p className="mt-1 text-sm text-text-secondary">{item.date.value}</p>
              <div className="mt-4 flex gap-2">
                <Badge tone="success">{item.available} tersedia</Badge>
                <Badge tone="warning">{item.blocked} tertutup</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function BookingManagementView({ bookings }: { bookings: Booking[] }) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Daftar booking</h2>
          <p className="mt-1 text-sm text-text-secondary">Filter dan pantau status booking customer.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-soft px-3 py-2 text-sm text-text-secondary">
          <Search className="h-4 w-4 text-primary" />
          Cari kode/customer
        </div>
      </div>
      <BookingTable bookings={bookings} />
    </Card>
  );
}

function PaymentVerificationView({ bookings }: { bookings: Booking[] }) {
  const instructions = getPaymentInstructions();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <h2 className="text-xl font-bold">Verifikasi pembayaran</h2>
        <div className="mt-5 grid gap-3">
          {bookings.length > 0 ? (
            bookings.map((booking) => <PaymentReviewCard key={booking.id} booking={booking} />)
          ) : (
            <p className="rounded-2xl border border-border bg-surface-soft p-5 text-text-secondary">
              Tidak ada bukti pembayaran yang perlu diverifikasi.
            </p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold">Metode pembayaran</h2>
        <div className="mt-5 grid gap-3">
          {instructions.map((instruction) => (
            <div key={instruction.method} className="rounded-2xl border border-border bg-surface-soft p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <p className="font-bold">{instruction.label}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{instruction.instructions}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function BookingTable({ bookings, compact = false }: { bookings: Booking[]; compact?: boolean }) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-border">
      <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-surface-soft px-4 py-3 text-xs font-bold uppercase text-text-secondary md:grid">
        <span>Kode</span>
        <span>Customer</span>
        <span>Lapangan</span>
        <span>Jadwal</span>
        <span>Status</span>
      </div>
      <div className="divide-y divide-border">
        {bookings.map((booking) => {
          const court = getCourtById(booking.courtId);

          return (
            <div
              key={booking.id}
              className="grid gap-3 px-4 py-4 text-sm md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
            >
              <div>
                <p className="font-bold text-text-primary">{booking.bookingCode}</p>
                {!compact && <p className="text-xs text-text-secondary">{formatRupiah(booking.totalPrice)}</p>}
              </div>
              <p className="text-text-secondary">{booking.customerName}</p>
              <p className="text-text-secondary">{court?.name ?? "-"}</p>
              <p className="text-text-secondary">
                {booking.bookingDate} · {booking.startTime}
              </p>
              <StatusBadge status={booking.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PaymentReviewCard({ booking }: { booking: Booking }) {
  const court = getCourtById(booking.courtId);
  const venue = venues.find((item) => item.id === booking.venueId);

  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-bold text-text-primary">{booking.bookingCode}</p>
          <p className="mt-1 text-sm text-text-secondary">
            {booking.customerName} · {court?.name ?? "-"}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-extrabold text-primary">{formatRupiah(booking.totalPrice)}</p>
        <div className="flex gap-2">
          <ButtonLink
            href={createWhatsAppUrl(
              venue?.whatsappNumber ?? "6281234567890",
              `Halo ${booking.customerName}, bukti pembayaran untuk ${booking.bookingCode} sedang kami cek.`,
            )}
            variant="secondary"
            size="sm"
            target="_blank"
          >
            WhatsApp
          </ButtonLink>
          <Badge tone="success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approve
          </Badge>
        </div>
      </div>
    </div>
  );
}

function ScheduleRule({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-4">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-1 font-bold text-text-primary">{value}</p>
    </div>
  );
}
