import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/facilities';
import { facilityModel } from '@models/facility';

describe('/api/[facilities]', () => {
  test('returns correct data', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handleRoute(req, res);
    const data = await facilityModel.loadFacilities();

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });
});
