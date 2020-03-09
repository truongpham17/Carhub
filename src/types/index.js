export type NavigationType = {
  pop: () => void,
  navigate: (screenName: string) => void,
  goBack: () => void,
};
export type RentDetailType = {
  id: String,
  data: {
    image: String,
    name: String,
    type: String,
    dateOfHire: Date,
    dateDropOff: Date,
    duration: String,
    pricePerDay: Number,
    total: Number,
    store: String,
    daysleft: Number,
    isSharing: Boolean,
    status: 'Current' | 'Waiting' | 'Overdue',
  },
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
  username: string,
  token: string,
  role: 'CUSTOMER' | 'EMPLOYEE' | 'MANAGER',
  isActive: Boolean,
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
};

export type CarModel = {
  fuelType: String,
  name: String,
  numberOfSeat: Number,
  numberOfBag: Number,
  type: String,
};
