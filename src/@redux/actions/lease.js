import { query } from 'services/api';
import { METHODS, ENDPOINTS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
  // GET_LEASE_ITEM_FAILURE,
  // GET_LEASE_ITEM_REQUEST,
  // GET_LEASE_ITEM_SUCCESS,
  SET_LEASE_DETAIL_ID,
} from '@redux/constants/lease';
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
      // console.log(data.data);
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
    // const carModel = await query({
    //   endpoint: 'carModel',
    //   method: METHODS.post,
    //   data: { name },
    // });

    // if (carModel.status === 201) {
    const car = await query({
      endpoint: 'car',
      method: METHODS.post,
      data: {
        customer,
        hub,
        odometer,
        images,
        VIN,
        carModel: '5e69a07d06c4710835a20231',
        usingYears,
      },
    });
    if (car.status === 201) {
      // console.log(car.data);
      const lease = await query({
        endpoint: 'lease',
        method: METHODS.post,
        data: {
          customer,
          hub,
          startDate,
          endDate,
          car: car.data.car._id,
          cardNumber,
        },
      });
      if (lease.status === 201) {
        dispatch({ type: ADD_LEASE_SUCCESS, payload: lease.data });
        callback.onSuccess();
      } else {
        dispatch({
          type: ADD_LEASE_FAILURE,
        });
      }
      // }
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

export const getLeaseList = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: GET_LEASE_REQUEST,
    });
    const result = await query({ endpoint: ENDPOINTS.lease });
    // console.warn(result.data);
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_LEASE_SUCCESS, payload: result.data });
      callback.onSuccess();
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

// export const getLease = (
//   data,
//   callback = INITIAL_CALLBACK
// ) => async dispatch => {
//   try {
//     dispatch({
//       type: GET_LEASE_ITEM_REQUEST,
//     });
//     const result = await query({
//       endpoint: `${ENDPOINTS.lease}/${data.id}`,
//     });
//     if (result.status) {
//       dispatch({ type: GET_LEASE_ITEM_SUCCESS, payload: result.data });
//       callback.success();
//     }
//   } catch (error) {
//     dispatch({
//       type: GET_LEASE_ITEM_FAILURE,
//       payload: error,
//     });
//     callback.onFailure();
//   }
// };

export const updateLeaseStatus = (
  { id, status },
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_LEASE_ITEM_REQUEST,
    });
    const result = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.lease}/${id}`,
      data: { status },
    });
    if (result.status === 200) {
      dispatch({ type: UPDATE_LEASE_ITEM_SUCCESS, payload: result.data });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LEASE_ITEM_FAILURE,
      payload: error,
    });
    callback.onFailure();
  }
};

export const setLeaseDetailId = _id => ({
  type: SET_LEASE_DETAIL_ID,
  payload: _id,
});
