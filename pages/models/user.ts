

import { bookingModel } from './booking';

async function loadBookings(userEmail: string, type?: FacilityTypeEnum) {
  const bookings = await bookingModel.loadByUser(userEmail, type);

  return bookings;
}

export const userModel = { loadBookings };
