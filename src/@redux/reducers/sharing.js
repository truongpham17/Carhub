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
  SET_SHARING_DATA,
  CREATE_SHARING_FAILURE,
  CREATE_SHARING_REQUEST,
  CREATE_SHARING_SUCCESS,
  CANCEL_SHARING_FAILURE,
  CANCEL_SHARING_REQUEST,
  CANCEL_SHARING_SUCCESS,
  ACCEPT_SHARING_RENTAL_FAILURE,
  ACCEPT_SHARING_RENTAL_REQUEST,
  ACCEPT_SHARING_RENTAL_SUCCESS,
  CANCEL_SHARING_RENTAL_FAILURE,
  CANCEL_SHARING_RENTAL_REQUEST,
  CANCEL_SHARING_RENTAL_SUCCESS,
} from '@redux/constants/sharing';
import { SIGN_OUT } from '@redux/constants/user';

const INITIAL_STATE = {
  data: [],
  loading: false,
  total: 0,
  specificSharing: {},
  selectedId: null,
  rentalRequestList: [],
  lastestSharing: {},
  sharingRequestData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHARING_REQUEST:
    case GET_SHARING_ITEM_REQUEST:
    case GET_RENT_SHARING_REQUEST:
    case GET_LATEST_SHARING_REQUEST:
      return { ...state, loading: true };
    case GET_SHARING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_SHARING_ITEM_SUCCESS:
      return { ...state, loading: false, specificSharing: action.payload };
    case GET_SHARING_FAILURE:
    case GET_SHARING_ITEM_FAILURE:
    case GET_RENT_SHARING_FAILURE:
    case GET_LATEST_SHARING_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SHARING_DETAIL:
      return { ...state, selectedId: action.payload };
    case GET_RENT_SHARING_SUCCESS:
      return {
        ...state,
        loading: false,
        rentalRequestList: action.payload,
      };
    case GET_LATEST_SHARING_SUCCESS:
      return { ...state, loading: false, lastestSharing: action.payload };

    case SEND_SHARING_REQ_REQUEST:
      return { ...state, loading: true };
    case SEND_SHARING_REQ_SUCCESS:
      return { ...state, loading: false };

    case SEND_SHARING_REQ_FAILURE:
      return { ...state, loading: false };

    case CREATE_SHARING_REQUEST:
      return { ...state, loading: true };
    case CREATE_SHARING_SUCCESS:
      return { ...state, loading: false };

    case CREATE_SHARING_FAILURE:
      return { ...state, loading: false };

    case CANCEL_SHARING_REQUEST:
      return { ...state, loading: true };
    case CANCEL_SHARING_SUCCESS:
      return { ...state, loading: false };

    case CANCEL_SHARING_FAILURE:
      return { ...state, loading: false };

    case ACCEPT_SHARING_RENTAL_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_SHARING_RENTAL_SUCCESS:
      return { ...state, loading: false };

    case ACCEPT_SHARING_RENTAL_FAILURE:
      return { ...state, loading: false };

    case CANCEL_SHARING_RENTAL_REQUEST:
      return { ...state, loading: true };
    case CANCEL_SHARING_RENTAL_SUCCESS:
      return { ...state, loading: false };

    case CANCEL_SHARING_RENTAL_FAILURE:
      return { ...state, loading: false };

    case SET_SHARING_DATA:
      return {
        ...state,
        sharingRequestData: { ...state.sharingRequestData, ...action.payload },
      };
    case SIGN_OUT:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
