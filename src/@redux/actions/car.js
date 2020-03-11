import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_CAR_FAILURE,
  GET_CAR_REQUEST,
  GET_CAR_SUCCESS,
  SET_RENTAL_SEARCH,
  SET_SELECTED_CAR,
  SET_PICK_OFF_HUB,
  ADD_RENTAL_REQUEST,
  ADD_RENTAL_SUCCESS,
  ADD_RENTAL_FAILURE,
  SEARCH_CAR_MODEL_FAILURE,
  SEARCH_CAR_MODEL_REQUEST,
  SEARCH_CAR_MODEL_SUCCESS,
} from '../constants/car';

export function getCarList(_, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_CAR_REQUEST });
      const result = await query({
        endpoint: 'car',
        method: METHODS.get,
      });

      if (result.status === STATUS.OK) {
        console.log(result.data);
        dispatch({
          type: GET_CAR_SUCCESS,
          payload: result.data,
        });
        callback.onSuccess();
      } else {
        dispatch({ type: GET_CAR_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_CAR_FAILURE, payload: error });
      callback.onFailure();
    }
  };
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
      dispatch({ type: ADD_RENTAL_FAILURE, payload: error });
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

export function setSelectedCar(_id) {
  return {
    type: SET_SELECTED_CAR,
    payload: _id,
  };
}

export function setPickOffHub(hub) {
  return {
    type: SET_PICK_OFF_HUB,
    payload: hub,
  };
}

export function searchCarList(data, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: SEARCH_CAR_MODEL_REQUEST });
      const result = await query({
        endpoint: 'carModel/search',
        method: METHODS.post,
        data,
      });

      console.log(result.status, result.data);

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
      dispatch({ type: SEARCH_CAR_MODEL_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
