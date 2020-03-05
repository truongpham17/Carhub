import {
  GET_VIN_CAR_REQUEST,
  GET_VIN_CAR_SUCCESS,
  GET_VIN_CAR_FAILURE,
} from '@redux/actions/carModel';

const INITIAL_STATE = {
  car: {},
  error: null,
  loading: false,
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
    default:
      return state;
  }
};
