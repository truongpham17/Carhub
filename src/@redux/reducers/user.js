import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  ADD_LICENSE_REQUEST,
  ADD_LICENSE_SUCCESS,
  ADD_LICENSE_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  SIGN_OUT,
} from '../constants/user';

const INITIAL_STATE = {
  username: '',
  token: '',
  role: '',
  isActive: false,
  loading: false,
  license: null,
  loadingLicense: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SIGN_IN_FAILURE:
      return { ...state, loading: false };
    case ADD_LICENSE_REQUEST:
      return { ...state, loadingLicense: true };
    case ADD_LICENSE_SUCCESS:
      return { ...state, license: action.payload, loadingLicense: false };
    case ADD_LICENSE_FAILURE:
      return { ...state, loadingLicense: false };
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
