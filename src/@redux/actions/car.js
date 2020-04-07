import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_CAR_LIST_FAILURE,
  GET_CAR_LIST_REQUEST,
  GET_CAR_LIST_SUCCESS,
  SET_RENTAL_SEARCH,
  SET_SELECTED_CAR,
  SET_PICK_OFF_HUB,
  ADD_RENTAL_REQUEST,
  ADD_RENTAL_SUCCESS,
  ADD_RENTAL_FAILURE,
  SEARCH_CAR_MODEL_FAILURE,
  SEARCH_CAR_MODEL_REQUEST,
  SEARCH_CAR_MODEL_SUCCESS,
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
} from '../constants/car';

export function getCarList(_, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CAR_LIST_REQUEST });
      const result = await query({
        endpoint: 'car',
        method: METHODS.get,
      });

      if (result.status === STATUS.OK) {
        // console.log(result.data);
        dispatch({
          type: GET_CAR_LIST_SUCCESS,
          payload: result.data,
        });
        callback.onSuccess();
      } else {
        dispatch({ type: GET_CAR_LIST_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_CAR_LIST_FAILURE, payload: error.response.data });
      callback.onFailure();
    }
  };
}

export async function getCar(id) {
  try {
    const result = await query({
      endpoint: `car/${id}`,
      method: METHODS.get,
    });
    if (result.status === STATUS.OK) {
      return result.data;
    }
  } catch (error) {
    return null;
  }
}

export function addRentRequest(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_RENTAL_REQUEST });
      const result = await query({
        endpoint: 'rental',
        method: METHODS.post,
        data,
      });

      if (result.status === STATUS.CREATED) {
        dispatch({
          type: ADD_RENTAL_SUCCESS,
          payload: result.data,
        });
        callback.onSuccess();
      } else {
        dispatch({ type: ADD_RENTAL_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_RENTAL_FAILURE, payload: error.response.data });
      callback.onFailure();
    }
  };
}

export function setRentalSearch(data) {
  return {
    type: SET_RENTAL_SEARCH,
    payload: data,
  };
}

export const setSelectedCar = dispatch => _id => {
  dispatch({
    type: SET_SELECTED_CAR,
    payload: _id,
  });
};

export function setPickOffHub(hub) {
  return {
    type: SET_PICK_OFF_HUB,
    payload: hub,
  };
}

export const searchCarList = dispatch => async (
  data,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: SEARCH_CAR_MODEL_REQUEST });
    const result = await query({
      endpoint: 'carModel/search',
      method: METHODS.post,
      data,
    });

    // console.log(result.status, result.data);

    if (result.status === STATUS.OK) {
      console.log('success!!');
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
    dispatch({ type: SEARCH_CAR_MODEL_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};
