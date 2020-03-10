import {
  ADD_PAYMENT_FAILURE,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
} from '../constants/payment';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ADD_PAYMENT_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
