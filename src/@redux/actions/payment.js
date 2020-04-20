import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_FAILURE,
  GET_PAYMENT_TOKEN_FAILURE,
  GET_PAYMENT_TOKEN_REQUEST,
  GET_PAYMENT_TOKEN_SUCCESS,
} from '../constants/payment';

export function addPayment(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_PAYMENT_REQUEST });
      const result = await query({
        endpoint: 'payment',
        method: METHODS.post,
        data,
      });

      if (result.status === STATUS.CREATED) {
        dispatch({
          type: ADD_PAYMENT_SUCCESS,
          payload: result.data,
        });
        callback.onSuccess();
      } else {
        dispatch({ type: ADD_PAYMENT_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_PAYMENT_FAILURE, payload: error.response.data });
      callback.onFailure();
    }
  };
}

export const getPaymentToken = dispatch => async (
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({
      type: GET_PAYMENT_TOKEN_REQUEST,
    });
    const result = await query({
      endpoint: 'transaction/paymentToken',
    });

    if (result.status === 200) {
      dispatch({
        type: GET_PAYMENT_TOKEN_SUCCESS,
        payload: result.data.paymentToken,
      });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_PAYMENT_TOKEN_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_PAYMENT_TOKEN_FAILURE });
    callback.onFailure();
  }
};
