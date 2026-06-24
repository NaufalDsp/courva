import { notFound } from "next/navigation";
import { BookingFormPage } from "@/features/public-booking/components/booking-form-page";
import { getCourtById, getVenueBySlug } from "@/domain/booking/queries";

type BookingFormRouteProps = {
  params: Promise<{
    venueSlug: string;
    courtId: string;
  }>;
  searchParams: Promise<{
    date?: string;
    start?: string;
    end?: string;
  }>;
};

export default async function BookingFormRoute({ params, searchParams }: BookingFormRouteProps) {
  const [{ venueSlug, courtId }, query] = await Promise.all([params, searchParams]);
  const venue = getVenueBySlug(venueSlug);
  const court = getCourtById(courtId);

  if (!venue || !court || court.venueId !== venue.id) {
    notFound();
  }

  return (
    <BookingFormPage
      venue={venue}
      court={court}
      initialDate={query.date}
      initialStart={query.start}
      initialEnd={query.end}
    />
  );
}
