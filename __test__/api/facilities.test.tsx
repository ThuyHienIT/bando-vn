import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/facilities';
import { facilityModel } from '@models/facility';
import { FacilityTypeEnum } from '@enums';

describe('/api/[facilities]', () => {
  test('returns all facilities', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handleRoute(req, res);
    const data = await facilityModel.loadFacilities();

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });

  test('returns rooms only', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: FacilityTypeEnum.Room,
      },
    });

    await handleRoute(req, res);
    const data = await facilityModel.loadFacilities(FacilityTypeEnum.Room);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });

  test('returns other facilities only', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        type: FacilityTypeEnum.Facility,
      },
    });

    await handleRoute(req, res);
    const data = await facilityModel.loadFacilities(FacilityTypeEnum.Facility);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(data);
  });
});
