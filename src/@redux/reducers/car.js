import {
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
  SET_RENTAL_SEARCH,
  SET_SELECTED_CAR,
  SET_PICK_OFF_HUB,
  ADD_RENTAL_REQUEST,
  ADD_RENTAL_SUCCESS,
  ADD_RENTAL_FAILURE,
  SEARCH_CAR_MODEL_FAILURE,
  SEARCH_CAR_MODEL_REQUEST,
  SEARCH_CAR_MODEL_SUCCESS,
} from '../constants/car';

const INITIAL_STATE = {
  data: [],
  total: 0,
  rentalSearch: {},
  selectedCar: null,
  loading: false,
  pickOffHub: {},
  rentalRequest: null,
  carModels: [],
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
    case ADD_RENTAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_RENTAL_SUCCESS:
      return {
        ...state,
        rentalRequest: action.payload,
        loading: false,
      };
    case ADD_RENTAL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case SET_PICK_OFF_HUB:
      return { ...state, pickOffHub: action.payload };

    case SEARCH_CAR_MODEL_REQUEST:
      return { ...state, loading: true };
    case SEARCH_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carModels: action.payload,
        loading: false,
      };
    case SEARCH_CAR_MODEL_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
