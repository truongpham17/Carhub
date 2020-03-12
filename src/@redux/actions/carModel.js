import { INITIAL_CALLBACK, METHODS, STATUS } from 'Constants/api';
import { query } from 'services/api';
import {
  SEARCH_CAR_MODEL_FAILURE,
  SEARCH_CAR_MODEL_REQUEST,
  SEARCH_CAR_MODEL_SUCCESS,
} from '../constants/carModel';

export function searchCarList(_, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: SEARCH_CAR_MODEL_REQUEST });
      const result = await query({
        endpoint: 'carModel/search',
      });

      if (result.status === STATUS.OK) {
        dispatch({
          type: SEARCH_CAR_MODEL_SUCCESS,
          payload: result.data,
        });
        callback.onSuccess();
      } else {
        dispatch({ type: SEARCH_CAR_MODEL_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SEARCH_CAR_MODEL_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
