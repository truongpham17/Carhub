import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_CAR_BY_VIN_REQUEST,
  GET_PREVIOUS_CAR_LIST_SUCCESS,
  GET_PREVIOUS_CAR_LIST_FAILURE,
  GET_CAR_BY_VIN_SUCCESS,
  GET_CAR_BY_VIN_FAILURE,
  CHECK_CAR_MODEL_SUCCESS,
  CHECK_CAR_MODEL_FAILURE,
  CHECK_CAR_MODEL_REQUEST,
  ADD_LEASE_SUCCESS,
  ADD_LEASE_FAILURE,
  SCAN_VIN_CODE_SUCCESS,
  SET_LEASE_INFO,
  // GET_LEASE_ITEM_REQUEST,
  // GET_LEASE_ITEM_SUCCESS,
  // GET_LEASE_ITEM_FAILURE,
  SET_LEASE_DETAIL_ID,
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
  ADD_LEASE_REQUEST,
} from '@redux/constants/lease';
import {
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
} from '@redux/constants/transaction';

const INITIAL_STATE = {
  vin: '',
  // vin: '2C3CCACG5CH278240',
  usingYears: null,
  odometer: null,
  images: [''],
  infoFromVin: [],
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
    case GET_CAR_BY_VIN_REQUEST:
      return { ...state, loading: true };
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
    case CHECK_CAR_MODEL_REQUEST:
      return { ...state, loading: true };
    case CHECK_CAR_MODEL_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case CHECK_CAR_MODEL_FAILURE:
      return { ...state, loading: false };

    case ADD_LEASE_REQUEST:
      return { ...state, loading: true };
    case ADD_LEASE_SUCCESS:
      return {
        ...state,
        loading: false,
        vin: null,
        usingYears: null,
        odometer: null,
        images: [''],
      };
    case ADD_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case SCAN_VIN_CODE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SET_LEASE_INFO:
      return { ...state, ...action.payload, loading: false };
    // Geet Lease List
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_SUCCESS:
      return { ...state, loading: false, data: { ...action.payload } };
    case GET_LEASE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_LEASE_DETAIL_ID:
      return { ...state, selectedId: action.payload };
    // Update Lease
    case UPDATE_LEASE_ITEM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_LEASE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_LEASE_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CONFIRM_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case CONFIRM_TRANSACTION_SUCCESS:
      return { ...state, loading: false };
    case CONFIRM_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
