import {
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  GET_RENTAL_FAILURE,
  SET_RENT_DETAIL_ID,
} from '@redux/constants/rental';
import { SIGN_OUT } from '@redux/constants/user';

const INITIAL_STATE = {
  data: {
    rentals: [],
  },
  loading: false,
  error: '',
  selectedId: null,
  listSharingRequest: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RENTAL_REQUEST:
      return { ...state, loading: true };
    case GET_RENTAL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_RENTAL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_RENT_DETAIL_ID:
      return { ...state, selectedId: action.payload };
    case SIGN_OUT:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
