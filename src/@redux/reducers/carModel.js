import {
  SEARCH_CAR_MODEL_FAILURE,
  SEARCH_CAR_MODEL_REQUEST,
  SEARCH_CAR_MODEL_SUCCESS,
} from '../constants/carModel';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CAR_MODEL_REQUEST:
      return { ...state, loading: true };
    case SEARCH_CAR_MODEL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SEARCH_CAR_MODEL_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
