import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { RequsetError } from '../lib/errorClasses';
import { bookingModel } from './booking';
import { dbModel } from './db';

const DB_DIR = path.join(process.cwd(), 'db');
const DB_NAME = 'facilities.json';

async function loadFacilities(type?: FacilityTypeEnum) {
  const data = await dbModel.loadDb<FacilityItem>(DB_NAME);

  if (type) return data.filter((i) => i.type === type);

  return data;
}

async function loadById(id?: string) {
  const data = await dbModel.loadDb<FacilityItem>(DB_NAME);
  if (!id) return null;

  return data.find((i) => i.id === id);
}

async function book(data: BookingItem) {
  // insert to booking
  return await bookingModel.insert(data);
}

export const facilityModel = { loadFacilities, loadById, book };
