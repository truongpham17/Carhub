import {
  GET_VIN_CAR_REQUEST,
  GET_VIN_CAR_SUCCESS,
  GET_VIN_CAR_FAILURE,
} from '@redux/actions/hostCarModel';

import {
  GET_HOST_HUB_INFO_REQUEST,
  GET_HOST_HUB_INFO_SUCCESS,
  GET_HOST_HUB_INFO_FAILURE,
} from '@redux/actions/hostHubInfo';

import {
  ADD_LEASE_REQUEST,
  ADD_LEASE_SUCCESS,
  ADD_LEASE_FAILURE,
} from '@redux/actions/hostReview';

const INITIAL_STATE = {
  car: {},
  hub: {},
  review: {},
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VIN_CAR_SUCCESS:
      return { ...state, car: action.payload, loading: false };
    case GET_VIN_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_VIN_CAR_REQUEST:
      return { ...state, loading: true };
    case GET_HOST_HUB_INFO_SUCCESS:
      return { ...state, hub: action.payload, loading: false };
    case GET_HOST_HUB_INFO_REQUEST:
      return { ...state, loading: true };
    case ADD_LEASE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_LEASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_LEASE_REQUEST:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};
