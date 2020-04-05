import {
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
} from '@redux/constants/transaction';
import { INITIAL_CALLBACK, STATUS, METHODS } from 'Constants/api';
import { query } from 'services/api';

export const confirmTransaction = dispatch => async (
  { id, type, toStatus, car },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CONFIRM_TRANSACTION_REQUEST });
    const result = await query({
      endpoint: `${type}/transaction/${id}`,
      method: METHODS.post,
      data: { toStatus, car },
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: CONFIRM_TRANSACTION_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: CONFIRM_TRANSACTION_FAILURE, payload: error });
    callback.onFailure();
  }
};
