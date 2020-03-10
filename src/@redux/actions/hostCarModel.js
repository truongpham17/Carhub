import { query } from 'services/api';
import { METHODS } from 'Constants/api';
import axios from 'axios';

export const GET_VIN_CAR_REQUEST = 'get-vin-car-request';
export const GET_VIN_CAR_SUCCESS = 'get-vin-car-success';
export const GET_VIN_CAR_FAILURE = 'get-vin-car-failure';

export const checkCarByVin = (car, callback) => async dispatch => {
  try {
    dispatch({ type: GET_VIN_CAR_REQUEST });
    const result = await axios({
      // url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${car.vin}?format=json`,
      url: `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/SAJWA1C78D8V38055?format=json`,
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
    // console.log(data.data);
    // if (data.status === 200) {
    //   dispatch({
    //     type: GET_VIN_CAR_SUCCESS,
    //     payload: { ...data.data.data, ...car },
    //   });
    //   callback.onSuccess();
    // } else {
    //   dispatch({
    //     type: GET_VIN_CAR_FAILURE,
    //   });
    //   callback.onFailure();
    // }
  } catch (error) {
    dispatch({ type: GET_VIN_CAR_FAILURE, payload: error });
    callback.onFailure();
  }
};
