import {
  GET_RENTAL_ITEM_FAILURE,
  GET_RENTAL_ITEM_SUCCESS,
  GET_RENTAL_ITEM_REQUEST,
} from '@redux/constants/rental';
import { INITIAL_CALLBACK, ENDPOINTS, STATUS } from 'Constants/api';
import { query } from 'services/api';

export const getSpecificRental = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: GET_RENTAL_ITEM_REQUEST,
    });
    const result = await query({
      endpoint: `${ENDPOINTS.rental}/${data.id}`,
    });
    // console.log(result.data);
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_RENTAL_ITEM_SUCCESS, payload: result.data });
      callback.success();
    }
  } catch (error) {
    dispatch({
      type: GET_RENTAL_ITEM_FAILURE,
      payload: error,
    });
  }
};
