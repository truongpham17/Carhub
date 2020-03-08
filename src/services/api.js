import axios from 'axios';

import { API_URL, METHODS } from 'Constants/api';
import store from '@redux/store';

export const query = ({
  method = METHODS.get,
  endpoint = '',
  data = null,
  headers = {},
  params = {},
}) => {
  console.log(API_URL + endpoint);
  return axios({
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
};
