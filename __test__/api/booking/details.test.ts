import { generateBooking, generateFacility } from '__test__/helpers';
import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/booking/[id]';
import { FacilityTypeEnum } from '@enums';
import { RequestError } from '@lib/errorClasses';
import { bookingModel } from '@models/booking';
import { dbModel } from '@models/db';

const FAC_DB_NAME = 'facilities.json';
const BOOKING_DB_NAME = 'bookings.json';
let BOOKING_ID: string = '';

beforeAll(async () => {
  const fac1: FacilityItem = generateFacility(FacilityTypeEnum.Room);

  await dbModel.prepareDb(FAC_DB_NAME);
  await dbModel.insertOne<FacilityItem>(FAC_DB_NAME, fac1);

  const booking1 = generateBooking(fac1.id);

  await dbModel.prepareDb(BOOKING_DB_NAME);
  const insertedBooking = await dbModel.insertOne<BookingItem>(
    BOOKING_DB_NAME,
    booking1
  );
  BOOKING_ID = insertedBooking.id;
});

afterAll(async () => {
  await dbModel.clearDb(FAC_DB_NAME);
  await dbModel.clearDb(BOOKING_DB_NAME);
});

describe('/api/booking/[id]', () => {
  test('missing id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '' },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(404);
  });

  test('not found', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: 'invalid-booking-id' },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(404);
  });

  test('found', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: BOOKING_ID },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({ id: BOOKING_ID });
  });

  test('throw error', async () => {
    jest
      .spyOn(bookingModel, 'loadById')
      .mockRejectedValueOnce(new RequestError(500, 'Hello'));

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: BOOKING_ID },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(500);
  });
});
