import { query } from 'services/api';
import { INITIAL_CALLBACK, STATUS } from 'Constants/api';
import {
  GET_LOG_FAILURE,
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
} from '../constants/log';

export const getLogs = dispatch => async (id, callback = INITIAL_CALLBACK) => {
  try {
    dispatch({ type: GET_LOG_REQUEST });
    const result = await query({
      endpoint: `log/group/${id}`,
    });
    if (result.status === STATUS.OK) {
      console.log(result.status);
      console.log(result.data);
      dispatch({ type: GET_LOG_SUCCESS, payload: result.data });
      callback.onSuccess(result.data);
    } else {
      dispatch({ type: GET_LOG_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_LOG_FAILURE, payload: error });
    callback.onFailure();
  }
};
