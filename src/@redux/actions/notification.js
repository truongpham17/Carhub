import { INITIAL_CALLBACK } from 'Constants/api';
import { query } from 'services/api';
import {
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
} from '../constants/notification';

export const getNotifications = dispatch => async (
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({
      type: GET_NOTIFICATION_REQUEST,
    });
    const result = await query({
      endpoint: 'notification',
    });

    if (result.status === 200) {
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: result.data,
      });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_NOTIFICATION_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_NOTIFICATION_FAILURE });
    callback.onFailure();
  }
};
