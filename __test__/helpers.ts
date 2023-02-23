import { randomUUID } from 'crypto';

export function generateFacility(
  type: FacilityTypeEnum,
  name: string = 'Venus Meeting Room'
): FacilityItem {
  return {
    phoneNumber: '24709620',
    id: randomUUID(),
    address: '1 JALAN KILANG,S159402',
    description:
      'Current majority suffer hair born.\nReport daughter government item keep political cut. Customer apply couple. Data happen hear must almost.',
    name,
    amenities:
      'Friend ok nation international line another within.\nUp rate when sometimes probably measure with. Product town sort. Include even alone certain.',
    type: type,
    operationHours: ['8:00', '19:00'],
    offDays: ['2022-04-23T23:18:53Z'],
    thumbnail: 'https://picsum.photos/400/200',
  };
}

export function generateBooking(facilityId: string): BookingItem {
  return {
    facilityId: facilityId,
    from: '2023-04-23T10:30:00Z',
    to: '2023-04-23T11:00:00Z',
    userEmail: 'kqthang1505@gmail.com',
    id: randomUUID(),
    createdAt: '2023-02-18T22:25:56+08:00',
    updatedAt: '2023-02-18T22:25:56+08:00',
  };
}
