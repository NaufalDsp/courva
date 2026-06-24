import { notFound } from "next/navigation";
import { BookingDetailPage } from "@/features/public-booking/components/booking-detail-page";
import { getBookingByCode, getCourtById, getVenueBySlug } from "@/domain/booking/queries";
import { venues } from "@/domain/booking/mock-data";

type BookingDetailRouteProps = {
  params: Promise<{
    bookingCode: string;
  }>;
};

export default async function BookingDetailRoute({ params }: BookingDetailRouteProps) {
  const { bookingCode } = await params;
  const booking = getBookingByCode(bookingCode);
  const court = booking ? getCourtById(booking.courtId) : undefined;
  const venueSlug = booking
    ? venues.find((venue) => venue.id === booking.venueId)?.slug
    : undefined;
  const venue = venueSlug ? getVenueBySlug(venueSlug) : undefined;

  if (!booking || !venue || !court) {
    notFound();
  }

  return <BookingDetailPage booking={booking} venue={venue} court={court} />;
}
