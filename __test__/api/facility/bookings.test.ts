import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/facility/bookings/[id]';
import { FacilityTypeEnum } from '@enums';
import { dbModel } from '@models/db';

import { generateFacility } from '../../helpers';

const DB_FACILITY_NAME = 'facilities.json';
const DB_BOOKING_NAME = 'bookings.json';
let FAC_ID = '';

describe('/api/facility/bookings/[id]', () => {
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

  test('missing id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {},
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(404);
  });

  test('not found', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: 'invalid-facility-id' },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([]);
  });

  test('found', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { id: FAC_ID },
    });

    await handleRoute(req, res);
    expect(res._getStatusCode()).toBe(200);

    const data: BookingItem[] = JSON.parse(res._getData());
    data.forEach((b) => {
      expect(b.facility?.id).toBe(FAC_ID);
    });
  });
});
