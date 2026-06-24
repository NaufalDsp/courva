import { CalendarDays, Clock, CreditCard, MessageCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  createWhatsAppUrl,
  formatRupiah,
  getPaymentInstructions,
  getSportById,
} from "@/domain/booking/queries";
import type { Booking, Court, Venue } from "@/domain/booking/types";

type BookingDetailPageProps = {
  booking: Booking;
  venue: Venue;
  court: Court;
};

const statusMessages = {
  pending_payment: "Booking berhasil dibuat. Silakan lakukan pembayaran.",
  waiting_verification: "Bukti pembayaran sedang dicek admin.",
  confirmed: "Booking kamu sudah dikonfirmasi.",
  completed: "Booking ini sudah selesai.",
  cancelled: "Booking ini dibatalkan.",
  expired: "Booking ini sudah kedaluwarsa.",
};

export function BookingDetailPage({ booking, venue, court }: BookingDetailPageProps) {
  const sport = getSportById(court.sportId);
  const instructions = getPaymentInstructions();

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <ButtonLink href={`/venue/${venue.slug}`} variant="ghost" size="sm">
            Lihat venue
          </ButtonLink>
          <ButtonLink
            href={createWhatsAppUrl(
              venue.whatsappNumber,
              `Halo Admin, saya ingin konfirmasi booking dengan kode ${booking.bookingCode}.`,
            )}
            variant="secondary"
            size="sm"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Admin
          </ButtonLink>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="grid gap-6">
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <StatusBadge status={booking.status} />
                  <h1 className="mt-5 text-4xl font-extrabold tracking-normal sm:text-5xl">
                    {booking.bookingCode}
                  </h1>
                  <p className="mt-4 max-w-2xl leading-8 text-text-secondary">
                    {statusMessages[booking.status]}
                  </p>
                </div>
                <Badge tone="muted">{sport?.name ?? "Olahraga"}</Badge>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">Detail jadwal</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DetailItem label="Venue" value={venue.name} />
                <DetailItem label="Lapangan" value={court.name} />
                <DetailItem
                  label="Tanggal"
                  value={booking.bookingDate}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
                <DetailItem
                  label="Jam"
                  value={`${booking.startTime} - ${booking.endTime}`}
                  icon={<Clock className="h-4 w-4" />}
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">Instruksi pembayaran</h2>
              <div className="mt-5 grid gap-4">
                {instructions.map((instruction) => (
                  <div key={instruction.method} className="rounded-2xl border border-border bg-surface-soft p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <CreditCard className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-bold text-text-primary">{instruction.label}</p>
                          {instruction.bankName && (
                            <p className="text-sm text-text-secondary">
                              {instruction.bankName} · {instruction.accountNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      {instruction.accountName && <Badge tone="muted">{instruction.accountName}</Badge>}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                      {instruction.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-6 lg:sticky lg:top-24">
            <Card>
              <h2 className="text-xl font-bold">Total pembayaran</h2>
              <p className="mt-3 text-4xl font-extrabold text-primary">
                {formatRupiah(booking.totalPrice)}
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Upload bukti pembayaran setelah transfer agar admin dapat melakukan verifikasi.
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Upload className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-bold">Upload bukti pembayaran</h2>
                  <p className="text-sm text-text-secondary">Mock UI untuk fase frontend.</p>
                </div>
              </div>
              <label className="mt-5 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-soft px-4 py-6 text-center text-sm text-text-secondary transition hover:border-primary/70">
                <Upload className="mb-3 h-6 w-6 text-primary" />
                Klik untuk pilih file bukti pembayaran
                <input type="file" className="sr-only" />
              </label>
              <ButtonLink
                href={createWhatsAppUrl(
                  venue.whatsappNumber,
                  `Halo Admin, saya sudah upload bukti pembayaran untuk ${booking.bookingCode}.`,
                )}
                className="mt-4 w-full"
                target="_blank"
              >
                Konfirmasi via WhatsApp
                <MessageCircle className="h-4 w-4" />
              </ButtonLink>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-4">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        {icon && <span className="text-primary">{icon}</span>}
        {label}
      </div>
      <p className="mt-2 font-bold text-text-primary">{value}</p>
    </div>
  );
}
