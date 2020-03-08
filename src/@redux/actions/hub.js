import { query } from 'services/api';
import { METHODS, STATUS, INITIAL_CALLBACK } from 'Constants/api';
import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
} from '../constants/hub';

export function getHubList(_, callback = INITIAL_CALLBACK) {
  return async dispatch => {
    try {
      dispatch({ type: GET_HUB_REQUEST });
      const result = await query({
        endpoint: 'hub',
        method: METHODS.get,
      });

      if (result.status === STATUS.OK) {
        console.log(result.data);
        const hubs = result.data.hubs.map(hub => {
          const geo = hub.geoLocation.split(',');
          return {
            ...hub,
            geometry: {
              lat: Number(geo[0]),
              lng: Number(geo[1]),
            },
          };
        });

        dispatch({
          type: GET_HUB_SUCCESS,
          payload: { hubs, total: result.data.total },
        });
        callback.onSuccess();
      } else {
        dispatch({ type: GET_HUB_FAILURE });
        callback.onFailure();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_HUB_FAILURE, payload: error });
      callback.onFailure();
    }
  };
}
