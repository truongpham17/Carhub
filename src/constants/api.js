/**
 * @dev
 */

// cuong
// export const API_URL = 'http://10.0.2.2:5068/';

// truong
// export const API_URL = 'http://192.168.1.106:5068/';
// export const API_URL = 'https://car-hub-production.herokuapp.com/';

// dat
export const API_URL = 'http://192.168.1.190:5068/';

export const GOOGLE_KEY = 'AIzaSyAUkXe8bNKtkVADuufFsYQZGrTpxWQCW4Y';

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
  rental: 'rental',
  lease: 'lease',
};

export const INITIAL_CALLBACK = {
  onSuccess: () => null,
  onFailure: () => null,
};
