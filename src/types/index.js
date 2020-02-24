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
    dateOfHire: Date,
    duration: String,
    pricePerDay: Number,
    total: Number,
    store: String,
    daysleft: Number,
    status: 'Current' | 'Pending',
  },
};
