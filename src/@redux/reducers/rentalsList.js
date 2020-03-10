import {
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  GET_RENTAL_FAILURE,
} from '@redux/constants/rental';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RENTAL_REQUEST:
      return { ...state, isLoading: true };
    case GET_RENTAL_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case GET_RENTAL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
