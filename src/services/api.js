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
}) =>
  axios({
    method,
    url: API_URL + endpoint,
    data,
    params,
    // headers,
    headers: store.getState().user.token
      ? {
          ...headers,
          Authorization: store.getState().user.token,
          'Content-Type': 'application/json',
        }
      : headers,
  });
