import {
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  GET_RENTAL_FAILURE,
  SET_RENT_DETAIL_ID,
} from '@redux/constants/rental';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: '',
  selectedId: null,
  listSharingRequest: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RENTAL_REQUEST:
      return { ...state, isLoading: true };
    case GET_RENTAL_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case GET_RENTAL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SET_RENT_DETAIL_ID:
      return { ...state, selectedId: action.payload };
    default:
      return { ...state };
  }
};
