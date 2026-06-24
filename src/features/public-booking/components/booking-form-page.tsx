"use client";

import { ArrowRight, CalendarDays, CheckCircle2, Clock, MessageCircle, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import {
  createWhatsAppUrl,
  formatRupiah,
  getFirstAvailableSlot,
  getSlotsForCourt,
  getSportById,
} from "@/domain/booking/queries";
import { slotDates } from "@/domain/booking/mock-data";
import type { Court, Venue } from "@/domain/booking/types";
import { cn } from "@/lib/utils";
import { CourtVisual } from "./court-visual";

type BookingFormPageProps = {
  venue: Venue;
  court: Court;
  initialDate?: string;
  initialStart?: string;
  initialEnd?: string;
};

export function BookingFormPage({
  venue,
  court,
  initialDate,
  initialStart,
  initialEnd,
}: BookingFormPageProps) {
  const router = useRouter();
  const fallbackDate = initialDate ?? slotDates[0].value;
  const fallbackSlot = getFirstAvailableSlot(court.id, fallbackDate);
  const [selectedDate, setSelectedDate] = useState(fallbackDate);
  const [selectedSlot, setSelectedSlot] = useState({
    startTime: initialStart ?? fallbackSlot?.startTime ?? "08:00",
    endTime: initialEnd ?? fallbackSlot?.endTime ?? "09:00",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sport = getSportById(court.sportId);
  const availableSlots = useMemo(
    () => getSlotsForCourt(court.id, selectedDate).filter((slot) => slot.status === "available"),
    [court.id, selectedDate],
  );

  const totalPrice = court.pricePerHour;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      router.push("/booking/CV-2026-DEMO");
    }, 450);
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <ButtonLink href={`/venue/${venue.slug}`} variant="ghost" size="sm">
            Kembali ke venue
          </ButtonLink>
          <ButtonLink
            href={createWhatsAppUrl(
              venue.whatsappNumber,
              `Halo Admin ${venue.name}, saya ingin bertanya tentang ${court.name}.`,
            )}
            variant="secondary"
            size="sm"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Admin
          </ButtonLink>
        </div>

        <div className="mb-8">
          <Badge>Form booking tanpa login</Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
            Konfirmasi jadwal bermain kamu.
          </h1>
          <p className="mt-4 max-w-3xl leading-8 text-text-secondary">
            Isi data customer, cek ulang jadwal, lalu lanjut ke halaman detail booking untuk melihat
            instruksi pembayaran manual.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <Card>
              <div className="grid gap-5 md:grid-cols-[240px_1fr]">
                <CourtVisual tone={court.imageTone} label={court.name} className="h-44" />
                <div>
                  <Badge>{sport?.name ?? "Olahraga"}</Badge>
                  <h2 className="mt-3 text-2xl font-extrabold">{court.name}</h2>
                  <p className="mt-2 leading-7 text-text-secondary">{court.description}</p>
                  <p className="mt-4 text-xl font-extrabold text-primary">
                    {formatRupiah(court.pricePerHour)}
                    <span className="text-sm font-medium text-text-secondary"> / jam</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">Pilih tanggal dan slot</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {slotDates.map((date) => (
                  <button
                    type="button"
                    key={date.value}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition",
                      selectedDate === date.value
                        ? "border-primary bg-primary text-background"
                        : "border-border bg-surface-soft text-text-secondary hover:border-primary/60",
                    )}
                    onClick={() => {
                      const nextSlot = getFirstAvailableSlot(court.id, date.value);
                      setSelectedDate(date.value);
                      if (nextSlot) {
                        setSelectedSlot({
                          startTime: nextSlot.startTime,
                          endTime: nextSlot.endTime,
                        });
                      }
                    }}
                  >
                    <span className="block text-sm font-bold">{date.label}</span>
                    <span className="text-xs opacity-75">{date.value}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {availableSlots.map((slot) => (
                  <button
                    type="button"
                    key={`${slot.date}-${slot.startTime}`}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-center text-xs font-semibold transition",
                      selectedSlot.startTime === slot.startTime
                        ? "border-primary bg-primary text-background"
                        : "border-border bg-surface-soft text-text-primary hover:border-primary/60",
                    )}
                    onClick={() =>
                      setSelectedSlot({ startTime: slot.startTime, endTime: slot.endTime })
                    }
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">Data customer</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Nama lengkap
                  <Input required name="name" placeholder="Contoh: Raka Pratama" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-text-secondary">
                  Nomor WhatsApp
                  <Input required name="phone" placeholder="08xxxxxxxxxx" inputMode="tel" />
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-semibold text-text-secondary">
                Catatan opsional
                <Textarea name="notes" placeholder="Contoh: datang 10 menit sebelum jam main." />
              </label>
            </Card>

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Memproses booking..." : "Konfirmasi Booking"}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>

          <Card className="lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Ringkasan booking</h2>
            <div className="mt-5 grid gap-4 text-sm">
              <SummaryRow icon={<UserRound className="h-4 w-4" />} label="Venue" value={venue.name} />
              <SummaryRow icon={<CheckCircle2 className="h-4 w-4" />} label="Lapangan" value={court.name} />
              <SummaryRow icon={<CalendarDays className="h-4 w-4" />} label="Tanggal" value={selectedDate} />
              <SummaryRow
                icon={<Clock className="h-4 w-4" />}
                label="Jam"
                value={`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
              />
            </div>
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
              <p className="text-sm text-text-secondary">Total pembayaran</p>
              <p className="mt-1 text-3xl font-extrabold text-primary">{formatRupiah(totalPrice)}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Setelah konfirmasi, booking demo akan masuk status pending payment dan menampilkan
              instruksi pembayaran manual.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-soft p-4">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="text-xs text-text-secondary">{label}</p>
        <p className="font-semibold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
