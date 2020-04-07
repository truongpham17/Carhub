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
  CONFIRM_SHARING_FAILURE,
  CONFIRM_SHARING_REQUEST,
  CONFIRM_SHARING_SUCCESS,
} from '@redux/constants/sharing';

export const getSharing = dispatch => async (
  data,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: GET_SHARING_REQUEST });
    const result = await query({
      method: METHODS.post,
      endpoint: `${ENDPOINTS.sharing}/suggestion`,
      data,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: GET_SHARING_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_SHARING_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_SHARING_FAILURE, payload: error.response.data });
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
    dispatch({ type: GET_SHARING_ITEM_FAILURE, payload: error.response.data });
  }
};

export const setSelectSharing = _id => ({
  type: SET_SHARING_DETAIL,
  payload: _id,
});

export const sendSharingRequest = dispatch => async (
  data,
  callback = INITIAL_CALLBACK
) => {
  console.log('data at sharing request', data);
  try {
    dispatch({ type: SEND_SHARING_REQ_REQUEST });
    const result = await query({
      method: METHODS.post,
      endpoint: `${ENDPOINTS.rentalRequest}`,
      data,
    });
    if (result.status === STATUS.OK) {
      dispatch({ type: SEND_SHARING_REQ_SUCCESS, payload: result.data });
      callback.onSuccess();
    } else {
      dispatch({ type: SEND_SHARING_REQ_FAILURE });
    }
  } catch (error) {
    dispatch({ type: SEND_SHARING_REQ_FAILURE, payload: error.response.data });
  }
};

export const getRentalRequestBySharing = dispatch => async (
  id,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: GET_RENT_SHARING_REQUEST });
    const rentalRequests = await query({
      method: METHODS.get,
      endpoint: `rentalSharingRequest/sharing/${id}`,
    });

    console.log('come hree!!');
    console.log(rentalRequests.data);
    if (rentalRequests.status === STATUS.OK) {
      dispatch({
        type: GET_RENT_SHARING_SUCCESS,
        payload: rentalRequests.data.filter(item => item.status !== 'DECLINED'),
      });
      callback.onSuccess();
    } else {
      dispatch({ type: GET_RENT_SHARING_FAILURE });
      callback.onFailure();
    }
  } catch (error) {
    dispatch({ type: GET_RENT_SHARING_FAILURE, payload: error.response.data });
  }
};

export const getLastestSharingByRental = dispatch => async (
  id,
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: GET_LATEST_SHARING_REQUEST });
    const lastestSharing = await query({
      method: METHODS.get,
      endpoint: `${ENDPOINTS.sharing}/latest/rental/${id}`,
    });

    if (lastestSharing.status === STATUS.OK) {
      dispatch({
        type: GET_LATEST_SHARING_SUCCESS,
        payload: lastestSharing.data,
      });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({
      type: GET_LATEST_SHARING_FAILURE,
      payload: error.response.data,
    });
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
    callback.onFailure();
  }
};

export const confirmSharing = dispatch => async (
  { id, requestId },
  callback = INITIAL_CALLBACK
) => {
  try {
    dispatch({ type: CONFIRM_SHARING_REQUEST });
    const lastestSharing = await query({
      method: METHODS.post,
      endpoint: `${ENDPOINTS.sharing}/confirm/${id}`,
      data: { requestId },
    });

    if (lastestSharing.status === STATUS.OK) {
      dispatch({
        type: CONFIRM_SHARING_SUCCESS,
        payload: lastestSharing.data,
      });
      callback.onSuccess();
    }
  } catch (error) {
    dispatch({ type: CONFIRM_SHARING_FAILURE, payload: error.response.data });
    callback.onFailure();
  }
};
