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
  SCAN_VIN_CODE_SUCCESS,
  SET_VALUE_SUCCESS,
  // GET_LEASE_ITEM_REQUEST,
  // GET_LEASE_ITEM_SUCCESS,
  // GET_LEASE_ITEM_FAILURE,
  SET_LEASE_DETAIL_ID,
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
} from '@redux/constants/lease';

const INITIAL_STATE = {
  vin: null,
  usingYears: null,
  odometers: null,
  images: [],
  InfoFromVin: [],
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
  carModel: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAR_BY_VIN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case GET_CAR_BY_VIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_PREVIOUS_CAR_LIST_SUCCESS:
      return { ...state, listPreviousCar: action.payload, loading: false };
    case GET_PREVIOUS_CAR_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_HOST_HUB_INFO_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case ADD_LEASE_SUCCESS:
      return {
        ...state,
        loading: false,
        vin: null,
        usingYears: null,
        odometers: null,
      };
    case ADD_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SCAN_VIN_CODE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SET_VALUE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    default:
      return { ...state };
  }
};
