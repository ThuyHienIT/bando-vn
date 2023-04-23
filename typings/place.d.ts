type PlaceType = {
  id: string;
  name: string;
  long: number;
  lat: number;
  content: string;
};

type CompanyType = {
  type: string;
  id: string;
  name: string;
  photos: string[];
  address: string;
  tel: string;
  synopsis: string;
  url: string;
  created_at: string;
  updated_at: string;
  geometry: string;
};

type TourDetailsType = {
  id: string;
  name: string;
  photos: string[];
  start_date: string;
  end_date: string;
  price: string;
  description: string;
  created_at: string;
  updated_at: string;
  company_id?: string;
  company?: CompanyType;
};
type TouristAgencyType = CompanyType & {
  tours: TourDetailsType[];
};
type TravelCompanyType = CompanyType & {
  agencies: TouristAgencyType[];
};

type SpecialtyType = CompanyType;
type AttractionType = CompanyType & {
  specialties: SpecialtyType[];
};

type ShoppingMallType = CompanyType;
type RestaurantType = CompanyType;
type ResortType = CompanyType;
type HotelType = CompanyType;
type DestinationType = CompanyType;

type PhotoType = {
  id: string;
  company_id?: string;
  tour_id?: string;
  photo_url: string;
  created_at: string;
  updated_at: string;
};
