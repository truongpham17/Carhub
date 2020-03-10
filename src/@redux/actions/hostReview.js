import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const ADD_LEASE_REQUEST = 'add-lease-request';
export const ADD_LEASE_SUCCESS = 'add-lease-success';
export const ADD_LEASE_FAILURE = 'add-lease-failure';

export const addLease = (
  { odometers, images, startDate, endDate, name, VIN, customerID, hubID },
  callback
) => async dispatch => {
  try {
    dispatch({ type: ADD_LEASE_REQUEST });
    const carModel = await query({
      endpoint: 'carModel',
      method: METHODS.post,
      data: { name, VIN },
    });

    if (carModel.status === 201) {
      const car = await query({
        endpoint: 'car',
        method: METHODS.post,
        data: { customerID, hubID, odometers, images },
      });
      if (car.status === 201) {
        const lease = await query({
          endpoint: 'lease',
          method: METHODS.post,
          data: { customerID, hubID, startDate, endDate },
        });
        if (lease.status === 201) {
          dispatch({ type: ADD_LEASE_SUCCESS, payload: lease.data });
          callback.onSuccess();
        } else {
          dispatch({
            type: ADD_LEASE_FAILURE,
          });
        }
      }
    } else {
      dispatch({
        type: ADD_LEASE_FAILURE,
      });
    }
  } catch (error) {
    dispatch({ type: ADD_LEASE_FAILURE, payload: error });
  }
};
