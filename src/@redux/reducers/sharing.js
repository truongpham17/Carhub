import {
  GET_SHARING_REQUEST,
  GET_SHARING_SUCCESS,
  GET_SHARING_FAILURE,
  GET_SHARING_ITEM_REQUEST,
  GET_SHARING_ITEM_SUCCESS,
  GET_SHARING_ITEM_FAILURE,
  SET_SHARING_DETAIL,
} from '@redux/constants/sharing';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  total: 0,
  specificSharing: {},
  selectedId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHARING_REQUEST:
    case GET_SHARING_ITEM_REQUEST:
      return { ...state, isLoading: true };
    case GET_SHARING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.sharing,
        total: action.payload.total,
      };
    case GET_SHARING_ITEM_SUCCESS:
      return { ...state, isLoading: false, specificSharing: action.payload };
    case GET_SHARING_FAILURE:
    case GET_SHARING_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SET_SHARING_DETAIL:
      return { ...state, selectedId: action.payload };
    default:
      return { ...state };
  }
};
