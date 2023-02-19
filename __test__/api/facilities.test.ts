import { createMocks } from 'node-mocks-http';
import handleRoute from '@apis/facilities';
import { facilityModel } from '@models/facility';
import { FacilityTypeEnum } from '@enums';
import { dbModel } from '@models/db';

const DB_NAME = 'facilities.json';
beforeAll(async () => {
  await dbModel.prepareDb(DB_NAME);

  await dbModel.insertOne<FacilityItem>(DB_NAME, {
    phoneNumber: '24709620',
    id: 'b29e4210-60d8-45a2-82a1-08cacb745990',
    address: '1 JALAN KILANG,S159402',
    description:
      'Current majority suffer hair born.\nReport daughter government item keep political cut. Customer apply couple. Data happen hear must almost.',
    name: 'Venus Meeting Room',
    amenities:
      'Friend ok nation international line another within.\nUp rate when sometimes probably measure with. Product town sort. Include even alone certain.',
    type: 'room',
    operationHours: [['8:00', '19:00']],
    offDays: ['2022-04-23T23:18:53Z'],
  });

  await dbModel.insertOne<FacilityItem>(DB_NAME, {
    phoneNumber: '24709620',
    id: 'b29e4210-60d8-45a2-82a1-08cacb745990',
    address: '1 JALAN KILANG,S159402',
    description:
      'Current majority suffer hair born.\nReport daughter government item keep political cut. Customer apply couple. Data happen hear must almost.',
    name: 'East Coast BBQ Pit',
    amenities:
      'Friend ok nation international line another within.\nUp rate when sometimes probably measure with. Product town sort. Include even alone certain.',
    type: 'facility',
    operationHours: [['8:00', '19:00']],
    offDays: ['2022-04-23T23:18:53Z'],
  });
});

afterAll(async () => {
  await dbModel.clearDb(DB_NAME);
});

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
