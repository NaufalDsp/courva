import { notFound } from "next/navigation";
import { PublicVenuePage } from "@/features/public-booking/components/public-venue-page";
import {
  getCourtsByVenueId,
  getSportsForVenue,
  getVenueBySlug,
} from "@/domain/booking/queries";

type VenuePageProps = {
  params: Promise<{
    venueSlug: string;
  }>;
};

export default async function VenuePage({ params }: VenuePageProps) {
  const { venueSlug } = await params;
  const venue = getVenueBySlug(venueSlug);

  if (!venue) {
    notFound();
  }

  return (
    <PublicVenuePage
      venue={venue}
      courts={getCourtsByVenueId(venue.id)}
      sports={getSportsForVenue(venue.id)}
    />
  );
}
