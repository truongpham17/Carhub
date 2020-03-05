import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import leaseRequest from './leaseRequest';
import rentHistory from './rentHistory';

export default combineReducers({
  user,
  testReducer,
  userTest,
  leaseRequest,
  rentHistory,
});
