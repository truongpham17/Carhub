import {
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
  SET_RENTAL_SEARCH,
  SET_SELECTED_CAR,
} from '../constants/car';

const INITIAL_STATE = {
  data: [],
  total: 0,
  rentalSearch: {},
  selectedCar: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAR_REQUEST:
      return { ...state, loading: true };
    case GET_CAR_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.cars],
        total: action.payload.total,
        loading: false,
      };
    case GET_CAR_FAILURE:
      return { ...state, loading: false };
    case SET_RENTAL_SEARCH:
      return { ...state, rentalSearch: action.payload };
    case SET_SELECTED_CAR:
      return {
        ...state,
        selectedCar: action.payload,
      };
    default:
      return { ...state };
  }
};
