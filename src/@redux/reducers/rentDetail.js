const INITIAL_STATE = {
  id: '1',
  data: {
    image:
      'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
    name: 'Camry 2019',
    dateOfHire: '12/03/2020',
    duration: '30 days',
    pricePerDay: '$30',
    total: '$900',
    store: 'Nha cua Truong',
    daysleft: '10',
    status: 'Current',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
