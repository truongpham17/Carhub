import {
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
} from '@redux/constants/notification';

const INITIAL_STATE = {
  loading: false,
  notifications: [],
  total: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.list,
        total: action.payload.total,
      };
    case GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};
