const INITIAL_STATE = {
  loading: false,
  users: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return { ...state, loading: true };
    case 'GET_USER_SUCCESS':
      return { ...state, users: action.payload, loading: false };
    case 'GET_USER_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
