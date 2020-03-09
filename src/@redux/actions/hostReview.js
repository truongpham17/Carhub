import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const ADD_LEASE_REQUEST = 'add-lease-request';
export const ADD_LEASE_SUCCESS = 'add-lease-success';
export const ADD_LEASE_FAILURE = 'add-lease-failure';

export const addLease = (
  { odometers, images, startDate, endDate },
  callback
) => async dispatch => {
  try {
    // console.log('1');
    // for (let i = 0; i < images.length; i++) {
    //   const file = images[i];
    //   uri: image.uri,
    //   type: image.type,
    //   name: image.fileName
    //   car.append(`images[${i}]`, file, file.name);
    // }
    dispatch({ type: ADD_LEASE_REQUEST });
    const car = await query({
      endpoint: 'car',
      method: METHODS.post,
      data: { odometers },
    });

    if (car.status === 201) {
      const lease = await query({
        endpoint: 'lease',
        method: METHODS.post,
        data: { startDate, endDate },
      });
      if (lease.status === 201) {
        dispatch({ type: ADD_LEASE_SUCCESS, payload: lease.data });
        callback.onSuccess();
      } else {
        dispatch({
          type: ADD_LEASE_FAILURE,
        });
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
