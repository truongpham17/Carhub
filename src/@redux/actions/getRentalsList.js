import {
  GET_RENTAL_FAILURE,
  GET_RENTAL_REQUEST,
  GET_RENTAL_SUCCESS,
  UPDATE_RENTAL_ITEM_FAILURE,
  UPDATE_RENTAL_ITEM_REQUEST,
  UPDATE_RENTAL_ITEM_SUCCESS,
} from '@redux/constants/rental';
import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK, METHODS } from 'Constants/api';
import {
  ADD_SHARING_REQUEST,
  ADD_SHARING_FAILURE,
  ADD_SHARING_SUCCESS,
} from '@redux/constants/sharing';
import { SET_RENT_DETAIL_ID } from '../constants/rental';

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
    } else {
      dispatch({ type: GET_RENTAL_FAILURE });
    }
  } catch (error) {
    dispatch({
      type: GET_RENTAL_FAILURE,
      payload: error,
    });
  }
};

export const setRentDetailId = _id => ({
  type: SET_RENT_DETAIL_ID,
  payload: _id,
});

export const updateSpecificRental = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: UPDATE_RENTAL_ITEM_REQUEST });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.rental}/${data.id}`,
      data: {
        status: data.status,
      },
    });

    if (result.status === STATUS.OK) {
      if (data.status === 'SHARING') {
        const newSharing = await query({
          method: METHODS.post,
          endpoint: ENDPOINTS.sharing,
          data: {
            geometry: {
              lat: data.geometry.lat,
              lng: data.geometry.lng,
            },
            rental: data.id,
            totalCost: data.totalCost,
            location: data.location,
          },
        });
        if (newSharing.status === STATUS.OK) {
          dispatch({ type: UPDATE_RENTAL_ITEM_SUCCESS, payload: result.data });
          callback.onSuccess();
        } else {
          dispatch({ type: UPDATE_RENTAL_ITEM_FAILURE });
        }
      }
    } else {
      dispatch({ type: UPDATE_RENTAL_ITEM_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: UPDATE_RENTAL_ITEM_FAILURE, payload: error });
    callback.onFailure();
  }
};
