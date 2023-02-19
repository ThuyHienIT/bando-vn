type FacilityItem = {
  type: FacilityTypeEmum;
  name: string;
  description: string;
  amenities: string;
  operationHours: [string, string][]; // [[from, to], [from, to]]
  offDays: string[];
  address: string;
  phoneNumber: string;
  id: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BookingItem = {
  id: string;
  facilityId: string;
  from: string;
  to: string;
  userEmail: string;
  createdAt?: string;
  updatedAt?: string;
  facility?: FacilityItem;
};
