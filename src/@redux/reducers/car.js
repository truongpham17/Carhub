import { SIGN_OUT } from '@redux/constants/user';
import {
  GET_CAR_LIST_FAILURE,
  GET_CAR_LIST_REQUEST,
  GET_CAR_LIST_SUCCESS,
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
  rentalSearch: {
    startLocation: {
      geometry: {
        lat: 10.848269,
        lng: 106.7750287,
      },
      address:
        '23 Lê Văn Việt, Hiep Phu, District 9, Ho Chi Minh City, Vietnam',
    },
    endLocation: {
      geometry: {
        lat: 10.848269,
        lng: 106.7750287,
      },
      address:
        '23 Lê Văn Việt, Hiep Phu, District 9, Ho Chi Minh City, Vietnam',
    },
    // startLocation: {},
    // endLocation: {},
  },
  selectedCar: null,
  loading: false,
  pickOffHub: {},
  rentalRequest: null,
  carModels: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAR_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_CAR_LIST_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.cars],
        total: action.payload.total,
        loading: false,
      };
    case GET_CAR_LIST_FAILURE:
      return { ...state, loading: false };
    case SET_RENTAL_SEARCH:
      return {
        ...state,
        rentalSearch: { ...state.rentalSearch, ...action.payload },
      };
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
    case SIGN_OUT:
      return { ...INITIAL_STATE };

    default:
      return { ...state };
  }
};
