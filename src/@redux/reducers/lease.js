import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_PREVIOUS_CAR_LIST_SUCCESS,
  GET_PREVIOUS_CAR_LIST_FAILURE,
  GET_CAR_BY_VIN_SUCCESS,
  GET_CAR_BY_VIN_FAILURE,
  ADD_HOST_HUB_INFO_SUCCESS,
  ADD_LEASE_SUCCESS,
  ADD_LEASE_FAILURE,
} from '@redux/constants/lease';

const INITIAL_STATE = {
  car: {},
  listPreviousCar: [],
  error: null,
  loading: false,
  startDate: null,
  endDate: null,
  cardNumber: null,
  selectedHub: null,
  data: {
    leases: [],
    total: 0,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAR_BY_VIN_SUCCESS:
      return { ...state, car: action.payload, loading: false };
    case GET_CAR_BY_VIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PREVIOUS_CAR_LIST_SUCCESS:
      return { ...state, listPreviousCar: action.payload, loading: false };
    case GET_PREVIOUS_CAR_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_HOST_HUB_INFO_SUCCESS:
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
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
