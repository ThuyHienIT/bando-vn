import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/user/bookings';
import { FacilityTypeEnum } from '@enums';
import { RequestError } from '@lib/errorClasses';
import { dbModel } from '@models/db';
import { userModel } from '@models/user';

import { generateBooking, generateFacility } from '../../helpers';

const FAC_DB_NAME = 'facilities.json';
const BOOKING_DB_NAME = 'bookings.json';

describe('/api/[user]/bookings', () => {
  beforeAll(async () => {
    await dbModel.clearDb(FAC_DB_NAME);
    await dbModel.clearDb(BOOKING_DB_NAME);

    const fac1: FacilityItem = generateFacility(FacilityTypeEnum.Room);
    const fac2: FacilityItem = generateFacility(FacilityTypeEnum.Facility);

    await dbModel.prepareDb(FAC_DB_NAME);
    const insertedFac1 = await dbModel.insertOne<FacilityItem>(
      FAC_DB_NAME,
      fac1
    );
    const insertedFac2 = await dbModel.insertOne<FacilityItem>(
      FAC_DB_NAME,
      fac2
    );

    const booking1 = generateBooking(insertedFac1.id);
    const booking2 = generateBooking(insertedFac2.id);

    await dbModel.prepareDb(BOOKING_DB_NAME);
    await dbModel.insertOne<BookingItem>(BOOKING_DB_NAME, booking1);
    await dbModel.insertOne<BookingItem>(BOOKING_DB_NAME, booking2);
  });

  afterAll(async () => {
    await dbModel.clearDb(FAC_DB_NAME);
    await dbModel.clearDb(BOOKING_DB_NAME);
  });

  test('return 404 if cannot found user', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        email: 'test@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([]);
  });

  test('return all bookings that belong to the user', async () => {
    const userEmail = 'kqthang1505@gmail.com';
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        email: userEmail,
      },
    });

    await handleRoute(req, res);
    const data = await userModel.loadBookings(userEmail);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });

  test('return all rooms booking of the user', async () => {
    const userEmail = 'kqthang1505@gmail.com';
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        email: userEmail,
        type: FacilityTypeEnum.Room,
      },
    });

    await handleRoute(req, res);
    const data = await userModel.loadBookings(userEmail, FacilityTypeEnum.Room);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });

  test('return all facilities booking of the user', async () => {
    const userEmail = 'kqthang1505@gmail.com';
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        email: userEmail,
        type: FacilityTypeEnum.Facility,
      },
    });

    await handleRoute(req, res);
    const data = await userModel.loadBookings(
      userEmail,
      FacilityTypeEnum.Facility
    );

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });

  test('mock throwing error', async () => {
    jest
      .spyOn(userModel, 'loadBookings')
      .mockRejectedValueOnce(new RequestError(500, 'Hello'));

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        email: 'test@gmail.com',
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: 'Something went wrong. Please try again later.',
    });
  });
});
