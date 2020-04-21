import {
  ADD_PAYMENT_FAILURE,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
  GET_PAYMENT_TOKEN_FAILURE,
  GET_PAYMENT_TOKEN_REQUEST,
  GET_PAYMENT_TOKEN_SUCCESS,
} from '../constants/payment';

const INITIAL_STATE = {
  loading: false,
  paymentToken: null,
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

    case GET_PAYMENT_TOKEN_REQUEST:
      return { ...state, loading: true };
    case GET_PAYMENT_TOKEN_SUCCESS:
      return {
        ...state,
        paymentToken: action.payload,
        loading: false,
      };
    case GET_PAYMENT_TOKEN_FAILURE:
      return { ...state, loading: false };

    default:
      return { ...state };
  }
};
