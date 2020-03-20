export type NavigationType = {
  pop: () => void,
  navigate: (screenName: string) => void,
  goBack: () => void,
};
export type RentDetailType = {
  leaser: UserType,
  startDate: Date,
  endDate: Date,
  price: Number,
  totalCost: Number,
  description: String,
  _id: String,
  carModel: CarModel,
  pickupHub: HubType,
  status: 'UPCOMING' | 'CURRENT' | 'OVERDUE' | 'SHARING' | 'SHARED' | 'PAST',
  type: String,
  __v: 0,
};

export type LeaseDetailType = {
  _id: String,
  customer: UserType,
  car: CarType,
  startDate: Date,
  endDate: Date,
  hub: HubType,
  price: Number,
  totalEarn: Number,
  status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'DECLINED'
    | 'AVAILABLE'
    | 'HIRING'
    | 'WAIT_TO_RETURN'
    | 'PAST',
};

export type RentailCarDetailType = {
  id: String,
  carData: {
    name: SVGAnimatedString,
    image: String,
    type: String,
    rating: 5,
    pricePerDay: String,
    total: String,
    cancellationPolicy: String,
    libertyMutial: [String],
    description: String,
  },
  tripData: {
    startDate: Date,
    endDate: Date,
    pickupLocation: String,
    returnLocation: String,
  },
};

export type UserType = {
  _id: String,
  username: string,
  token: string,
  role: 'CUSTOMER' | 'EMPLOYEE' | 'MANAGER',
  isActive: Boolean,
  license: LicenseType,
  fullName: string,
  avatar: String,
  dateOfBirth: Date,
  email: String,
  phone: String,
  account: String,
};

export type SharingType = {
  _id: String,
  geometry: {
    lat: Number,
    lng: Number,
  },
  location?: String,
  distance?: number,
  rental: RentDetailType,
  totalCost: Number,
};

export type GeoLocationType = {
  geometry: {
    lat: Number,
    lng: Number,
  },
  address: String,
};

export type HubType = {
  isActive: Boolean,
  _id: String,
  name: String,
  address: String,
  geometry: {
    lat: Number,
    lng: Number,
  },
  description: string,
  distance?: number,
};

export type CarType = {
  isActive: Boolean,
  _id: String,
  carModel: CarModel,
  customer: String,
  hub: HubType,
  currentHub: HubType,
  images: [String],
  description: String,
  odometer: Number,
  price: Number,
  feature: String,
  VIN: String,
  usingYears: Number,
  valueData: [{ value: String }],
};

export type LicenseType = {
  number: string,
  fullname: string,
  dateOfBirth: Date,
  nationality: string,
  address: string,
  rank: string,
  expires: Date,
  image: string,
  isActive: boolean,
  // numb
};

export type CarModel = {
  fuelType: String,
  name: String,
  numberOfSeat: Number,
  type: String,
  images: [String],
  description: String,
  price: number,
  _id: String,
};
