import { query } from 'services/api';
import { METHODS, ENDPOINTS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_LEASE_FAILURE,
  GET_LEASE_REQUEST,
  GET_LEASE_SUCCESS,
  GET_PREVIOUS_CAR_LIST_SUCCESS,
  GET_PREVIOUS_CAR_LIST_FAILURE,
  GET_CAR_BY_VIN_SUCCESS,
  GET_CAR_BY_VIN_FAILURE,
  ADD_HOST_HUB_INFO_SUCCESS,
  ADD_LEASE_SUCCESS,
  ADD_LEASE_FAILURE,
  SET_LEASE_DETAIL_ID,
} from '@redux/constants/lease';
import axios from 'axios';

export const checkCarByVin = (car, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
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
      type: GET_CAR_BY_VIN_SUCCESS,
      payload: { ...car, valueData },
    });
    callback.onSuccess();
  } catch (error) {
    dispatch({ type: GET_CAR_BY_VIN_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const getCustomerPreviousCarList = (id, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
    const data = await query({
      endpoint: `car/list`,
      method: METHODS.get,
    });
    if (data.status === 200) {
      dispatch({ type: GET_PREVIOUS_CAR_LIST_SUCCESS, payload: data.data });
      callback.onSuccess();
    } else {
      dispatch({
        type: GET_PREVIOUS_CAR_LIST_FAILURE,
      });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_PREVIOUS_CAR_LIST_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const checkHostHubInfo = (data, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
    const carModel = await query({
      endpoint: 'carModel/findByName',
      method: METHODS.get,
      data: { data },
    });
    if (carModel.status === 200) {
      dispatch({
        type: ADD_HOST_HUB_INFO_SUCCESS,
        payload: { data, carModel },
      });
    }
  } catch (error) {
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
    callback.onFailure();
  }
};

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
    dispatch({ type: GET_LEASE_REQUEST });
    const carModel = await query({
      endpoint: 'carModel/createCarModel',
      method: METHODS.post,
      data: { name },
    });

    if (carModel.status === 201) {
      const car = await query({
        endpoint: 'car/createCarAfterChecking',
        method: METHODS.post,
        data: {
          customer,
          hub,
          odometer,
          images,
          VIN,
          carModel: carModel.data._id,
          usingYears,
        },
      });
      if (car.status === 201) {
        const lease = await query({
          endpoint: 'lease',
          method: METHODS.post,
          data: {
            customer,
            hub,
            startDate,
            endDate,
            car: car.data._id,
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

export const setLeaseDetailId = _id => ({
  type: SET_LEASE_DETAIL_ID,
  payload: _id,
});
