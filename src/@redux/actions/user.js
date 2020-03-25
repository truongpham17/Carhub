import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK, METHODS } from 'Constants/api';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  ADD_LICENSE_REQUEST,
  ADD_LICENSE_SUCCESS,
  ADD_LICENSE_FAILURE,
} from '@redux/constants/user';

export function signIn({ username, password }, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const result = await query({
        endpoint: 'account/login',
        method: METHODS.post,
        data: { username: 'customer2', password: '123456' },
      });
      if (result.status === STATUS.OK) {
        dispatch({ type: SIGN_IN_SUCCESS, payload: result.data });
        callback.onSuccess();
      } else {
        dispatch({ type: SIGN_IN_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGN_IN_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}

export function addLicense(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_LICENSE_REQUEST });
      const result = await query({
        endpoint: 'license',
        method: METHODS.post,
        data,
      });
      if (result.status === STATUS.CREATED) {
        dispatch({ type: ADD_LICENSE_SUCCESS, payload: result.data });
        callback.onSuccess();
      } else {
        dispatch({ type: ADD_LICENSE_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_LICENSE_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
