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
