import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_FAILURE,
} from '../constants/payment';

export function getHubList(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_PAYMENT_REQUEST });
      const result = await query({
        endpoint: 'payment',
        method: METHODS.post,
        data,
      });

      if (result.status === STATUS.OK) {
        dispatch({
          type: ADD_PAYMENT_SUCCESS,
          payload: { hubs: result.data.hubs, total: result.data.total },
        });
        callback.onSuccess();
      } else {
        dispatch({ type: ADD_PAYMENT_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_PAYMENT_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
