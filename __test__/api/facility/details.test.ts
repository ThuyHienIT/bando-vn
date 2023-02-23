import { createMocks } from 'node-mocks-http';

import handleRoute from '@apis/facility/[id]';
import { dbModel } from '@models/db';

const DB_NAME = 'facilities.json';
const FAC_DETAILS: FacilityItem = {
  phoneNumber: '24709620',
  id: 'b29e4210-60d8-45a2-82a1-08cacb745990',
  address: '1 JALAN KILANG,S159402',
  description:
    'Current majority suffer hair born.\nReport daughter government item keep political cut. Customer apply couple. Data happen hear must almost.',
  name: 'Venus Meeting Room',
  amenities:
    'Friend ok nation international line another within.\nUp rate when sometimes probably measure with. Product town sort. Include even alone certain.',
  type: 'room',
  operationHours: ['8:00', '19:00'],
  offDays: ['2022-04-23T23:18:53Z'],
};

beforeAll(async () => {
  await dbModel.prepareDb(DB_NAME);
  await dbModel.insertOne<FacilityItem>(DB_NAME, FAC_DETAILS);
});

afterAll(async () => {
  await dbModel.clearDb(DB_NAME);
});

describe('/api/[facility]/[id]', () => {
  test('not found', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(404);
  });

  test('found, return details', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: FAC_DETAILS.id,
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject(FAC_DETAILS);
  });
});
