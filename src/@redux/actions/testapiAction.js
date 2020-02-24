import { query } from 'services/api';
import { METHODS } from 'Constants/api';

export const GET_TEST_REQUEST = 'get-test-request';
export const GET_TEST_SUCCESS = 'get-test-success';
export const GET_TEST_FAILURE = 'get-test-fail';

export const ADD_TEST_REQUEST = 'add-test-request';
export const ADD_TEST_SUCCESS = 'add-test-success';
export const ADD_TEST_FAILURE = 'add-test-fail';

export const getTest = () => async dispatch => {
  try {
    dispatch({ type: GET_TEST_REQUEST });
    const data = await query({ endpoint: 'test', method: METHODS.get });
    if (data.status === 200) {
      dispatch({ type: GET_TEST_SUCCESS, payload: data.data });
    } else {
      dispatch({ type: GET_TEST_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_TEST_FAILURE, payload: error });
  }
};

export const getTestById = ({ id }) => async dispatch => {
  try {
    dispatch({ type: GET_TEST_REQUEST });
    const data = await query({
      endpoint: 'test',
      method: 'get',
      params: {
        id,
      },
    });
    if (data.status === 200) {
      dispatch({ type: GET_TEST_SUCCESS, payload: data.data });
    } else {
      dispatch({ type: GET_TEST_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_TEST_FAILURE, payload: error });
  }
};

export const addTest = ({ title, description }) => async dispatch => {
  try {
    dispatch({ type: ADD_TEST_REQUEST });
    const data = await query({
      endpoint: 'test',
      method: METHODS.post,
      data: {
        title,
        description,
      },
    });
    if (data.status === 200) {
      dispatch({ type: ADD_TEST_SUCCESS, payload: data.data });
    } else {
      dispatch({ type: ADD_TEST_FAILURE });
    }
  } catch (error) {
    dispatch({ type: ADD_TEST_FAILURE, payload: error });
  }
};
