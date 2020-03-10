import axios from 'axios';

import { API_URL, METHODS } from 'Constants/api';
import store from '@redux/store';
import AsyncStorage from '@react-native-community/async-storage';

export const query = async ({
  method = METHODS.get,
  endpoint = '',
  data = null,
  headers = {},
  params = {},
}) => {
  console.log(API_URL + endpoint);
  const token =
    (await AsyncStorage.getItem('token')) ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTVjZDhjYzU2MTgyNzJhOGQzOGY0NzUiLCJleHAiOm51bGwsImlhdCI6MTU4MzE0MzExNn0.T5ascHoEiDKo9qKD...';
  return axios({
    method,
    url: API_URL + endpoint,
    data,
    params,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    // headers,
    headers: store.getState().user.token
      ? {
          ...headers,
          Authorization: store.getState().user.token,
          'Content-Type': 'application/json',
        }
      : headers,
  });
};
