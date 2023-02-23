import { createMocks } from 'node-mocks-http';

import getBookingByIdRoute from '@apis/booking/[id]';
import cancelBookingRoute from '@apis/booking/cancel/[id]';
import { FacilityTypeEnum } from '@enums';
import { dbModel } from '@models/db';

import { generateBooking, generateFacility } from '../../helpers';

const FAC_DB_NAME = 'facilities.json';
const BOOKING_DB_NAME = 'bookings.json';
let BOOKING_ID: string = '';

beforeAll(async () => {
  await dbModel.prepareDb(FAC_DB_NAME);
  await dbModel.prepareDb(BOOKING_DB_NAME);

  const fac: FacilityItem = generateFacility(FacilityTypeEnum.Room);
  await dbModel.insertOne<FacilityItem>(FAC_DB_NAME, fac);

  const booking = generateBooking(fac.id);
  const insertedBooking = await dbModel.insertOne<BookingItem>(
    BOOKING_DB_NAME,
    booking
  );

  BOOKING_ID = insertedBooking.id;
});

afterAll(async () => {
  await dbModel.clearDb(FAC_DB_NAME);
  await dbModel.clearDb(BOOKING_DB_NAME);
});

describe('/api/booking/cancel', () => {
  test('invalid booking id -> not found', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: 'invalid-booking-id' },
    });

    await cancelBookingRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('found a booking to cancel', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: BOOKING_ID },
    });

    await getBookingByIdRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
  });

  test('cancel successfully', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: BOOKING_ID },
    });

    await cancelBookingRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
  });

  test('cannot found that booking', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: BOOKING_ID },
    });

    await getBookingByIdRoute(req, res);
    expect(res._getStatusCode()).toBe(404);
  });
});
