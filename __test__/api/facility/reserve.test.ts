import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/facility/reserve';
import { FacilityTypeEnum } from '@enums';
import { RequestError } from '@lib/errorClasses';
import { dbModel } from '@models/db';
import { facilityModel } from '@models/facility';

import { generateFacility } from '../../helpers';

const DB_FACILITY_NAME = 'facilities.json';
const DB_BOOKING_NAME = 'bookings.json';
let FAC_ID = '';

describe('/api/[facility]/[reserve]', () => {
  beforeAll(async () => {
    const fac = generateFacility(FacilityTypeEnum.Room, 'Facility Reserve');
    FAC_ID = fac.id;

    await dbModel.prepareDb(DB_BOOKING_NAME);
    await dbModel.prepareDb(DB_FACILITY_NAME);
    await dbModel.insertOne<FacilityItem>(DB_FACILITY_NAME, fac);
  });

  afterAll(async () => {
    await dbModel.clearDb(DB_FACILITY_NAME);
    await dbModel.clearDb(DB_BOOKING_NAME);
  });

  test('submit missing data: userEmail is empty', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: 'invalid-facility-id',
        from: '2022-04-23T23:30:00Z',
        to: '2022-05-23T24:00:00Z',
        userEmail: '',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('submit invalid data: facility is not found', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: 'invalid-facility-id',
        from: '2022-04-23T23:30:00Z',
        to: '2022-05-23T24:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('submit invalid data: from  or to is in the past', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T11:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('submit invalid data: from after to', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2022-04-23T10:30:00Z',
        to: '2022-04-23T08:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('submit valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T10:30:00Z',
        to: '2023-04-23T11:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);

    const updatedData = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);

    expect(updatedData).toMatchObject({
      facilityId: FAC_ID,
      from: '2023-04-23T10:30:00Z',
      to: '2023-04-23T11:00:00Z',
      userEmail: 'kqthang1505@gmail.com',
    });
  });

  test('throw error', async () => {
    jest
      .spyOn(facilityModel, 'book')
      .mockRejectedValueOnce(new RequestError(500, 'Hello'));

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: FAC_ID },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(500);
  });
});

describe('update booking valid data: occupied slot', () => {
  beforeAll(async () => {
    const fac = generateFacility(FacilityTypeEnum.Room, 'Facility Reserve');
    FAC_ID = fac.id;

    await dbModel.prepareDb(DB_BOOKING_NAME);
    await dbModel.prepareDb(DB_FACILITY_NAME);
    await dbModel.insertOne<FacilityItem>(DB_FACILITY_NAME, fac);
  });

  afterAll(async () => {
    await dbModel.clearDb(DB_FACILITY_NAME);
    await dbModel.clearDb(DB_BOOKING_NAME);
  });

  test('prepare for same slot', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T10:30:00Z',
        to: '2023-04-23T11:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
  });

  test('same slot', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T10:30:00Z',
        to: '2023-04-23T11:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('to date is in between', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T09:30:00Z',
        to: '2023-04-23T10:40:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('from date is in between', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T10:40:00Z',
        to: '2023-04-23T12:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('cover', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T09:00:00Z',
        to: '2023-04-23T12:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('within', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T10:40:00Z',
        to: '2023-04-23T10:50:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  test('valid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        facilityId: FAC_ID,
        from: '2023-04-23T13:00:00Z',
        to: '2023-04-23T14:00:00Z',
        userEmail: 'kqthang1505@gmail.com',
      },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
