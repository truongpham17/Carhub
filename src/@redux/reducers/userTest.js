const INITIAL_STATE = {
  loading: false,
  users: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    }
    case 'GET_USER_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
