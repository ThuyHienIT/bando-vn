import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/booking/update';
import { FacilityTypeEnum } from '@enums';
import { RequestError } from '@lib/errorClasses';
import { bookingModel } from '@models/booking';
import { dbModel } from '@models/db';

import { generateBooking, generateFacility } from '../../helpers';

const FAC_DB_NAME = 'facilities.json';
const BOOKING_DB_NAME = 'bookings.json';
let BOOKING_ID: string = '';
let FAC_ID: string = '';

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
  FAC_ID = fac1.id;
});

afterAll(async () => {
  await dbModel.clearDb(FAC_DB_NAME);
  await dbModel.clearDb(BOOKING_DB_NAME);
});

describe('/api/[booking]/[update]', () => {
  test('not found', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'invalid-id',
        from: '2022-04-23T23:30:00Z',
        to: '2022-05-23T24:00:00Z',
        facilityId: FAC_ID,
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking invalid data: from or to is in the past', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: BOOKING_ID,
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T11:00:00Z',
        facilityId: FAC_ID,
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking invalid data: from after to', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: BOOKING_ID,
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T08:00:00Z',
        facilityId: FAC_ID,
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('update booking valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: BOOKING_ID,
        from: '2023-04-23T10:30:00Z',
        to: '2023-04-23T11:00:00Z',
        facilityId: FAC_ID,
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({
      id: BOOKING_ID,
      from: '2023-04-23T10:30:00Z',
      to: '2023-04-23T11:00:00Z',
      facilityId: FAC_ID,
      userEmail: 'kqthang1505@gmail.com',
    });
  });

  test('throw error', async () => {
    jest
      .spyOn(bookingModel, 'update')
      .mockRejectedValueOnce(new RequestError(500, 'Hello'));

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: FacilityTypeEnum.Facility,
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(500);
  });
});
