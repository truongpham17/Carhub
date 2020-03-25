import { query } from 'services/api';
import { ENDPOINTS, STATUS, INITIAL_CALLBACK, METHODS } from 'Constants/api';
import {
  GET_SHARING_FAILURE,
  GET_SHARING_REQUEST,
  GET_SHARING_SUCCESS,
  GET_SHARING_ITEM_FAILURE,
  GET_SHARING_ITEM_REQUEST,
  GET_SHARING_ITEM_SUCCESS,
  SET_SHARING_DETAIL,
  SEND_SHARING_REQ_FAILURE,
  SEND_SHARING_REQ_REQUEST,
  SEND_SHARING_REQ_SUCCESS,
  GET_RENT_SHARING_FAILURE,
  GET_RENT_SHARING_REQUEST,
  GET_RENT_SHARING_SUCCESS,
  GET_LATEST_SHARING_FAILURE,
  GET_LATEST_SHARING_REQUEST,
  GET_LATEST_SHARING_SUCCESS,
} from '@redux/constants/sharing';

export const getSharing = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: GET_SHARING_REQUEST });
    const result = await query({
      method: METHODS.get,
      endpoint: ENDPOINTS.sharing,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_SHARING_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_SHARING_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_SHARING_FAILURE, payload: error });
  }
};

export const getSharingByRentalId = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: GET_SHARING_ITEM_REQUEST });
    const result = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.sharing}/rental/${data.rentalId}`,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_SHARING_ITEM_SUCCESS, payload: result.data[0] });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_SHARING_ITEM_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_SHARING_ITEM_FAILURE, payload: error });
  }
};

export const setSelectSharing = _id => ({
  type: SET_SHARING_DETAIL,
  payload: _id,
});

export const sendSharingRequest = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: SEND_SHARING_REQ_REQUEST });
    const result = await query({
      method: METHODS.post,
      endpoint: `${ENDPOINTS.sharingRequest}`,
      data: {
        sharing: data.id,
        customer: data.customer,
      },
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: SEND_SHARING_REQ_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: SEND_SHARING_REQ_FAILURE });
    }
  } catch (error) {
    dispatch({ type: SEND_SHARING_REQ_FAILURE, payload: error });
  }
};

export const getRentalRequestBySharing = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: GET_RENT_SHARING_REQUEST });
    const rentalRequests = await query({
      method: METHODS.get,
      endpoint: `rentalSharingRequest/sharing/${data.id}`,
    });
    if (rentalRequests.status === STATUS.OK) {
      dispatch({
        type: GET_RENT_SHARING_SUCCESS,
        payload: rentalRequests.data,
      });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_RENT_SHARING_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_RENT_SHARING_FAILURE, payload: error });
  }
};

export const getLatestSharingByRental = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    dispatch({ type: GET_LATEST_SHARING_REQUEST });
    const latestSharing = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.sharing}/latest/rental/${data.id}`,
    });
    if (latestSharing.status === STATUS.OK) {
      dispatch({
        type: GET_LATEST_SHARING_SUCCESS,
        payload: latestSharing.data,
      });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: GET_LATEST_SHARING_FAILURE, payload: error });
    callback.onFailure();
  }
};

export const updateRentalRequest = (
  data,
  callback = INITIAL_CALLBACK
) => async dispatch => {
  try {
    const rentalRequest = await query({
      method: METHODS.patch,
      endpoint: `${ENDPOINTS.rentalRequest}/${data.id}`,
      data: {
        status: data.status,
      },
    });
    if (rentalRequest.status === STATUS.OK) {
      callback.onSuccess();
    }
  } catch (error) {
    console.warn(error);
    callback.onFailure();
  }
};
