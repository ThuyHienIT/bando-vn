import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { RequsetError } from '../lib/errorClasses';
import { dbModel } from './db';
import { facilityModel } from './facility';

const DB_NAME = 'bookings.json';
const FACILIES_DB_NAME = 'facilities.json';

async function loadBookings() {
  const bookings = await dbModel.loadDb<BookingItem>(DB_NAME);
  const facilities = await dbModel.loadDb<FacilityItem>(FACILIES_DB_NAME);
  const facilitiesCol = facilities.reduce<Record<string, FacilityItem>>(
    (acc, fa) => ({ ...acc, [fa.id]: fa }),
    {}
  );

  const updatedBookings = bookings.map(({ facilityId, ...b }) => ({
    ...b,
    facility: facilitiesCol[facilityId],
  }));

  return updatedBookings;
}

async function insert(data: BookingItem) {
  const errMessage = await verifyPayload(data);
  if (errMessage) throw new RequsetError(400, errMessage);

  const inserted = await dbModel.insertOne<BookingItem>(DB_NAME, data);
  return inserted;
}

async function loadById<T>(id: string) {
  const bookings = await dbModel.loadDb<BookingItem>(DB_NAME);

  const data = bookings.find((i) => i.id === id);

  return data as T;
}

async function update(data: Partial<BookingItem>) {
  const errMessage = verifyFromTo(data.from, data.to);

  if (errMessage) throw new RequsetError(400, errMessage);
  if (!data.id) throw new RequsetError(400, 'Booking is not found');

  const booking = await loadById<BookingItem>(data.id);
  if (!booking) throw new RequsetError(400, 'Booking is not found');

  booking.from = data.from as string;
  booking.to = data.to as string;

  // insert to booking
  const inserted = await dbModel.update<BookingItem>(DB_NAME, booking);
  return inserted;
}

async function loadBookingsByUser(userEmail: string, type?: FacilityTypeEnum) {
  const bookings = await loadBookings();

  let userBookings = bookings.filter((i) => i.userEmail === userEmail);
  if (type) userBookings = userBookings.filter((i) => i.facility.type === type);

  return userBookings;
}

async function verifyPayload(payload: BookingItem) {
  const keyToVerify: Array<keyof BookingItem> = ['facilityId', 'from', 'to', 'userEmail'];
  const missingFields = keyToVerify.filter((i) => !Boolean(payload[i]));
  if (missingFields.length > 0) return `Missing fields: ${missingFields.join(', ')}`;

  const fromToErrMsg = verifyFromTo(payload.from, payload.to);
  if (fromToErrMsg) return fromToErrMsg;

  const facility = await facilityModel.loadById(payload.facilityId);
  if (!Boolean(facility)) return 'Facility cannot be found ' + payload.facilityId;

  return '';
}

function verifyFromTo(from: string = '', to: string = '') {
  if (!from || !to) return 'From or To is missing';

  // from and to validation
  const today = new Date();
  if (dayjs(from).isAfter(to)) return 'From should be before To';
  if (dayjs(from).isBefore(today) || dayjs(to).isBefore(today))
    return 'From and To should be after current time';

  return '';
}

export const bookingModel = { insert, update, loadBookingsByUser };
