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
  UPDATE_LEASE_ITEM_FAILURE,
  UPDATE_LEASE_ITEM_REQUEST,
  UPDATE_LEASE_ITEM_SUCCESS,
  // GET_LEASE_ITEM_FAILURE,
  // GET_LEASE_ITEM_REQUEST,
  // GET_LEASE_ITEM_SUCCESS,
  SET_LEASE_DETAIL_ID,
  SCAN_VIN_CODE_SUCCESS,
  SET_VALUE_SUCCESS,
} from '@redux/constants/lease';
import axios from 'axios';

export const checkCarByVin = (data, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
    const result = await axios({
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${data.vin}?format=json`,
    });
    const InfoFromVin = [];
    const codes = [24, 26, 27, 28, 29, 39, 75];
    codes.forEach(code => {
      const item = result.data.Results.find(data => data.VariableId === code);
      if (item) {
        InfoFromVin.push({ key: item.Variable, value: item.Value });
      }
    });
    if (InfoFromVin[1].value !== null && InfoFromVin[3].value !== null) {
      dispatch({
        type: GET_CAR_BY_VIN_SUCCESS,
        payload: { ...data, InfoFromVin },
      });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_CAR_BY_VIN_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const scanVinCodeByCamera = (data, callback) => async dispatch => {
  try {
    dispatch({ type: SCAN_VIN_CODE_SUCCESS, payload: { ...data } });
    callback.onSuccess();
  } catch (error) {
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const setValue = data => async dispatch => {
  dispatch({ type: SET_VALUE_SUCCESS, payload: { ...data } });
};

export const choosePreviousCar = (data, callback) => async dispatch => {
  try {
    dispatch({ type: SCAN_VIN_CODE_SUCCESS, payload: { ...data } });
    callback.onSuccess();
  } catch (error) {
    console.log({ error });
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
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
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const checkHostHubInfo = (data, callback) => async dispatch => {
  try {
    dispatch({ type: GET_LEASE_REQUEST });
    const response = await query({
      endpoint: 'carModel/findByName',
      method: METHODS.post,
      data: { data },
    });
    if (response.status === 200) {
      if (response.data) {
        const carModel = response.data;
        dispatch({
          type: ADD_HOST_HUB_INFO_SUCCESS,
          payload: { ...data, carModel },
        });
        callback.onSuccess();
      } else {
        dispatch({
          type: ADD_HOST_HUB_INFO_SUCCESS,
          payload: { ...data },
        });
        callback.onSuccess();
      }
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
          dispatch({ type: ADD_LEASE_SUCCESS });
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
    dispatch({ type: GET_LEASE_FAILURE, payload: error });
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
