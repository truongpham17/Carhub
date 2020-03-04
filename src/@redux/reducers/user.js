import { GET_TEST_REQUEST, GET_TEST_SUCCESS } from '@redux/constants/user';

const INITIAL_STATE = {
  isSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEST_SUCCESS:
      return { ...state, isSuccess: action.payload.success };
    default:
      return { ...state };
  }
};
