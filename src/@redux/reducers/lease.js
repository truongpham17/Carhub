import {
  GET_LEASE_REQUEST,
  GET_LEASE_FAILURE,
  GET_LEASE_SUCCESS,
} from '@redux/constants/lease';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LEASE_REQUEST:
      return { ...state, loading: true };
    case GET_LEASE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_LEASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
