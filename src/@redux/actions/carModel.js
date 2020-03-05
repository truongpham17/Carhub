import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const GET_VIN_CAR_REQUEST = 'get-vin-car-request';
export const GET_VIN_CAR_SUCCESS = 'get-vin-car-success';
export const GET_VIN_CAR_FAILURE = 'get-vin-car-failure';

export const checkCarByVin = (car, callback) => async dispatch => {
  try {
    dispatch({ type: GET_VIN_CAR_REQUEST });
    const data = await query({
      // endpoint: `http://api.carmd.com/v3.0/decode?vin=${car.vin}`,
      endpoint: `http://api.carmd.com/v3.0/decode?vin=1GNALDEK9FZ108495`,
      headers: {
        authorization: 'Basic Yjc4NTY0NjctYWIwZC00MjY0LWI3NTktNjdhYmI0ZDM1ZmE4',
        'partner-token': 'ac3a64c3a9804e389479839cfda3d42b',
      },
      method: METHODS.get,
      API_URL: '',
    });
    if (data.status === 200) {
      dispatch({
        type: GET_VIN_CAR_SUCCESS,
        payload: { ...data.data.data, ...car },
      });
      callback.onSuccess();
    } else {
      dispatch({
        type: GET_VIN_CAR_FAILURE,
      });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_VIN_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};
