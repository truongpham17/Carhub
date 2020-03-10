import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
} from '../constants/hub';

export function getHubList(_, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_HUB_REQUEST });
      const result = await query({
        endpoint: 'hub',
        method: METHODS.get,
      });

      if (result.status === STATUS.OK) {
        dispatch({
          type: GET_HUB_SUCCESS,
          payload: { hubs: result.data.hubs, total: result.data.total },
        });
        callback.onSuccess();
      } else {
        dispatch({ type: GET_HUB_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_HUB_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
