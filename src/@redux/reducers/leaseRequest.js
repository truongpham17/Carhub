const INITIAL_STATE = {
  review: [
    {
      label: 'Car name',
      content: 'Audi V8 2016',
    },
    {
      label: 'Car status',
      content: '4 years, 1000 kilometers',
    },
    {
      label: 'From date',
      content: '12/3/2020',
    },
    {
      label: 'To date',
      content: '12/4/2020',
    },
    {
      label: 'Duration',
      content: '30 days',
    },
    {
      label: 'Customer name',
      content: 'Cuong Thai',
    },
    {
      label: 'Phone',
      content: '0909498577',
    },
    {
      label: 'Hub location',
      content: '112 Thanh Thai Quan 10',
    },
    {
      label: 'Cost',
      content: '$2020',
    },
    {
      label: 'Card number',
      content: '12345678',
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
