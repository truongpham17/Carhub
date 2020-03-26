import {
  GET_LOG_FAILURE,
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
} from '../constants/log';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOG_REQUEST:
      return { ...state, loading: true };
    case GET_LOG_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_LOG_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
