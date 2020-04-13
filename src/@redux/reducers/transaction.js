import {
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
} from '@redux/constants/transaction';

const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
