const INITIAL_STATE = {
  id: '1',
  carData: {
    name: 'Audi V4',
    image:
      'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
    type: 'Exclusive Car',
    rating: 5,
    pricePerDay: '60$/day',
    total: '600$',
    cancellationPolicy: 'Free cancellation',
    libertyMutial: ['4 door', 'Supercar', 'High-end quality'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
  },
  tripData: {
    startDate: '10/10/2010',
    endDate: '20/10/2010',
    pickupLocation: 'Nha cua Truong',
    returnLocation: 'Nha cua Tri',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
