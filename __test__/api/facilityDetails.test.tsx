import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/facility/[id]';
import { facilityModel } from '@models/facility';

describe('/api/[facility]/[id]', () => {
  test('not found', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(404);
  });

  test('found, return details', async () => {
    const facilities = await facilityModel.loadFacilities();
    const facility = facilities[0];

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: facility.id,
      },
    });

    await handleRoute(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(facility);
  });
});
