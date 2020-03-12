import {
  GET_LEASE_REQUEST,
  GET_LEASE_FAILURE,
  GET_LEASE_SUCCESS,
  // GET_LEASE_ITEM_REQUEST,
  // GET_LEASE_ITEM_SUCCESS,
  // GET_LEASE_ITEM_FAILURE,
  SET_LEASE_DETAIL_ID,
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
} from '@redux/constants/lease';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: '',
  selectedId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Geet Lease List
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_LEASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case GET_LEASE_ITEM_REQUEST:
    //   return { ...state, loading: true };
    // case GET_LEASE_ITEM_SUCCESS:
    //   return { ...state, loading: false, data: action.payload };
    // case GET_LEASE_ITEM_FAILURE:
    //   return { ...state, loading: false, error: action.payload };
    case SET_LEASE_DETAIL_ID:
      return { ...state, selectedId: action.payload };
    // Update Lease
    case UPDATE_LEASE_ITEM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_LEASE_ITEM_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case UPDATE_LEASE_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
