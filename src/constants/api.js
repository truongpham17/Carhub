/**
 * @dev
 */
// truong
// export const API_URL = 'localhost:5068/';

// cuong
export const API_URL = 'http://10.0.2.2:5068/';

/**
 * @production
 */
// export const API_URL = 'https://car-hub-production.herokuapp.com/';

export const METHODS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const ENDPOINTS = {
  user: {
    get_test: 'user/test',
  },
};

export const INITIAL_CALLBACK = {
  success: () => null,
  failure: () => null,
};
