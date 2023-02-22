import { errorHandler } from 'app/lib/error-handler';
import { notFound } from 'next/navigation';

import { PageContent } from './PageContent';

export default async function Facility(props: { params: { id: string } }) {
  const facilityDetails = await errorHandler<FacilityItem>(async () => {
    const resp = await fetch(
      `http://localhost:3000/api/facility/${props.params.id}`
    );
    return await resp.json();
  });

  const occupiedSlots = await errorHandler<[string, string][]>(async () => {
    const resp = await fetch(
      `http://localhost:3000/api/facility/bookings/${props.params.id}`
    );
    const bookings: BookingItem[] = await resp.json();

    return bookings.map((b) => [b.from, b.to]);
  });

  const occupiedSlots2 = await errorHandler<BookingItem[]>(async () => {
    const resp = await fetch(
      `http://localhost:3000/api/facility/bookings/${props.params.id}`
    );
    const bookings: BookingItem[] = await resp.json();

    return bookings;
  });

  if (!facilityDetails) {
    notFound();
  }

  return (
    <PageContent
      data={facilityDetails}
      occupiedSlots={occupiedSlots}
      occupiedSlots2={occupiedSlots2}
    />
  );
}
