import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const GET_HOST_HUB_INFO_REQUEST = 'get-host-hub-info-request';
export const GET_HOST_HUB_INFO_SUCCESS = 'get-host-hub-info-success';
export const GET_HOST_HUB_INFO_FAILURE = 'get-host-hub-info-failure';

export const checkHostHubInfo = (hub, callback) => async dispatch => {
  try {
    // dispatch({ type: GET_HOST_HUB_INFO_REQUEST });
    dispatch({
      type: GET_HOST_HUB_INFO_SUCCESS,
      payload: hub,
    });
    callback.onSuccess();
  } catch (error) {
    dispatch({ type: GET_HOST_HUB_INFO_FAILURE, payload: error });
    callback.onFailure();
  }
};
