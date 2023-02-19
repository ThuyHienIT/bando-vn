import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { RequsetError } from '../lib/errorClasses';
import { bookingModel } from './booking';

async function loadBookings(userEmail: string, type?: FacilityTypeEnum) {
  const bookings = await bookingModel.loadBookingsByUser(userEmail, type);

  return bookings;
}

export const userModel = { loadBookings };
