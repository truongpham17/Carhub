import { query } from 'services/api';
import { METHODS } from 'Constants/api';
import axios from 'axios';

export const GET_LEASE_CAR_REQUEST = 'get-lease-car-request';
export const GET_LEASE_CAR_SUCCESS = 'get-lease-car-success';
export const GET_LEASE_CAR_FAILURE = 'get-lease-car-failure';

export const GET_VIN_CAR_REQUEST = 'get-vin-car-request';
export const GET_VIN_CAR_SUCCESS = 'get-vin-car-success';
export const GET_VIN_CAR_FAILURE = 'get-vin-car-failure';

export const GET_HOST_HUB_INFO_SUCCESS = 'get-host-hub-info-success';

export const ADD_LEASE_REQUEST = 'add-lease-request';
export const ADD_LEASE_SUCCESS = 'add-lease-success';
export const ADD_LEASE_FAILURE = 'add-lease-failure';

export const getCustomerCarList = (id, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_CAR_REQUEST });
    const data = await query({
      endpoint: `car/list`,
      method: METHODS.get,
    });
    if (data.status === 200) {
      console.log(data.data);
      dispatch({ type: GET_LEASE_CAR_SUCCESS, payload: data.data });
      callback.onSuccess();
    } else {
      dispatch({
        type: GET_LEASE_CAR_FAILURE,
      });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_LEASE_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const checkCarByVin = (car, callback) => async dispatch => {
  try {
    dispatch({ type: GET_VIN_CAR_REQUEST });
    const result = await axios({
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${car.vin}?format=json`,
    });
    const valueData = [];
    const codes = [24, 26, 27, 28, 29, 39, 75];
    codes.forEach(code => {
      const item = result.data.Results.find(data => data.VariableId === code);
      if (item) {
        valueData.push({ key: item.Variable, value: item.Value });
      }
    });
    dispatch({
      type: GET_VIN_CAR_SUCCESS,
      payload: { ...car, valueData },
    });
    callback.onSuccess();
  } catch (error) {
    dispatch({ type: GET_VIN_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const checkHostHubInfo = (data, callback) => ({
  type: GET_HOST_HUB_INFO_SUCCESS,
  payload: data,
});

export const addLease = (
  {
    odometer,
    images,
    startDate,
    endDate,
    usingYears,
    name,
    VIN,
    customer,
    hub,
    cardNumber,
  },
  callback
) => async dispatch => {
  try {
    dispatch({ type: ADD_LEASE_REQUEST });
    const carModel = await query({
      endpoint: 'carModel',
      method: METHODS.post,
      data: { name },
    });

    if (carModel.status === 201) {
      const car = await query({
        endpoint: 'car',
        method: METHODS.post,
        data: {
          customer,
          hub,
          odometer,
          images,
          VIN,
          carModel: carModel._id,
          usingYears,
        },
      });
      if (car.status === 201) {
        const lease = await query({
          endpoint: 'lease',
          method: METHODS.post,
          data: { customer, hub, startDate, endDate, car: car._id, cardNumber },
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
    callback.onFailure();
  }
};
