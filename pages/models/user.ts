

import { bookingModel } from './booking';

async function loadBookings(userEmail: string, type?: FacilityTypeEnum) {
  const bookings = await bookingModel.loadBookingsByUser(userEmail, type);

  return bookings;
}

export const userModel = { loadBookings };
