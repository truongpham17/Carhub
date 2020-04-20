import {
  GET_RENTAL_ITEM_FAILURE,
  GET_RENTAL_ITEM_REQUEST,
  GET_RENTAL_ITEM_SUCCESS,
} from '@redux/constants/rental';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RENTAL_ITEM_REQUEST:
      return { ...state, loading: true };
    case GET_RENTAL_ITEM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_RENTAL_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
