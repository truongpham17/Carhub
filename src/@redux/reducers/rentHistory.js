const INITIAL_STATE = {
  data: [
    {
      id: '1',
      data: {
        image:
          'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        name: 'Camry 2019',
        type: 'Exclusive Car',
        dateOfHire: 'Mar 20, 2020',
        dateDropOff: 'Apr 20, 2020',
        duration: '30 days',
        pricePerDay: '$30',
        total: '$900',
        store: 'Nha cua Truong',
        isSharing: false,
        daysleft: 10,
        status: 'Current',
      },
    },
    {
      id: '2',
      data: {
        image:
          'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        name: 'Camry 2019',
        type: 'Exclusive Car',
        dateOfHire: 'Mar 20, 2020',
        dateDropOff: 'Apr 20, 2020',
        duration: '30 days',
        pricePerDay: '$30',
        total: '$900',
        store: 'Nha cua Truong',
        isSharing: false,
        daysleft: 3,
        status: 'Overdue',
      },
    },
    {
      id: '3',
      data: {
        image:
          'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        name: 'Camry 2019',
        type: 'Exclusive Car',
        dateOfHire: 'Mar 20, 2020',
        dateDropOff: 'Apr 20, 2020',
        duration: '30 days',
        pricePerDay: '$30',
        total: '$900',
        store: 'Nha cua Truong',
        isSharing: false,
        daysleft: 10,
        status: 'Waiting',
      },
    },
    {
      id: '4',
      data: {
        image:
          'https://www.kindpng.com/picc/m/184-1840091_mclaren-logo-clipart-png-transparent-png.png',
        name: 'Camry 2019',
        type: 'Exclusive Car',
        dateOfHire: 'Mar 20, 2020',
        dateDropOff: 'Apr 20, 2020',
        duration: '30 days',
        pricePerDay: '$30',
        total: '$900',
        store: 'Nha cua Truong',
        isSharing: true,
        daysleft: 10,
        status: 'Current',
      },
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
