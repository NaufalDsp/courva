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

export function getAllAdminBookings() {
  return bookings;
}

export function getAdminDashboardSummary() {
  const activeCourts = courts.filter((court) => court.isActive).length;
  const activeVenues = venues.length;
  const todayBookings = bookings.filter((booking) => booking.bookingDate === "2026-06-24").length;
  const pendingPayment = bookings.filter((booking) => booking.status === "pending_payment").length;
  const waitingVerification = bookings.filter(
    (booking) => booking.status === "waiting_verification",
  ).length;
  const confirmed = bookings.filter((booking) => booking.status === "confirmed").length;
  const monthlyRevenue = bookings
    .filter((booking) => ["confirmed", "completed"].includes(booking.status))
    .reduce((total, booking) => total + booking.totalPrice, 0);

  return {
    activeCourts,
    activeVenues,
    todayBookings,
    pendingPayment,
    waitingVerification,
    confirmed,
    monthlyRevenue,
  };
}

export function getAdminChartData() {
  return [
    {
      label: "Sen",
      date: "22 Jun",
      bookings: 8,
      revenue: 1260000,
      occupancy: 58,
    },
    {
      label: "Sel",
      date: "23 Jun",
      bookings: 11,
      revenue: 1840000,
      occupancy: 66,
    },
    {
      label: "Rab",
      date: "24 Jun",
      bookings: 14,
      revenue: 2260000,
      occupancy: 74,
    },
    {
      label: "Kam",
      date: "25 Jun",
      bookings: 10,
      revenue: 1720000,
      occupancy: 62,
    },
    {
      label: "Jum",
      date: "26 Jun",
      bookings: 18,
      revenue: 3180000,
      occupancy: 86,
    },
    {
      label: "Sab",
      date: "27 Jun",
      bookings: 22,
      revenue: 3960000,
      occupancy: 91,
    },
    {
      label: "Min",
      date: "28 Jun",
      bookings: 16,
      revenue: 2740000,
      occupancy: 79,
    },
  ];
}

export function createWhatsAppUrl(phoneNumber: string, message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
