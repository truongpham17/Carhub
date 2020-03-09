import {
  GET_HUB_FAILURE,
  GET_HUB_REQUEST,
  GET_HUB_SUCCESS,
} from '../constants/hub';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HUB_REQUEST:
      return { ...state, loading: true };
    case GET_HUB_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.hubs],
        total: action.payload.total,
      };
    case GET_HUB_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
