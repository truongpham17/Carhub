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
