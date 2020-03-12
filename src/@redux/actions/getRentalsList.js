import axios from 'axios';
import {
  GET_RENTAL_FAILURE,
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
} from '@redux/constants/rental';
import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK } from 'Constants/api';

export const getRentalsList = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: GET_RENTAL_REQUEST,
    });
    const result = await query({ endpoint: ENDPOINTS.rental });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_RENTAL_SUCCESS, payload: result.data });
      callback.success();
    }
  } catch (error) {
    dispatch({
      type: GET_RENTAL_FAILURE,
      payload: error,
    });
  }
};
