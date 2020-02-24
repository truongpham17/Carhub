import {
  GET_TEST_SUCCESS,
  GET_TEST_FAILURE,
  GET_TEST_REQUEST,
} from '@redux/constants/user';
import {
  ADD_TEST_SUCCESS,
  ADD_TEST_FAILURE,
  ADD_TEST_REQUEST,
} from '@redux/actions/testapiAction';

const INITIAL_STATE = {
  tests: [],
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEST_SUCCESS:
      return { ...state, tests: action.payload, loading: false };
    case GET_TEST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_TEST_REQUEST:
      return { ...state, loading: true };
    case ADD_TEST_SUCCESS:
      return {
        ...state,
        tests: [...state.tests, action.payload],
        loading: false,
      };
    case ADD_TEST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_TEST_REQUEST:
    default:
      return state;
  }
};
