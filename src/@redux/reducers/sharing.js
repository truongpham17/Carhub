import {
  GET_SHARING_REQUEST,
  GET_SHARING_SUCCESS,
  GET_SHARING_FAILURE,
  GET_SHARING_ITEM_REQUEST,
  GET_SHARING_ITEM_SUCCESS,
  GET_SHARING_ITEM_FAILURE,
  SET_SHARING_DETAIL,
  GET_RENT_SHARING_FAILURE,
  GET_RENT_SHARING_REQUEST,
  GET_RENT_SHARING_SUCCESS,
  GET_LATEST_SHARING_FAILURE,
  GET_LATEST_SHARING_REQUEST,
  GET_LATEST_SHARING_SUCCESS,
  SEND_SHARING_REQ_FAILURE,
  SEND_SHARING_REQ_REQUEST,
  SEND_SHARING_REQ_SUCCESS,
} from '@redux/constants/sharing';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  total: 0,
  specificSharing: {},
  selectedId: null,
  rentalRequestList: [],
  lastestSharing: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHARING_REQUEST:
    case GET_SHARING_ITEM_REQUEST:
    case GET_RENT_SHARING_REQUEST:
    case GET_LATEST_SHARING_REQUEST:
      return { ...state, isLoading: true };
    case GET_SHARING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_SHARING_ITEM_SUCCESS:
      return { ...state, isLoading: false, specificSharing: action.payload };
    case GET_SHARING_FAILURE:
    case GET_SHARING_ITEM_FAILURE:
    case GET_RENT_SHARING_FAILURE:
    case GET_LATEST_SHARING_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SET_SHARING_DETAIL:
      return { ...state, selectedId: action.payload };
    case GET_RENT_SHARING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rentalRequestList: action.payload,
      };
    case GET_LATEST_SHARING_SUCCESS:
      return { ...state, isLoading: false, lastestSharing: action.payload };

    case SEND_SHARING_REQ_REQUEST:
      return { ...state, isLoading: true };
    case SEND_SHARING_REQ_SUCCESS:
      return { ...state, isLoading: false };

    case SEND_SHARING_REQ_FAILURE:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};
