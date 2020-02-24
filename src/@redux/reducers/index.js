import { combineReducers } from 'redux';
import user from './user';
import testReducer from './testReducer';
import userTest from './userTest';
import rentDetail from './rentDetail';

export default combineReducers({
  user,
  testReducer,
  userTest,
  rentDetail,
});
