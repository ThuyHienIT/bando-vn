import { notFound } from 'next/navigation';

import { bookingModel } from '@models/booking';
import { facilityModel } from '@models/facility';

import { PageContent } from './PageContent';

export default async function Facility(props: { params: { id: string } }) {
  const facilityDetails = await facilityModel.loadById(props.params.id);

  const occupiedSlots = (await bookingModel.loadByFacilityId(
    props.params.id
  )) as BookingItem[];

  if (!facilityDetails) {
    notFound();
  }

  return <PageContent data={facilityDetails} occupiedSlots={occupiedSlots} />;
}

export const metadata = {
  title: 'Details',
};
