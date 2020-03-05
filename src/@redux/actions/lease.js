import { query } from 'services/api';
import { METHODS } from 'Constants/api';

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
