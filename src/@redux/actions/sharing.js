import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK, METHODS } from 'Constants/api';
import {
  GET_SHARING_FAILURE,
  GET_SHARING_REQUEST,
  GET_SHARING_SUCCESS,
} from '@redux/constants/sharing';

export const getSharing = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: GET_SHARING_REQUEST });
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.sharing,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_SHARING_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_SHARING_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_SHARING_FAILURE, payload: error });
  }
};
