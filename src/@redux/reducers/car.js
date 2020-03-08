import {
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
} from '../constants/car';

const INITIAL_STATE = {
  data: [],
  total: 0,
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
      };
    case GET_CAR_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
