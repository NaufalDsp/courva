import { bookings, courts, paymentInstructions, slots, sports, venues } from "./mock-data";

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getVenueBySlug(slug: string) {
  return venues.find((venue) => venue.slug === slug);
}

export function getCourtsByVenueId(venueId: string) {
  return courts.filter((court) => court.venueId === venueId && court.isActive);
}

export function getCourtById(courtId: string) {
  return courts.find((court) => court.id === courtId);
}

export function getSportById(sportId: string) {
  return sports.find((sport) => sport.id === sportId);
}

export function getSportsForVenue(venueId: string) {
  const sportIds = new Set(getCourtsByVenueId(venueId).map((court) => court.sportId));
  return sports.filter((sport) => sportIds.has(sport.id));
}

export function getSlotsForCourt(courtId: string, date: string) {
  return slots.filter((slot) => slot.courtId === courtId && slot.date === date);
}

export function getFirstAvailableSlot(courtId: string, date: string) {
  return getSlotsForCourt(courtId, date).find((slot) => slot.status === "available");
}

export function getBookingByCode(bookingCode: string) {
  return bookings.find((booking) => booking.bookingCode === bookingCode);
}

export function getPaymentInstructions() {
  return paymentInstructions;
}

export function createWhatsAppUrl(phoneNumber: string, message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
