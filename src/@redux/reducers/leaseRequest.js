import {
  GET_VIN_CAR_REQUEST,
  GET_VIN_CAR_SUCCESS,
  GET_VIN_CAR_FAILURE,
  ADD_LEASE_REQUEST,
  ADD_LEASE_SUCCESS,
  ADD_LEASE_FAILURE,
  GET_HOST_HUB_INFO_SUCCESS,
  GET_LEASE_CAR_FAILURE,
  GET_LEASE_CAR_SUCCESS,
  GET_LEASE_CAR_REQUEST,
} from '../actions/lease';

const INITIAL_STATE = {
  car: {},
  list: [],
  review: {},
  error: null,
  loading: false,
  startDate: null,
  endDate: null,
  cardNumber: null,
  selectedHub: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VIN_CAR_SUCCESS:
      return { ...state, car: action.payload, loading: false };
    case GET_VIN_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_VIN_CAR_REQUEST:
      return { ...state, loading: true };
    case GET_HOST_HUB_INFO_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case ADD_LEASE_SUCCESS:
      return {
        loading: false,
      };
    case ADD_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_CAR_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case GET_LEASE_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_LEASE_CAR_REQUEST:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};
