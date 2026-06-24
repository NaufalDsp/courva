"use client";

import { ArrowRight, CalendarDays, Clock, MapPin, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  createWhatsAppUrl,
  formatRupiah,
  getFirstAvailableSlot,
  getSlotsForCourt,
  getSportById,
} from "@/domain/booking/queries";
import { slotDates } from "@/domain/booking/mock-data";
import type { Court, Sport, Venue } from "@/domain/booking/types";
import { cn } from "@/lib/utils";
import { CourtVisual } from "./court-visual";

type PublicVenuePageProps = {
  venue: Venue;
  courts: Court[];
  sports: Sport[];
};

export function PublicVenuePage({ venue, courts, sports }: PublicVenuePageProps) {
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedDate, setSelectedDate] = useState(slotDates[0].value);

  const filteredCourts = useMemo(() => {
    if (selectedSport === "all") {
      return courts;
    }

    return courts.filter((court) => court.sportId === selectedSport);
  }, [courts, selectedSport]);

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <section className="px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ButtonLink href="/" variant="ghost" size="sm">
              Courva
            </ButtonLink>
            <ButtonLink
              href={createWhatsAppUrl(
                venue.whatsappNumber,
                `Halo Admin ${venue.name}, saya ingin bertanya tentang booking lapangan.`,
              )}
              variant="secondary"
              size="sm"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </ButtonLink>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge className="mb-5">Halaman venue publik</Badge>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                {venue.name}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
                {venue.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {venue.address}, {venue.city}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {venue.openTime} - {venue.closeTime}
                </span>
              </div>
            </div>

            <Card>
              <p className="text-sm font-semibold text-primary">Fasilitas venue</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {venue.facilities.map((facility) => (
                  <Badge key={facility} tone="muted">
                    {facility}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Search className="h-4 w-4 text-primary" />
                Filter olahraga
              </div>
              <div className="mt-4 grid gap-2">
                <button
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                    selectedSport === "all"
                      ? "border-primary bg-primary text-background"
                      : "border-border bg-surface-soft text-text-secondary hover:border-primary/60",
                  )}
                  onClick={() => setSelectedSport("all")}
                >
                  Semua lapangan
                </button>
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                      selectedSport === sport.id
                        ? "border-primary bg-primary text-background"
                        : "border-border bg-surface-soft text-text-secondary hover:border-primary/60",
                    )}
                    onClick={() => setSelectedSport(sport.id)}
                  >
                    {sport.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <CalendarDays className="h-4 w-4 text-primary" />
                Pilih tanggal
              </div>
              <div className="mt-4 grid gap-2">
                {slotDates.map((date) => (
                  <button
                    key={date.value}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition",
                      selectedDate === date.value
                        ? "border-primary bg-primary text-background"
                        : "border-border bg-surface-soft text-text-secondary hover:border-primary/60",
                    )}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    <span className="block text-sm font-bold">{date.label}</span>
                    <span className="text-xs opacity-75">{date.value}</span>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          <div className="grid gap-5">
            {filteredCourts.map((court) => {
              const sport = getSportById(court.sportId);
              const courtSlots = getSlotsForCourt(court.id, selectedDate);
              const firstAvailableSlot = getFirstAvailableSlot(court.id, selectedDate);
              const bookingHref = firstAvailableSlot
                ? `/venue/${venue.slug}/book/${court.id}?date=${selectedDate}&start=${firstAvailableSlot.startTime}&end=${firstAvailableSlot.endTime}`
                : `/venue/${venue.slug}/book/${court.id}?date=${selectedDate}`;

              return (
                <Card key={court.id} className="grid gap-5 p-4 md:grid-cols-[260px_1fr]">
                  <CourtVisual tone={court.imageTone} label={court.name} />
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Badge>{sport?.name ?? "Olahraga"}</Badge>
                        <h2 className="mt-3 text-2xl font-extrabold text-text-primary">
                          {court.name}
                        </h2>
                        <p className="mt-2 leading-7 text-text-secondary">{court.description}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-sm text-text-secondary">Mulai dari</p>
                        <p className="text-xl font-extrabold text-primary">
                          {formatRupiah(court.pricePerHour)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {courtSlots.map((slot) => (
                        <span
                          key={`${slot.date}-${slot.startTime}`}
                          className={cn(
                            "rounded-xl border px-3 py-2 text-center text-xs font-semibold",
                            slot.status === "available" &&
                              "border-border bg-surface-soft text-text-primary",
                            slot.status === "pending" && "border-warning/40 bg-warning/10 text-warning",
                            slot.status === "confirmed" &&
                              "border-success/30 bg-success/10 text-success opacity-70",
                            slot.status === "unavailable" &&
                              "border-border bg-surface-soft text-muted opacity-60",
                          )}
                        >
                          {slot.startTime} - {slot.endTime}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-text-secondary">
                        {firstAvailableSlot
                          ? `Slot tercepat tersedia ${firstAvailableSlot.startTime} - ${firstAvailableSlot.endTime}`
                          : "Belum ada slot tersedia pada tanggal ini."}
                      </p>
                      <ButtonLink href={bookingHref} className={!firstAvailableSlot ? "opacity-60" : ""}>
                        Booking Lapangan
                        <ArrowRight className="h-4 w-4" />
                      </ButtonLink>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
