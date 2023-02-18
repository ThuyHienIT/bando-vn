import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { RequsetError } from '../lib/errorClasses';
import { dbModel } from './db';
import { facilityModel } from './facility';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_NAME = 'booking.json';

async function insert(data: BookingItem) {
  const errMessage = await verifyPayload(data);
  if (errMessage) throw new RequsetError(400, errMessage);

  // insert to booking
  const inserted = await dbModel.insertOne<BookingItem>(DB_NAME, data);
  return inserted;
}

async function verifyPayload(payload: BookingItem) {
  const keyToVerify: Array<keyof BookingItem> = ['facilityId', 'from', 'to', 'userEmail'];
  const missingFields = keyToVerify.filter((i) => !Boolean(payload[i]));
  if (missingFields.length > 0) return `Missing fields: ${missingFields.join(', ')}`;

  // from and to validation
  const today = new Date();
  if (dayjs(payload.from).isAfter(payload.to)) return 'From should be before To';
  if (dayjs(payload.from).isBefore(today) || dayjs(payload.to).isBefore(today))
    return 'From and To should be after current time';

  const facility = await facilityModel.loadById(payload.facilityId);
  if (!Boolean(facility)) return 'Facility cannot be found';

  return '';
}

export const bookingModel = { insert };
