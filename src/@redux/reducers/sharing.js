import {
  GET_SHARING_REQUEST,
  GET_SHARING_SUCCESS,
  GET_SHARING_FAILURE,
} from '@redux/constants/sharing';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  total: 0,
  selectedId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHARING_REQUEST:
      return { ...state, isLoading: true };
    case GET_SHARING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.sharing,
        total: action.payload.total,
      };
    case GET_SHARING_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};
