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
  CHECK_CAR_MODEL_SUCCESS,
  CHECK_CAR_MODEL_FAILURE,
  CHECK_CAR_MODEL_REQUEST,
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
  SET_LEASE_INFO,
  GET_CAR_BY_VIN_REQUEST,
  ADD_LEASE_REQUEST,
} from '@redux/constants/lease';
import axios from 'axios';
import firebase from 'react-native-firebase';

export const checkCarByVin = dispatch => async (
  data,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: GET_CAR_BY_VIN_REQUEST });

    const result = await axios({
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${data.vin}?format=json`,
      method: 'GET',
    });

    const infoFromVin = [];
    const codes = [24, 26, 27, 28, 29, 39, 75];
    codes.forEach(code => {
      const item = result.data.Results.find(data => data.VariableId === code);
      if (item) {
        infoFromVin.push({ key: item.Variable, value: item.Value });
      }
    });

    // const infoFromVin = [
    //   { key: 'Fuel Type - Primary', value: 'Flexible Fuel Vehicle (FFV)' },

    //   { key: 'Make', value: 'CHRYSLER' },
    //   { key: 'Manufacturer Name', value: 'FCA CANADA INC.' },
    //   { key: 'Model', value: '300' },
    //   { key: 'Model Year', value: '2012' },
    //   { key: 'Vehicle Type', value: 'PASSENGER CAR' },
    //   { key: 'Plant Country', value: null },
    // ];

    if (infoFromVin[1].value && infoFromVin[3].value) {
      const name = `${infoFromVin[1].value} ${infoFromVin[3].value} ${infoFromVin[4].value}`;

      const response = await query({
        endpoint: `carModel/findByName/${name}`,
        method: METHODS.get,
      });
      if (response.status === 200) {
        const carModel = response.data;
        dispatch({
          type: GET_CAR_BY_VIN_SUCCESS,
          payload: { ...data, infoFromVin, carModel },
        });
        callback.onSuccess();
      } else {
        dispatch({ type: GET_CAR_BY_VIN_FAILURE });
        callback.onFailure(false);
      }
    } else {
      dispatch({ type: GET_CAR_BY_VIN_FAILURE });
      callback.onFailure(true);
    }
  } catch (error) {
    dispatch({ type: GET_CAR_BY_VIN_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const scanVinCodeByCamera = (data, callback) => async dispatch => {
  try {
    dispatch({ type: SCAN_VIN_CODE_SUCCESS, payload: { ...data } });
    callback.onSuccess();
  } catch (error) {
    dispatch({ type: GET_LEASE_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const setLeaseInfo = dispatch => data => {
  dispatch({ type: SET_LEASE_INFO, payload: data });
};

export const choosePreviousCar = (data, callback) => async dispatch => {
  try {
    dispatch({ type: SCAN_VIN_CODE_SUCCESS, payload: { ...data } });
    callback.onSuccess();
  } catch (error) {
    console.log({ error });
    dispatch({ type: GET_LEASE_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const getCustomerPreviousCarList = dispatch => async (id, callback) => {
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
    dispatch({ type: GET_LEASE_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const checkCarModelAvailable = dispatch => async (data, callback) => {
  try {
    dispatch({ type: CHECK_CAR_MODEL_REQUEST });
    const response = await query({
      endpoint: `carModel/findByName/${data.name}`,
      method: METHODS.get,
    });
    if (response.status === 200) {
      const carModel = response.data;
      dispatch({
        type: CHECK_CAR_MODEL_SUCCESS,
        payload: { ...data, carModel },
      });
      callback.onSuccess();
    } else {
      dispatch({ type: CHECK_CAR_MODEL_FAILURE });
    }
  } catch (error) {
    dispatch({ type: CHECK_CAR_MODEL_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const addLease = dispatch => async (
  {
    odometer,
    images,
    startDate,
    endDate,
    usingYear,
    vin,
    customer,
    hub,
    cardNumber,
    carModel,
    licensePlates,
  },
  callback
) => {
  try {
    dispatch({ type: ADD_LEASE_REQUEST });
    const imagesURL = [];
    // const imagesURL = [
    //   'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    // ];

    await Promise.all(
      images
        .filter((_, i) => i > 0)
        .map(async element => {
          const snapshot = await firebase
            .storage()
            .ref(`lease-car/${customer}/${Date.now()}`)
            .putFile(element.uri);
          imagesURL.push(await snapshot.downloadURL);
        })
    );

    // console.log('vin here!!: ', vin);

    const result = await query({
      endpoint: 'car/createLeasingCar',
      method: METHODS.post,
      data: {
        customer,
        odometer,
        vin,
        carModel: carModel._id,
        usingYear,
        images: imagesURL,
        licensePlates,
      },
    });
    if (result.status === 201 || result.status === 200) {
      const lease = await query({
        endpoint: 'lease',
        method: METHODS.post,
        data: {
          customer,
          hub,
          startDate,
          endDate,
          car: result.data._id,
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
  } catch (error) {
    dispatch({ type: ADD_LEASE_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};

export const getLeaseList = dispatch => async (callback = INITIAL_CALLBACK) => {
  try {
    dispatch({
      type: GET_LEASE_REQUEST,
    });
    const result = await query({ endpoint: ENDPOINTS.lease });
    // console.warn(result.data);
    if (result.status === STATUS.OK) {
      console.log(';ease: ', result.data);
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

export const updateLeaseStatus = dispatch => async (
  { id, status },
  callback = INITIAL_CALLBACK
) => {
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

export const setLeaseDetailId = dispatch => _id =>
  dispatch({
    type: SET_LEASE_DETAIL_ID,
    payload: _id,
  });
