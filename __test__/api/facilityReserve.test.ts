import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/facility/reserve';
import { dbModel } from '@models/db';
import { generateFacility } from '../helpers';
import { FacilityTypeEnum } from '@enums';

const DB_NAME = 'facilities.json';
let FAC_ID = '';

describe('/api/[facility]/[reserve]', () => {
  beforeAll(async () => {
    const fac = generateFacility(FacilityTypeEnum.Room, 'Facility Reserve');
    FAC_ID = fac.id;

    await dbModel.prepareDb(DB_NAME);
    await dbModel.insertOne<FacilityItem>(DB_NAME, fac);
  });

  afterAll(async () => {
    await dbModel.clearDb(DB_NAME);
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
        facilityId: '11825af9-95bb-453e-9f31-2796598123b5',
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
        facilityId: '11825af9-95bb-453e-9f31-2796598123b5',
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
});
