import { query } from 'services/api';
import { METHODS, ENDPOINTS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_LEASE_ITEM_FAILURE,
  GET_LEASE_ITEM_REQUEST,
  GET_LEASE_ITEM_SUCCESS,
} from '@redux/constants/lease';

export const GET_LEASE_CAR_REQUEST = 'get-lease-car-request';
export const GET_LEASE_CAR_SUCCESS = 'get-lease-car-success';
export const GET_LEASE_CAR_FAILURE = 'get-lease-car-failure';

export const getCar = () => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_CAR_REQUEST });
    const data = await query({
      endpoint: 'carModel/checkCarByVin',
      method: METHODS.get,
    });
    if (data.status === 200) {
      dispatch({ type: GET_LEASE_CAR_SUCCESS, payload: data.data });
    } else {
      dispatch({
        type: GET_LEASE_CAR_FAILURE,
      });
    }
  } catch (error) {
    dispatch({ type: GET_LEASE_CAR_FAILURE, payload: error });
  }
};

export const getLeaseList = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: GET_LEASE_REQUEST,
    });
    const result = await query({ endpoint: ENDPOINTS.lease });
    // console.log(result.data);
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_LEASE_SUCCESS, payload: result.data });
      callback.success();
    } else {
      dispatch({ type: GET_LEASE_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({
      type: GET_LEASE_FAILURE,
      payload: error,
    });
    callback.onFailure();
  }
};

export const getLease = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: GET_LEASE_ITEM_REQUEST,
    });
    const result = await query({
      endpoint: `${ENDPOINTS.lease}/${data.id}`,
    });
    if (result.status) {
      dispatch({ type: GET_LEASE_ITEM_SUCCESS, payload: result.data });
      callback.success();
    }
  } catch (error) {
    dispatch({
      type: GET_LEASE_ITEM_FAILURE,
      payload: error,
    });
    callback.onFailure();
  }
};
